import React from 'react'
import Cards from './Cards'

const Hero2 = () => {

  return (

    <div className='py-16 lg:py-30 px-5'>

      {/* HEADING */}

      <div className='flex justify-center items-center flex-col text-center'>

        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-medium'>

          Material Selection

        </h2>

        <p className='mt-3 text-sm sm:text-base lg:text-lg max-w-[800px]'>

          Find top-quality natural stones at Balaji Marbles India.
          Mesmerizing options available now!

        </p>

      </div>

      {/* CARDS */}

      <div className='w-full flex flex-wrap justify-center items-center gap-5 mt-12 lg:mt-20'>

        <Cards
          img={"/sandstone.jpg"}
          heading={"SandStone"}
          button={"View More"}
        />

        <Cards
          img={"/granite.jpg"}
          heading={"Granite"}
          button={"View More"}
        />

        <Cards
          img={"/indian marble.jpg"}
          heading={"Indian Marble"}
          button={"View More"}
        />

        <Cards
          img={"/importedmarble.jpg"}
          heading={"Imported Marble"}
          button={"View More"}
        />

        <Cards
          img={"https://www.rkmarblesindia.com/wp-content/uploads/2021/02/3-10.jpg"}
          heading={"Onyxx Stone"}
          button={"View More"}
        />

        <Cards
          img={"/marbletiles.png"}
          heading={"Marble Tiles"}
          button={"View More"}
        />

      </div>

    </div>

  )

}

export default Hero2