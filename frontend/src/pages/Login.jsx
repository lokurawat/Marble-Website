import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/auth-context'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()
    const { login } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {

        e.preventDefault()

        setError('')
        setLoading(true)

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            )

            const data = await response.json()

            if (!response.ok) {
                setError(data.message || 'Invalid email or password')
                return
            }

            login(data)

            setEmail('')
            setPassword('')

            console.log('Login successful', data)

            if (data.role === "admin") {
                navigate("/admin")
            } else {
                navigate("/cart")
            }

        } catch (error) {

            console.log(error)
            setError('Unable to connect to the server. Please try again.')

        } finally {

            setLoading(false)

        }
    }

    return (

        <div className='min-h-screen bg-gray-50 flex justify-center items-center px-4'>

            <div className='w-full max-w-md'>

                {/* LOGIN CARD */}

                <div className='bg-white shadow-xl rounded-2xl p-8 sm:p-10'>

                    {/* HEADING */}

                    <div className='text-center mb-8'>

                        <h1 className='text-3xl sm:text-4xl font-bold text-gray-800'>
                            Welcome Back
                        </h1>

                        <p className='text-gray-500 mt-2'>
                            Login to your Balaji Marble account
                        </p>

                    </div>


                    {/* ERROR */}

                    {error && (
                        <div className='bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-5'>
                            {error}
                        </div>
                    )}


                    {/* FORM */}

                    <form
                        onSubmit={handleSubmit}
                        className='flex flex-col gap-5'
                    >

                        {/* EMAIL */}

                        <div className='flex flex-col gap-2'>

                            <label className='text-sm font-medium text-gray-700'>
                                Email
                            </label>

                            <input
                                required
                                type='email'
                                placeholder='Enter your email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='border border-gray-300 p-3 rounded-lg outline-none focus:border-[#8B5E3C] focus:ring-1 focus:ring-[#8B5E3C] transition'
                            />

                        </div>


                        {/* PASSWORD */}

                        <div className='flex flex-col gap-2'>

                            <label className='text-sm font-medium text-gray-700'>
                                Password
                            </label>

                            <input
                                required
                                type='password'
                                placeholder='Enter your password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='border border-gray-300 p-3 rounded-lg outline-none focus:border-[#8B5E3C] focus:ring-1 focus:ring-[#8B5E3C] transition'
                            />

                        </div>


                        {/* LOGIN BUTTON */}

                        <button
                            type='submit'
                            disabled={loading}
                            className='bg-[#8B5E3C] hover:bg-[#70482f] disabled:bg-gray-400 text-white p-3 rounded-lg font-medium transition mt-2'
                        >

                            {loading ? 'Logging in...' : 'Login'}

                        </button>

                    </form>


                    {/* REGISTER */}

                    <div className='text-center mt-7 pt-6 border-t border-gray-200'>

                        <p className='text-gray-500 text-sm'>
                            Don't have an account?
                        </p>

                        <Link
                            to='/register'
                            className='inline-block mt-2 text-[#8B5E3C] font-semibold hover:underline'
                        >
                            Create an account
                        </Link>

                    </div>

                </div>

            </div>

        </div>

    )
}

export default Login