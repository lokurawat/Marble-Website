import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io"
import { Link } from 'react-router-dom'
import DropDownButoon from './DropDownButoon'

const Navbar2 = () => {

  const [open, setOpen] = useState("")

  let content

  if(open === "About"){

    content = (

      <div className='bg-white mt-2 px-5 py-3 w-50 flex flex-col items-start gap-3 border border-gray-200 cursor-pointer'>

        <DropDownButoon
          data={"History"}
          url={"/history"}
        />

       <DropDownButoon
          data={"Company"}
          url={"/company"}
        />

        <DropDownButoon
          data={"Benefits"}
          url={"/benefits"}
        />

       <DropDownButoon
          data={"Contact"}
          url={"/contact"}
        />

      </div>

    )

  }

  if(open === "Products"){

    content = (

      <div className='bg-white mt-2 px-5 py-3 w-55 flex flex-col items-start gap-3 border border-gray-200 cursor-pointer'>

        <DropDownButoon
          data={"Indian Marble"}
          url={"/products/indianmarble"}
        />

        <DropDownButoon
          data={"Granite"}
          url={"/products/granite"}
        />

        <DropDownButoon
          data={"Imported Marble"}
          url={"/products/importedmarble"}
        />

        <DropDownButoon
          data={"Marble Tiles"}
          url={"/products/marbletiles"}
        />

        <DropDownButoon
          data={"Onyx Stone"}
          url={"/products/onyxstone"}
        />

        <DropDownButoon
          data={"SandStone"}
          url={"/products/sandstone"}
        />

      </div>

    )

  }

  if(open === "PriceList"){

    content = (

      <div className='bg-white mt-2 px-5 py-3 w-60 flex flex-col items-start gap-3 border border-gray-200 cursor-pointer'>

      <DropDownButoon
  data={"Indian Marble Price"}
  url={"/pricelist/indianmarble"}
/>

<DropDownButoon
  data={"Italian Marble Price"}
  url={"/pricelist/italianmarble"}
/>

<DropDownButoon
  data={"Granite Price"}
  url={"/pricelist/granite"}
/>

<DropDownButoon
  data={"Marble Tiles Price"}
  url={"/pricelist/marbletiles"}
/>

<DropDownButoon
  data={"Onyx Price"}
  url={"/pricelist/onyxstone"}
/>

<DropDownButoon
  data={"Sandstone Price"}
  url={"/pricelist/sandstone"}
/>
      </div>

    )

  }

  return (

    <div className='w-full flex flex-wrap justify-center items-center gap-5 lg:gap-10 px-5 lg:px-10 py-5 border-t border-gray-200'>

      {/* HOME */}

      <Link to={"/"}>

        <button className="cursor-pointer text-sm sm:text-base lg:text-lg">
          Home
        </button>

      </Link>

      {/* ABOUT */}

      <div
        className='relative flex flex-col'

        onMouseEnter={() => {
          setOpen("About")
        }}

        onMouseLeave={() => {
          setOpen("")
        }}
      >

        <button className="text-sm sm:text-base lg:text-lg cursor-pointer">

          <div className='flex items-center gap-1'>

            <div>About Us</div>

            <div>
              <IoIosArrowDown />
            </div>

          </div>

        </button>

        <div className='absolute top-7 z-50'>
          {open === "About" && content}
        </div>

      </div>

      {/* PRODUCTS */}

      <div
        className='relative flex flex-col'

        onMouseEnter={() => {
          setOpen("Products")
        }}

        onMouseLeave={() => {
          setOpen("")
        }}
      >

        <Link to={"/getAllProducts"} className="text-sm sm:text-base lg:text-lg cursor-pointer">

          <div className='flex items-center gap-1'>

            <div>Products</div>

            <div>
              <IoIosArrowDown />
            </div>

          </div>

        </Link>

        <div className='absolute top-7 z-50'>
          {open === "Products" && content}
        </div>

      </div>

      {/* PRICE LIST */}

      <div
        className='relative flex flex-col'

        onMouseEnter={() => {
          setOpen("PriceList")
        }}

        onMouseLeave={() => {
          setOpen("")
        }}
      >

        <button className="text-sm sm:text-base lg:text-lg cursor-pointer">

          <div className='flex items-center gap-1'>

            <div>Price List</div>

            <div>
              <IoIosArrowDown />
            </div>

          </div>

        </button>

        <div className='absolute top-7 z-50'>
          {open === "PriceList" && content}
        </div>

      </div>

      {/* CONTACT */}

      <Link to={"/contactus"}>

        <button className="cursor-pointer text-sm sm:text-base lg:text-lg">
          Contact Us
        </button>

      </Link>

    </div>

  )

}

export default Navbar2
