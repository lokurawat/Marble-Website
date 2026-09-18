import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
const Hero1 = () => {

  return (

    <div
      className="w-full min-h-screen flex items-center bg-[url('/indianimage.png')] bg-cover bg-center px-5 sm:px-10 lg:px-35"
    >

      <div className='max-w-[800px]'>

        <h1
          style={{ fontFamily:'Playfair Display' }}

          className='font-semibold text-4xl sm:text-5xl lg:text-7xl mb-5 leading-tight'
        >

          India's largest indian marble collection

        </h1>

             <Link
          to="/getAllProducts"
          className="bg-green-500 px-5 py-2 rounded cursor-pointer text-white active:scale-95 transition-all duration-150"
        >
          Shop Now
        </Link>

      </div>

    </div>

  )

}

export default Hero1