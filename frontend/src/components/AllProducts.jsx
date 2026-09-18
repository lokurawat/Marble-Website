import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Navbar2 from './Navbar2'
import Button from './Button'
const AllProducts = () => {

  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        setLoading(true)

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products`
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Products could not be loaded.')
        }

        setProducts(data)

      } catch (error) {

        console.error(error)
        setError('Products could not be loaded.')

      } finally {

        setLoading(false)

      }
    }

    fetchProducts()

  }, [])


  /* LOADING */

  if (loading) {

    return (
      <div className='min-h-screen bg-gray-50'>

        <Navbar />
        <Navbar2 />

        <div className='w-full flex flex-wrap gap-8 px-6 lg:px-30 justify-center my-10'>

          {Array.from({ length: 8 }).map((_, index) => (

            <div
              key={index}
              className='w-[300px] animate-pulse'
            >

              {/* IMAGE SKELETON */}

              <div className='w-[300px] h-[300px] bg-gray-200 rounded-xl'></div>

              {/* NAME */}

              <div className='h-5 bg-gray-200 rounded mt-4 w-3/4'></div>

              {/* PRICE */}

              <div className='h-5 bg-gray-200 rounded mt-3 w-1/3'></div>

              {/* BUTTON */}

              <div className='h-10 bg-gray-200 rounded mt-4 w-full'></div>

            </div>

          ))}

        </div>

        <Footer />

      </div>
    )

  }


  /* ERROR */

  if (error) {

    return (
      <div className='min-h-screen bg-gray-50'>

        <Navbar />
        <Navbar2 />

        <div className='min-h-[50vh] flex flex-col justify-center items-center px-5'>

          <h2 className='text-2xl font-semibold text-gray-700'>
            Something went wrong
          </h2>

          <p className='text-gray-500 mt-2'>
            {error}
          </p>

        </div>

        <Footer />

      </div>
    )

  }


  /* PRODUCTS */

  return (

    <div className='bg-gray-50 min-h-screen'>

      <Navbar />
      <Navbar2 />

      {/* HEADER */}

      <div className='text-center py-10 px-5'>

        <h1 className='text-3xl sm:text-4xl font-semibold text-gray-800'>
          Our Products
        </h1>

        <p className='text-gray-500 mt-3'>
          Explore our premium collection of marble and natural stones.
        </p>

      </div>


      {/* PRODUCTS */}

      <div className='w-full flex flex-wrap gap-8 px-6 lg:px-30 justify-center pb-16'>

        {products.map((item) => (

          <div
            key={item._id}
            className='w-[300px] bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden'
          >

            <Link to={`/product/${item._id}`}>

              {/* IMAGE */}

              <ProductImage
                src={item.imagesUrl}
                alt={item.name}
              />

              {/* PRODUCT INFORMATION */}

              <div className='p-5'>

                <h2 className='text-lg font-semibold text-gray-800 line-clamp-2'>
                  {item.name}
                </h2>

                <p className='text-[#8B5E3C] text-xl font-bold mt-2'>
                  ₹{item.price}
                </p>

              </div>

            </Link>


            {/* ADD TO CART */}

            <div className='px-5 pb-5'>

              <Button
                item={item}
                button='ADD TO CART'
              />

            </div>

          </div>

        ))}

      </div>

      <Footer />

    </div>

  )
}


/* PRODUCT IMAGE */

const ProductImage = ({ src, alt }) => {

  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  return (

    <div className='relative w-full h-[300px] bg-gray-100 overflow-hidden'>

      {/* SKELETON */}

      {imageLoading && !imageError && (
        <div className='absolute inset-0 animate-pulse bg-gray-200'>

          <div className='absolute inset-0 flex items-center justify-center'>

            <div className='w-10 h-10 border-4 border-gray-300 border-t-[#8B5E3C] rounded-full animate-spin'></div>

          </div>

        </div>
      )}


      {/* IMAGE */}

      {!imageError ? (

        <img
          src={src}
          alt={alt}
          loading='lazy'
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageLoading(false)
            setImageError(true)
          }}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoading
              ? 'opacity-0 scale-105'
              : 'opacity-100 scale-100'
          }`}
        />

      ) : (

        /* FALLBACK */

        <div className='w-full h-full flex flex-col items-center justify-center text-gray-400'>

          <div className='text-4xl mb-2'>
            🖼️
          </div>

          <p className='text-sm'>
            Image unavailable
          </p>

        </div>

      )}

    </div>

  )
}

export default AllProducts