import React from 'react'
import Cards from './Cards'

const Hero4 = () => {

  return (

    <div className='py-16 lg:py-30 px-5 min-h-screen'>

      {/* HEADING */}

      <div className='flex justify-center items-center flex-col text-center'>

        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-medium'>

          Featured Collection

        </h2>

        <p className='mt-3 text-sm sm:text-base lg:text-lg max-w-[800px]'>

          Find top-quality natural stones at Balaji Marbles India.
          Mesmerizing options available now!

        </p>

      </div>

      {/* CARDS */}

      <div className='w-full flex flex-wrap justify-center items-center gap-5 mt-12 lg:mt-20'>

        <Cards
          img={"/sanstone2.webp"}
          heading={"SandStone"}
          button={"Add To Cart"}
        />

        <Cards
          img={"/granite2.jpg"}
          heading={"Granite"}
          button={"Add To Cart"}
        />

        <Cards
          img={"https://www.rkmarblesindia.com/wp-content/uploads/2020/09/ambaji-white-3-600x480.jpg"}
          heading={"Indian Marble"}
          button={"Add To Cart"}
        />

      </div>

    </div>

  )

}

export default Hero4