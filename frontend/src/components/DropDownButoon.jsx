import React from 'react'
import { IoIosArrowForward } from "react-icons/io"
import { Link } from 'react-router-dom'

const DropDownButoon = ({ data, url }) => {

  return (

    <Link
      to={url}
      className='w-full'
    >

      <div className='flex justify-between items-center w-full py-2 px-2 rounded cursor-pointer hover:bg-gray-100 transition-all'>

        <div className='text-sm sm:text-base'>

          {data}

        </div>

        <div className='text-sm sm:text-base'>

          <IoIosArrowForward />

        </div>

      </div>

    </Link>

  )

}

export default DropDownButoon