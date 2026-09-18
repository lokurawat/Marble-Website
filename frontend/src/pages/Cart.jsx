import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/auth-context'
import Navbar from '../components/Navbar'
import Navbar2 from '../components/Navbar2'
import Footer from '../components/Footer'

const Cart = () => {

    const { cart } = useContext(CartContext)
    const { addToCart } = useContext(CartContext)
    const { deleteItem } = useContext(CartContext)
    const { totalItems } = useContext(CartContext)
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const totalPrice = cart.reduce((total, item) => {
        return total + item.quantity * item.price
    }, 0)

    if (cart.length === 0) {

        return (

            <div>

                <Navbar />
                <Navbar2 />

                <div className='min-h-screen flex flex-col gap-5 justify-center items-center px-5 text-center'>

                    <h1 className='text-2xl sm:text-4xl font-medium'>

                        Your Cart is Empty

                    </h1>

                    <p className='text-gray-500 text-sm sm:text-lg'>

                        Add some marble products

                    </p>

                </div>

                <Footer />

            </div>

        )

    }

    return (

        <div className='w-full'>

            <Navbar />
            <Navbar2 />

            {/* MAIN SECTION */}

            <div className='flex flex-col lg:flex-row w-full bg-[#EAEDED] px-3 lg:px-0'>

                {/* LEFT SIDE */}

                <div className='w-full lg:w-2/3 lg:ml-30 p-3 sm:p-5 mb-10 mt-5 lg:mt-10 bg-white'>

                    <h1 className='text-2xl font-normal'>

                        Shopping Cart

                    </h1>

                    <div className=' flex flex-col gap-4'>

                        {

                            cart.map((item) => {

                                return (

                                    <div
                                        key={item._id}
                                        className='w-full my-5'
                                    >

                                        <hr />

                                        {/* IMAGE + BUTTONS */}

                                        <div className='flex flex-col sm:flex-row justify-between items-center gap-5 p-3'>

                                            <img
                                                className='h-28 w-28 sm:h-35 sm:w-35 object-cover rounded'
                                                src={item.imagesUrl}
                                                alt=""
                                            />

                                            <div className='flex gap-4 items-center'>

                                                <button
                                                    className='w-8 h-8 border cursor-pointer'

                                                    onClick={() => {
                                                        deleteItem(item)
                                                    }}
                                                >

                                                    -

                                                </button>

                                                <p>

                                                    {item.quantity}

                                                </p>

                                                <button
                                                    className='border w-8 h-8 cursor-pointer'

                                                    onClick={() => {
                                                        addToCart(item)
                                                    }}
                                                >

                                                    +

                                                </button>

                                            </div>

                                        </div>

                                        {/* NAME + PRICE */}

                                        <div className='flex flex-col sm:flex-row justify-between gap-2 p-3'>

                                            <h1 className='text-lg font-medium'>

                                                {item.name}

                                            </h1>

                                            <p className='text-lg'>

                                                ₹{item.price * item.quantity}

                                            </p>

                                        </div>

                                        {/* ORIGIN */}

                                        <p className='px-3 text-gray-600'>

                                            {item.origin}

                                        </p>

                                    </div>

                                )

                            })

                        }

                    </div>

                    {/* SUBTOTAL */}

                    <hr className='w-full border-gray-400 mt-5' />

                    <div className='flex flex-col sm:flex-row justify-between items-center gap-3 py-8 text-lg sm:text-xl font-medium'>

                        <div></div>

                        <div>

                            <span className='font-normal'>

                                Subtotal ({totalItems} items):

                            </span>

                            {" "}₹{totalPrice}

                        </div>

                    </div>

                </div>

                {/* ORDER SUMMARY */}

                <div className='w-full lg:w-[300px] h-fit mt-0 lg:mt-10 lg:ml-5 bg-white flex flex-col p-5 mb-10'>

                    <h1 className='text-2xl font-medium'>

                        Order Summary

                    </h1>

                    <div className='flex justify-between mt-3'>

                        <p>Items</p>

                        <p>{totalItems}</p>

                    </div>

                    <div className='flex justify-between mt-3'>

                        <p>Delivery</p>

                        <p>₹200</p>

                    </div>

                    <hr className='my-4' />

                    <div className='flex justify-between font-medium text-xl'>

                        <p>Total</p>

                        <p>₹{totalPrice + 200}</p>

                    </div>

                    <button
                        onClick={() => {
                            if (!user) {
                                navigate('/login')
                                return
                            }

                           navigate("/checkout")
                        }}
                        className='bg-yellow-400 py-3 mt-6 rounded w-full cursor-pointer hover:bg-yellow-500 transition-all'
                    >

                        Proceed To Checkout

                    </button>

                </div>

            </div>

            <Footer />

        </div>

    )

}

export default Cart