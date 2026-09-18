import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            )

            const data = await response.json()

            if (!response.ok) {
                alert(data.message)
                return
            }

            console.log('Registration successful:', data)

            alert('Registration successful!')

            setName('')
            setEmail('')
            setPassword('')

            navigate("/login")

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
                    Register
                </h1>

                <input
                    required
                    type='text'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='border p-3 rounded'
                />

                <input
                    required
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border p-3 rounded'
                />

                <input
                    required
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
                    Register
                </button>

            </form>

        </div>

    )
}

export default Register