import React from 'react'
import Cards from './cards'

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
          img={"https://www.rkmarblesindia.com/wp-content/uploads/2022/11/White-Indian-Statuario-Marble-11.jpg"}
          heading={"SandStone"}
          button={"View More"}
        />

        <Cards
          img={"https://www.rkmarblesindia.com/wp-content/uploads/2024/02/black-granite-new-2024-photos-6.jpg"}
          heading={"Granite"}
          button={"View More"}
        />

        <Cards
          img={"https://www.rkmarblesindia.com/wp-content/uploads/2021/02/4-11.jpg"}
          heading={"Indian Marble"}
          button={"View More"}
        />

        <Cards
          img={"https://www.rkmarblesindia.com/wp-content/uploads/2021/01/1000-800-px-1.jpg"}
          heading={"Imported Marble"}
          button={"View More"}
        />

        <Cards
          img={"https://www.rkmarblesindia.com/wp-content/uploads/2021/02/3-10.jpg"}
          heading={"Onyxx Stone"}
          button={"View More"}
        />

        <Cards
          img={"https://www.rkmarblesindia.com/wp-content/uploads/2022/10/Fossil-Mint-Sandstone-8.jpg"}
          heading={"Marble Tiles"}
          button={"View More"}
        />

      </div>

    </div>

  )

}

export default Hero2