import React from 'react'
import Button from './button'

const Hero1 = () => {

  return (

    <div
      className='w-full min-h-screen flex items-center bg-[url("https://images.unsplash.com/photo-1558346648-9757f2fa4474?q=80&w=2070&auto=format&fit=crop")] bg-cover bg-center px-5 sm:px-10 lg:px-35'
    >

      <div className='max-w-[800px]'>

        <h1
          style={{ fontFamily:'Playfair Display' }}

          className='font-semibold text-4xl sm:text-5xl lg:text-7xl mb-5 leading-tight'
        >

          India's largest indian marble collection

        </h1>

        <Button button={"Shop Now"} />

      </div>

    </div>

  )

}

export default Hero1