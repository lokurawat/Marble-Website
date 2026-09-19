import React from 'react'
import Cards from './Cards'
import { Link } from 'react-router-dom'

const Hero2 = () => {

  const materials = [
    {
      link: '/priceList/sandstone',
      img: '/sandstone.jpg',
      heading: 'SandStone'
    },
    {
      link: '/priceList/granite',
      img: '/granite.jpg',
      heading: 'Granite'
    },
    {
      link: '/priceList/indianmarble',
      img: '/indian marble.jpg',
      heading: 'Indian Marble'
    },
    {
      link: '/priceList/importedmarble',
      img: '/importedmarble.jpg',
      heading: 'Imported Marble'
    },
    {
      link: '/priceList/onyxstone',
      img: 'https://www.rkmarblesindia.com/wp-content/uploads/2021/02/3-10.jpg',
      heading: 'Onyx Stone'
    },
    {
      link: '/priceList/marbletiles',
      img: '/marbletiles.png',
      heading: 'Marble Tiles'
    }
  ]

  return (

    <section className='py-16 lg:py-30 px-4 sm:px-5'>

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

      <div className='
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-8
        mt-12
        lg:mt-20
        max-w-6xl
        mx-auto
      '>

        {materials.map((material) => (

          <Link
            key={material.link}
            to={material.link}
            className='w-full flex flex-col items-center'
          >

            <Cards
              img={material.img}
              heading={material.heading}
            />

            <div className='bg-green-500 px-5 py-2 rounded cursor-pointer text-white active:scale-95 transition-all duration-150 mt-3'>
              View More
            </div>

          </Link>

        ))}

      </div>

    </section>

  )
}

export default Hero2