import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/auth-context'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()
    const { login } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {

        e.preventDefault()

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
                alert(data.message)
                setEmail('')
                setPassword('')
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

        }
    }

    return (

        <div className='min-h-screen flex justify-center items-center'>

            <form
                onSubmit={handleSubmit}
                className='w-[350px] flex flex-col gap-5 p-8 shadow-lg rounded-xl'
            >

                <h1 className='text-3xl font-bold text-center'>
                    Login
                </h1>

                <input
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border p-3 rounded'
                />

                <input
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='border p-3 rounded'
                />

                <button
                    type='submit'
                    className='bg-black text-white p-3 rounded'
                >
                    Login
                </button>

            </form>

            <div>

                <Link to={"/register"}>
                    <div>register</div>
                </Link>

            </div>

        </div>

    )
}

export default Login