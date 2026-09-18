import React, { useContext } from 'react'
import Navbar from './Navbar'
import Navbar2 from './Navbar2'
import Footer from './Footer'
import Button from './button'
import { Link, useParams } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { ProductContext } from '../context/ProductContext'
const Products = () => {
  const {products}=useContext(ProductContext)
  const { category } = useParams()
  const filterProduct = products.filter((item) => {
   return item.category
    .split(' ')
    .join('')
    .toLowerCase()
    .includes(category.toLowerCase().split(' ').join(''))
  })
  const { addToCart } = useContext(CartContext)
  return (
    <div>
      <Navbar />
      <Navbar2 />
      <div className='w-full flex flex-wrap gap-8 px-30 justify-center my-10'>
        {
          filterProduct.map(function (item) {
            return (<Link to={`/product/${item._id}`}>
              <div key={item._id} className='flex flex-col items-center gap-3'>
                <div className=' w-[300px] h-[300px] object-cover'>
                  <img className='w-full h-full ' src={item.imagesUrl} alt="" />
                </div>
                <h1>{item.name}</h1>
                <p>₹{item.price}</p>
                <Button addToCart={addToCart} item={item} button={"ADD TO CART"} />
              </div>
            </Link>

            )
          })}
      </div>
      <Footer />

    </div>
  )
}
export default Products
