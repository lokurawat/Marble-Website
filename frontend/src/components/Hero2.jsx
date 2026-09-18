import React from 'react'
import Cards from './Cards'
import { Link } from 'react-router-dom'
import Button from './Button'
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
{/*  */}
         <Link to={"/priceList/sandstone"}>
          <div className='flex flex-col justify-center items-center'>
           
        <Cards
          img={"/sandstone.jpg"}
          heading={"SandStone"}
          
          />
          <div className='bg-green-500 px-5 py-2 rounded cursor-pointer text-white active:scale-95 transition-all duration-150'>View More</div>
          </div>
       </Link>
       <Link to={"/priceList/granite"}>
        <div className='flex flex-col justify-center items-center'>

        <Cards
        img={"/granite.jpg"}
        heading={"Granite"}
        
        />
           <div className='bg-green-500 px-5 py-2 rounded cursor-pointer text-white active:scale-95 transition-all duration-150'>View More</div>
        </div>
        </Link>
        <Link to={"/priceList/indianmarble"}>
         <div className='flex flex-col justify-center items-center'>

        <Cards
          img={"/indian marble.jpg"}
          heading={"Indian Marble"}
          
          />
   <div className='bg-green-500 px-5 py-2 rounded cursor-pointer text-white active:scale-95 transition-all duration-150'>View More</div>
          </div>
          </Link>
<Link to={"/priceList/importedmarble"}>
 <div className='flex flex-col justify-center items-center'>


        <Cards
          img={"/importedmarble.jpg"}
          heading={"Imported Marble"}
          
          />
  <div className='bg-green-500 px-5 py-2 rounded cursor-pointer text-white active:scale-95 transition-all duration-150'>View More</div>
          </div>
          </Link>
<Link to={"/priceList/onyxstone"}>
<div className='flex flex-col justify-center items-center'>
        <Cards
          img={"https://www.rkmarblesindia.com/wp-content/uploads/2021/02/3-10.jpg"}
          heading={"Onyxx Stone"}
          
          />
            <div className='bg-green-500 px-5 py-2 rounded cursor-pointer text-white active:scale-95 transition-all duration-150'>View More</div>
            </div>
          </Link>
          <Link to={"/priceList/marbletiles"}>
          <div className='flex flex-col justify-center items-center'>
          <Cards
          img={"/marbletiles.png"}
          heading={"Marble Tiles"}
          />
          <div className='bg-green-500 px-5 py-2 rounded cursor-pointer text-white active:scale-95 transition-all duration-150'>View More</div>
        </div>

          </Link>

      </div>

    </div>

  )

}

export default Hero2