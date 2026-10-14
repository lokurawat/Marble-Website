const crypto = require('crypto');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const Order = require('../model/order-model');
const Product = require('../model/product-model');

const isNonEmptyString = (value, maxLength) =>
  typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maxLength;

const getRazorpayClient = () => {
  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay credentials are not configured.');
  }

  return new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
  });
};

const createOrder = async (req, res) => {
  try {
    const { items, customer } = req.body || {};

    if (!Array.isArray(items) || items.length === 0 || items.length > 100) {
      return res.status(400).json({ message: 'Provide between 1 and 100 cart items.' });
    }

    if (
      !customer ||
      !isNonEmptyString(customer.name, 120) ||
      !isNonEmptyString(customer.email, 254) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim()) ||
      !isNonEmptyString(customer.phone, 30) ||
      !isNonEmptyString(customer.address, 500) ||
      !isNonEmptyString(customer.city, 120) ||
      !isNonEmptyString(customer.state, 120) ||
      !isNonEmptyString(customer.pincode, 20)
    ) {
      return res.status(400).json({ message: 'Provide valid customer and shipping details.' });
    }

    const quantities = new Map();
    for (const item of items) {
      if (
        !item ||
        typeof item.productId !== 'string' ||
        !mongoose.Types.ObjectId.isValid(item.productId) ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 99
      ) {
        return res.status(400).json({ message: 'Cart contains an invalid product or quantity.' });
      }

      const totalQuantity = (quantities.get(item.productId) || 0) + item.quantity;
      if (totalQuantity > 99) {
        return res.status(400).json({ message: 'A product quantity cannot exceed 99.' });
      }
      quantities.set(item.productId, totalQuantity);
    }

    const products = await Product.find({
      _id: { $in: [...quantities.keys()] },
    }).select('_id price');
    const productsById = new Map(products.map((product) => [product._id.toString(), product]));

    let amount = 0;
    const orderItems = [];
    for (const [productId, quantity] of quantities) {
      const product = productsById.get(productId);
      if (!product) {
        return res.status(400).json({ message: 'A product in your cart is no longer available.' });
      }

      const unitPriceInPaise = Math.round(product.price * 100);
      if (!Number.isSafeInteger(unitPriceInPaise) || unitPriceInPaise < 1) {
        return res.status(400).json({ message: 'A product in your cart has an invalid price.' });
      }

      amount += unitPriceInPaise * quantity;
      if (!Number.isSafeInteger(amount)) {
        return res.status(400).json({ message: 'The order amount is too large.' });
      }
      orderItems.push({
        productId: product._id,
        qty: quantity,
        price: unitPriceInPaise / 100,
      });
    }

    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `BM-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`,
    });

    await Order.create({
      items: orderItems,
      totalAmount: amount / 100,
      address: {
        fullName: customer.name.trim(),
        street: customer.address.trim(),
        city: customer.city.trim(),
        state: customer.state.trim(),
        postalCode: customer.pincode.trim(),
        country: 'India',
      },
      customerEmail: customer.email.trim().toLowerCase(),
      customerPhone: customer.phone.trim(),
      razorpayOrderId: order.id,
      paymentStatus: 'Pending',
    });

    return res.status(201).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Unable to create Razorpay order:', error);
    return res.status(500).json({ message: 'Unable to start payment. Please try again.' });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
    } = req.body || {};

    if (
      typeof orderId !== 'string' ||
      typeof paymentId !== 'string' ||
      typeof signature !== 'string' ||
      !/^[a-f\d]{64}$/i.test(signature)
    ) {
      return res.status(400).json({ message: 'Payment verification details are invalid.' });
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay credentials are not configured.');
    }

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest();
    const receivedSignature = Buffer.from(signature, 'hex');

    if (
      expectedSignature.length !== receivedSignature.length ||
      !crypto.timingSafeEqual(expectedSignature, receivedSignature)
    ) {
      return res.status(400).json({ message: 'Payment signature verification failed.' });
    }

    const existingOrder = await Order.findOne({ razorpayOrderId: orderId });
    if (!existingOrder) {
      return res.status(404).json({ message: 'The order for this payment could not be found.' });
    }

    if (existingOrder.paymentStatus === 'Paid' && existingOrder.paymentId === paymentId) {
      return res.status(200).json({ verified: true, paymentId, orderId: existingOrder._id });
    }

    if (existingOrder.paymentStatus !== 'Pending') {
      return res.status(409).json({ message: 'This order has already been processed.' });
    }

    const order = await Order.findOneAndUpdate(
      { razorpayOrderId: orderId, paymentStatus: 'Pending' },
      { $set: { paymentId, paymentStatus: 'Paid' } },
      { new: true }
    );
    if (!order) {
      return res.status(409).json({ message: 'This order has already been processed.' });
    }

    return res.status(200).json({
      verified: true,
      paymentId,
      orderId: order._id,
    });
  } catch (error) {
    console.error('Unable to verify Razorpay payment:', error);
    return res.status(500).json({ message: 'Unable to verify payment. Please contact support.' });
  }
};

module.exports = { createOrder, verifyPayment };
