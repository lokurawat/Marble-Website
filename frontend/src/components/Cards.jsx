import React from 'react'

const Cards = ({ img, heading }) => {

  return (
    <div className="w-full max-w-[380px] mx-auto">

      {/* IMAGE */}

      <div className="w-full aspect-[4/3] overflow-hidden rounded">
        <img
          className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
          src={img}
          alt={heading}
        />
      </div>

      {/* HEADING */}

      <h3 className="text-gray-500 text-lg sm:text-xl mt-5 text-center">
        {heading}
      </h3>

    </div>
  )
}

export default Cards