import React from 'react'

const BenefitComponent = ({data1,data2}) => {
  return (
    <div className='flex justify-center items-start flex-col gap-4'>
        <h2 className='font-light tracking-widest text-xl text-gray-700 '>{data1}</h2>
        <p className='text-lg'>{data2}</p>
      </div>
  )
}

export default BenefitComponent
