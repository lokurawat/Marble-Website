import React, { useContext } from 'react'
import { IoCartOutline } from "react-icons/io5"
import { FaRegHeart } from "react-icons/fa"
import { VscAccount } from "react-icons/vsc"
import { FaSearch } from "react-icons/fa"
import { CartContext } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'
import { SearchContext } from '../context/SearchContext'
import { AuthContext } from '../context/auth-context'

const Navbar = () => {
   const {user}=useContext(AuthContext)

  const { totalItems } = useContext(CartContext)
  const {search,setSearch}=useContext(SearchContext)
  const navigate=useNavigate();
  return (

    <div className='w-full bg-[#FFFFFF] flex flex-col lg:flex-row justify-between items-center px-5 lg:px-10 py-5 gap-5'>

      {/* SEARCH */}

      <div onClick={()=>navigate('/search')} className='text-2xl lg:text-3xl'>
        <FaSearch className='text-gray-500 cursor-pointer w-full' />  
      </div>

      {/* LOGO */}

      <div className='flex flex-col items-center'>

        <h1 className='font-bold tracking-wider text-xl sm:text-2xl lg:text-3xl text-center'>
          BalajiMarbleIndia
        </h1>

        <p className='text-sm sm:text-base lg:text-xl'>
          Makrana
        </p>

      </div>

      {/* ICONS */}

      <div className='flex items-center gap-5'>

        <Link to={"/accountinfo"}>
        {!user?<button className='text-2xl lg:text-3xl cursor-pointer'>
          <VscAccount />
        </button>:<div className="w-10 h-10  rounded-full bg-green-300 text-black flex items-center justify-center text-3xl font-bold">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>}
        </Link>

        <Link to={"/cart"}>

          <button className='relative cursor-pointer'>

            <IoCartOutline className='text-3xl lg:text-4xl' />

            <div className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 lg:w-8 lg:h-8 flex justify-center items-center text-sm lg:text-xl'>

              {totalItems}

            </div>

          </button>

        </Link>

        <button className='text-2xl lg:text-3xl cursor-pointer'>
          <FaRegHeart />
        </button>

      </div>

    </div>

  )

}

export default Navbar