import React from 'react'
import { Link } from 'react-router-dom'
const Hero3 = () => {

  return (

    <div
      className='w-full min-h-[450px] flex items-center justify-center bg-[url("https://images.unsplash.com/photo-1603323978104-4c1c0d1bfc72?q=80&w=1170&auto=format&fit=crop")] bg-cover bg-center px-5'
    >

      <div className='flex flex-col justify-center items-center text-center max-w-[900px]'>

        <h1
          style={{ fontFamily:'Playfair Display' }}

          className='font-medium text-3xl sm:text-4xl lg:text-5xl mb-5'
        >

          The Taj of Makrana

        </h1>

        <p className='text-sm sm:text-base lg:text-lg mb-5'>

          “Rooted in India, Inspiring the World:
          Crafting Quality Since 1986”

        </p>

        <Link
  to="/search"
  className="bg-green-500 px-5 py-2 rounded cursor-pointer text-white active:scale-95 transition-all duration-150"
>
  Shop Now
</Link>

      </div>

    </div>

  )

}

export default Hero3