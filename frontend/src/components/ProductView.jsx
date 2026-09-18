import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import Navbar2 from './Navbar2'
import Footer from './Footer'
import Button from './button'
import { ProductContext } from '../context/ProductContext'

const ProductView = () => {
  const { products } = useContext(ProductContext)
  const { id } = useParams()
  const product = products.find((item) => item._id === id)

  if (products.length === 0) {
    return <div className='p-8 text-center'>Loading product...</div>
  }

  if (!product) {
    return <div className='p-8 text-center text-red-600'>Product not found.</div>
  }

  return (
    <div className='w-full'>
      <Navbar />
      <Navbar2 />

      <div className='py-10 lg:py-20'>
        <div className='flex flex-col lg:flex-row px-5 sm:px-10 lg:px-30 gap-10 w-full'>
          <div className='w-full max-w-[430px] h-[300px] sm:h-[430px]'>
            <img
              className='w-full h-full object-cover rounded'
              src={product.imagesUrl}
              alt={product.name}
            />
          </div>

          <div className='flex flex-col gap-4 lg:ml-20 w-full'>
            <h1 className='text-2xl sm:text-3xl font-medium'>{product.name}</h1>
            <hr className='w-full border-gray-300' />
            <p className='font-normal text-base sm:text-xl'>{product.category}</p>
            <p className='font-medium text-xl sm:text-2xl'>₹{product.price}</p>
            <Button item={product} button='ADD TO CART' />
          </div>
        </div>
      </div>

      <div className='px-5 sm:px-10 lg:px-30 pb-20'>
        <h2 className='text-2xl font-medium mb-5'>Description</h2>
        <p className='text-justify text-sm sm:text-base lg:text-xl font-light leading-7 lg:leading-9'>
          {product.description}
        </p>
      </div>

      <Footer />
    </div>
  )
}

export default ProductView
