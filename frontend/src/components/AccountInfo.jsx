import React, { useContext } from 'react'
import { AuthContext } from '../context/auth-context'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import Footer from './Footer';


const AccountInfo = () => {
    const navigate=useNavigate();
    const { user, logout } = useContext(AuthContext)

    if (!user) {
        return (
            
            <div className="min-h-screen flex items-center flex justify-center items-center flex-col gap-10 justify-center">
                <Navbar/>
                <Navbar2/>
                <h1 className="text-xl font-semibold">
                   Please Login First 
                </h1>
                <Link  to={"/login"}>
                <button className='w-40 h-15 rounded-2xl bg-red-400 color-white'>Login</button>
                </Link>
                <Footer/>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg overflow-hidden">

                {/* Header */}
                <div className="bg-black text-white p-8">
                    <div className="flex items-center gap-5">

                        {/* Profile Circle */}
                        <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center text-3xl font-bold">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold">
                                {user.name}
                            </h1>

                            <p className="text-gray-300 mt-1">
                                {user.email}
                            </p>
                        </div>

                    </div>
                </div>

                {/* Account Information */}
                <div className="p-8">

                    <h2 className="text-xl font-bold mb-6">
                        Account Information
                    </h2>

                    <div className="space-y-5">

                        {/* Name */}
                        <div className="border-b pb-4">
                            <p className="text-sm text-gray-500">
                                Full Name
                            </p>

                            <p className="text-lg font-medium mt-1">
                                {user.name}
                            </p>
                        </div>

                        {/* Email */}
                        <div className="border-b pb-4">
                            <p className="text-sm text-gray-500">
                                Email Address
                            </p>

                            <p className="text-lg font-medium mt-1">
                                {user.email}
                            </p>
                        </div>

                    
                     {/* <div className="border-b pb-4">
                            <p className="text-sm text-gray-500">
                                User ID
                            </p>

                            <p className="text-sm font-mono bg-gray-100 p-3 rounded-lg mt-2 break-all">
                                {user._id}
                            </p>
                        </div> */}

                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-8">

                        <button
                            className="flex-1 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                        >
                            Edit Profile
                        </button>

                        <button
                            onClick={logout}
                            className="px-6 py-3 border border-red-500 text-red-500 rounded-xl hover:bg-red-50 transition"
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default AccountInfo