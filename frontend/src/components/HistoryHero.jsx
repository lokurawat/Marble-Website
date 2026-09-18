import React from 'react'

const HistoryHero = ({ heading, paragraph, reverse, img }) => {

  return (

    <div
      className={`flex flex-col lg:flex-row gap-10 px-5 sm:px-10 lg:px-25 py-10 items-center ${
        reverse ? "lg:flex-row-reverse" : ""
      }`}
    >

      {/* IMAGE */}

      <div className='w-full lg:w-1/2'>

        <img
          className='w-full h-[300px] sm:h-[500px] lg:h-[90vh] object-cover rounded'
          src={img}
          alt={heading}
        />

      </div>

      {/* CONTENT */}

      <div className="w-full lg:flex-1 flex justify-center items-start flex-col gap-6">

        <h3 className='text-2xl sm:text-3xl font-medium tracking-wide text-gray-700 text-left lg:text-justify'>

          {heading}

        </h3>

        <p className='text-sm sm:text-base lg:text-lg text-justify leading-7 lg:leading-8'>

          {paragraph}

        </p>

      </div>

    </div>

  )

}

export default HistoryHero