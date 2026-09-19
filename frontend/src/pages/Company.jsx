import React from 'react'
import Navbar from '../components/Navbar'
import Navbar2 from '../components/Navbar2'
import myImage from "../assets/rajveerji.jpg"
import Footer from "../components/Footer"

const Company = () => {

  return (

    <div className='w-full min-h-screen'>

      <Navbar />
      <Navbar2 />

      {/* MAIN CONTENT */}

      <div className='py-12 lg:py-30 px-5 sm:px-10 lg:px-40'>

        {/* TOP SECTION */}

        <div className='flex flex-col gap-6 justify-center items-center py-10 lg:py-20 text-center'>

          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-medium'>

            Speciality Of Balaji Marble

          </h1>

          <p className='leading-7 lg:leading-8 text-sm sm:text-base lg:text-lg max-w-[1000px]'>

            Balaji Marbles India is a superior natural stone company
            with a wide selection of affordable services and high-quality
            products for residential and commercial projects throughout India.
            We provide a variety of colors and designs to fit your house needs.

          </p>

        </div>

        {/* OWNER SECTION */}

        <div className='flex flex-col lg:flex-row w-full justify-center gap-10 lg:gap-28 items-center'>

          {/* IMAGE */}

          <div className='h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] border rounded border-gray-500 overflow-hidden'>

            <img
              className='w-full h-full object-cover'
              src={myImage}
              alt=""
            />

          </div>

          {/* TEXT */}

          <div className='flex flex-col items-center lg:items-start text-center lg:text-left'>

            <h1 className='text-2xl sm:text-3xl font-semibold'>

              Rajveer Ji

            </h1>

            <h1 className='font-bold text-xl sm:text-2xl text-gray-700'>

              (Owner)

            </h1>

          </div>

        </div>

      </div>

      <Footer />

    </div>

  )

}

export default Company