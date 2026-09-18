import React from 'react'
import Button from './button'

const Cards = ({ img, heading, button }) => {

  return (

    <div className='w-full sm:w-[320px] lg:w-[380px] flex items-center justify-center flex-col p-4 sm:p-5'>

      {/* IMAGE */}

      <div className='w-full h-[250px] sm:h-[300px] overflow-hidden rounded'>

        <img
          className='w-full h-full object-cover hover:scale-105 transition-all duration-500'
          src={img}
          alt=""
        />

      </div>

      {/* HEADING */}

      <h3 className='text-gray-500 text-lg sm:text-xl mb-5 mt-5 text-center'>

        {heading}

      </h3>

      {/* BUTTON */}

      <Button button={button} />

    </div>

  )

}

export default Cards