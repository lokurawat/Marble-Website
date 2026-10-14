import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL;

const loadRazorpay = () => new Promise((resolve, reject) => {
    if (window.Razorpay) {
        resolve();
        return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Unable to load Razorpay checkout."));
    document.body.appendChild(script);
});

const Checkout = () => {
    const { cart, setCart } = useContext(CartContext);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState("");
    const [payment, setPayment] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const readResponse = async (response) => {
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Payment request failed.");
        }
        return data;
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        setError("");
        setIsProcessing(true);

        try {
            await loadRazorpay();
            const order = await fetch(`${API_URL}/api/payments/order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: cart.map((item) => ({
                        productId: item._id,
                        quantity: item.quantity
                    })),
                    customer: formData
                })
            }).then(readResponse);

            const checkout = new window.Razorpay({
                key: order.keyId,
                amount: order.amount,
                currency: order.currency,
                name: "Balaji Marble India",
                description: "Marble order payment",
                order_id: order.id,
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                theme: { color: "#8B5E3C" },
                modal: {
                    ondismiss: () => setIsProcessing(false)
                },
                handler: async (response) => {
                    try {
                        const verification = await fetch(`${API_URL}/api/payments/verify`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(response)
                        }).then(readResponse);

                        setPayment({
                            paymentId: response.razorpay_payment_id,
                            orderId: verification.orderId
                        });
                        setCart([]);
                    } catch (verificationError) {
                        setError(verificationError.message);
                    } finally {
                        setIsProcessing(false);
                    }
                }
            });

            checkout.on("payment.failed", (response) => {
                setError(response.error?.description || "Payment failed. Please try again.");
                setIsProcessing(false);
            });
            checkout.open();
        } catch (paymentError) {
            setError(paymentError.message);
            setIsProcessing(false);
        }

    };

    if (payment) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5">
                <div className="max-w-lg w-full bg-white rounded-xl shadow-md p-8 text-center">
                    <h1 className="text-2xl font-bold text-green-700">Payment successful</h1>
                    <p className="mt-3 text-gray-600">Your payment has been verified.</p>
                    <p className="mt-4 text-sm text-gray-500 break-all">
                        Payment ID: {payment.paymentId}
                    </p>
                    <p className="mt-2 text-sm text-gray-500 break-all">
                        Order ID: {payment.orderId}
                    </p>
                    <Link
                        to="/"
                        className="inline-block mt-6 bg-[#8B5E3C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#70482f] transition"
                    >
                        Continue shopping
                    </Link>
                </div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-2xl font-semibold text-gray-700">
                    Your cart is empty
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-5">

            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Checkout
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Customer Details */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">

                        <h2 className="text-xl font-semibold mb-6">
                            Customer Details
                        </h2>

                        <form
                            onSubmit={handlePayment}
                            className="space-y-5"
                        >

                            <div>
                                <label className="block mb-2 font-medium">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#8B5E3C]"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>
                                    <label className="block mb-2 font-medium">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#8B5E3C]"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium">
                                        Phone
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#8B5E3C]"
                                        placeholder="Enter phone number"
                                    />
                                </div>

                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Address
                                </label>

                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#8B5E3C]"
                                    placeholder="Enter your complete address"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                                <div>
                                    <label className="block mb-2 font-medium">
                                        City
                                    </label>

                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#8B5E3C]"
                                        placeholder="City"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium">
                                        State
                                    </label>

                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#8B5E3C]"
                                        placeholder="State"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium">
                                        Pincode
                                    </label>

                                    <input
                                        type="text"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#8B5E3C]"
                                        placeholder="Pincode"
                                    />
                                </div>

                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full bg-[#8B5E3C] text-white py-3 rounded-lg font-semibold hover:bg-[#70482f] transition disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? "Processing..." : "Pay with Razorpay"}
                            </button>
                            {error && (
                                <p role="alert" className="text-sm text-red-600">
                                    {error}
                                </p>
                            )}

                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-xl shadow-md p-6 h-fit">

                        <h2 className="text-xl font-semibold mb-6">
                            Order Summary
                        </h2>

                        <div className="space-y-4">

                            {cart.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex justify-between gap-4 border-b pb-4"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {item.name}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            ₹{item.price} × {item.quantity}
                                        </p>
                                    </div>

                                    <p className="font-semibold">
                                        ₹{item.price * item.quantity}
                                    </p>
                                </div>
                            ))}

                        </div>

                        <div className="border-t mt-6 pt-5 flex justify-between">
                            <span className="text-lg font-semibold">
                                Total
                            </span>

                            <span className="text-xl font-bold text-[#8B5E3C]">
                                ₹{total}
                            </span>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;