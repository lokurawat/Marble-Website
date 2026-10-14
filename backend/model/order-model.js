const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  address: {
    fullName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  customerEmail: { type: String },
  customerPhone: { type: String },
  paymentId: { type: String },
  razorpayOrderId: { type: String, unique: true, sparse: true },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'] },
  status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);