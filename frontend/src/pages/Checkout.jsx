import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const Checkout = () => {
    const { cart } = useContext(CartContext);

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

    const handlePayment = (e) => {
        e.preventDefault();

        console.log("Customer:", formData);
        console.log("Cart:", cart);
        console.log("Total:", total);

        // Payment gateway will be added here
    };

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
                                className="w-full bg-[#8B5E3C] text-white py-3 rounded-lg font-semibold hover:bg-[#70482f] transition"
                            >
                                Proceed to Payment
                            </button>

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
                                    key={item.id}
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