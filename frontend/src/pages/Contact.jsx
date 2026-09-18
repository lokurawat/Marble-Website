import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Navbar2 from '../components/Navbar2'
import Footer from '../components/Footer'

const Contact = () => {
const [message,setMessage]=useState('')
const [email,setEmail]=useState('')
const [name,setName]=useState('')
const formHandler = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                message,
                name
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        console.log(data.message);

        setName('');
        setEmail('');
        setMessage('');

    } catch (error) {
        console.log(error.message);
    }
};

  return (

    <div className="w-full min-h-screen">

      <Navbar />
      <Navbar2 />

      {/* MAP */}

      <div className='h-[300px] sm:h-[450px] w-full px-5 sm:px-10 lg:px-40 mt-10'>

        <iframe
          className='w-full h-full rounded'

          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1278.967874185957!2d74.63279786036384!3d26.516569685559656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1779098346236!5m2!1sen!2sin"

          style={{ border: 0 }}

          allowFullScreen=""

          loading="lazy"

          referrerPolicy="no-referrer-when-downgrade"
        >

        </iframe>

      </div>

      {/* FORM + STORE */}

      <div className='flex flex-col lg:flex-row w-full gap-10 my-10 px-5 sm:px-10 lg:px-40'>

        {/* FORM */}

        <div className='w-full lg:w-1/2'>

          <form onSubmit={formHandler} action="" className='w-full'>

            <h1 className='text-2xl sm:text-3xl font-medium mb-5'>

              Leave Us a Message

            </h1>

            {/* NAME + EMAIL */}

            <div className='flex flex-col sm:flex-row gap-5'>

              <div className='w-full'>

                <h1 className='font-semibold py-3'>

                  Name

                </h1>

                <input value={name} onChange={(e)=>{
                  setName(e.target.value)
                }}
                  className='w-full h-[45px] border border-gray-400 rounded px-3 outline-none'

                  type="text"
                />

              </div>

              <div className='w-full'>

                <h1 className='font-semibold py-3'>

                  Email

                </h1>

                <input value={email} onChange={(e)=>{
                  setEmail(e.target.value)
                }}
                  className='w-full h-[45px] border border-gray-400 rounded px-3 outline-none'

                  type="text"
                />

              </div>

            </div>

            {/* TEXTAREA */}

            <h1 className='font-semibold py-5'>

              Comment or Message

            </h1>

            <textarea value={message} onChange={(e)=>{
              setMessage(e.target.value)
            }}
              className='w-full h-[220px] resize-none border border-gray-400 rounded p-3 outline-none'
            >

            </textarea>

            {/* BUTTON */}

            <button
              className='bg-green-500 text-white rounded-xl px-6 py-3 mt-5 cursor-pointer hover:bg-green-600 transition-all'

              type='submit'
            >

              Submit

            </button>

          </form>

        </div>

        {/* STORE DETAILS */}

        <div className='w-full lg:w-1/2 flex flex-col gap-6 lg:px-20'>

          <h1 className="font-medium text-2xl sm:text-3xl">

            Our Store

          </h1>

          <p className='text-sm sm:text-base leading-7'>

            Pasand Nagar Kotra,
            Ajmer, Rajasthan, India

          </p>

          <h1 className="font-medium text-xl sm:text-2xl">

            PHONE:

          </h1>

          <p className='text-sm sm:text-base'>

            +91-7878933846

          </p>

          <h1 className="font-medium text-xl sm:text-2xl">

            E-MAIL:

          </h1>

          <p className='text-sm sm:text-base break-all'>

            rawatlokesh960@gmail.com

          </p>

        </div>

      </div>

      <Footer />

    </div>

  )

}

export default Contact