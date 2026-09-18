import React from 'react'

const Footer = () => {

  return (

    <div className='footer flex flex-col lg:flex-row justify-between w-full gap-12 px-5 sm:px-10 lg:px-35 py-12 bg-[#f8f8f8]'>

      {/* LEFT SECTION */}

      <div className='flex flex-col gap-6'>

        <div className="flex flex-col gap-2">

          <div className="font-medium text-xl">

            Address

          </div>

          <p className='max-w-[400px] text-gray-700 leading-7 text-sm sm:text-base'>

            R. K. Bye-Pass Road, Borawar,
            Makrana 341502,
            Rajasthan, India

          </p>

        </div>

        <div className="flex flex-col gap-2">

          <div className="font-medium text-xl">

            Phone

          </div>

          <p className='text-gray-700 text-sm sm:text-base'>

            +91-9928979999

          </p>

        </div>

        <div className="flex flex-col gap-2">

          <div className="font-medium text-xl">

            Email

          </div>

          <p className='text-gray-700 text-sm sm:text-base break-all'>

            info@rkmarblesindia.com

          </p>

        </div>

        <div className="flex flex-col gap-2">

          <div className="font-medium text-xl">

            Working Hours

          </div>

          <p className='text-gray-700 text-sm sm:text-base'>

            Mon-Sun / 11:00AM – 8:00PM

          </p>

        </div>

      </div>

      {/* MIDDLE SECTION */}

      <div className='flex flex-col gap-5'>

        <h1 className="font-medium text-xl">

          About us

        </h1>

        <div className="text-gray-700 text-sm sm:text-base cursor-pointer hover:text-black transition-all">

          Company

        </div>

        <div className="text-gray-700 text-sm sm:text-base cursor-pointer hover:text-black transition-all">

          Customer Reviews

        </div>

        <div className="text-gray-700 text-sm sm:text-base cursor-pointer hover:text-black transition-all">

          International Shipping Policy

        </div>

        <div className="text-gray-700 text-sm sm:text-base cursor-pointer hover:text-black transition-all">

          i Store

        </div>

        <div className="text-gray-700 text-sm sm:text-base cursor-pointer hover:text-black transition-all">

          Transport Estimate

        </div>

      </div>

      {/* RIGHT SECTION */}

      <div className='flex flex-col gap-5'>

        <h2 className="font-medium text-xl">

          Customer Support

        </h2>

        <div className="text-gray-700 text-sm sm:text-base cursor-pointer hover:text-black transition-all">

          Payment and Shipping Terms

        </div>

        <div className="text-gray-700 text-sm sm:text-base cursor-pointer hover:text-black transition-all">

          Refund and Safety Policy

        </div>

        <div className="text-gray-700 text-sm sm:text-base cursor-pointer hover:text-black transition-all">

          Terms of Service

        </div>

        <div className="text-gray-700 text-sm sm:text-base cursor-pointer hover:text-black transition-all">

          Privacy Policy

        </div>

        <div className="text-gray-700 text-sm sm:text-base cursor-pointer hover:text-black transition-all">

          Installation and Maintenance

        </div>

      </div>

    </div>

  )

}

export default Footer