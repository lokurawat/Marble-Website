import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'

const Button = (props) => {
const {addToCart}=useContext(CartContext)
  return (
    <button onClick={(e)=>{
      e.preventDefault()
      addToCart(props.item)
    }} className='bg-green-500 px-5 py-2 rounded cursor-pointer text-white active:scale-95 transition-all duration-150'>
      {props.button}
    </button>
  )
}

export default Button
