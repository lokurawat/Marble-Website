import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Navbar2 from './Navbar2'

const AllProducts = () => {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()

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

  return (
   <div >
    <Navbar></Navbar>
    <Navbar2/>
     <div className='w-full flex flex-wrap gap-8 px-6 lg:px-30 justify-center my-10'>
      {products.map((item) => (
        <div
          key={item._id}
          className='flex flex-col items-center gap-3'
        >
          <Link to={`/product/${item._id}`}>
            
            <div className='w-[300px] h-[300px]'>
              {item.imagesUrl ? (
                <img
                  className='w-full h-full object-cover'
                  src={item.imagesUrl}
                  alt={item.name}
                />
              ) : (
                <div className='w-full h-full grid place-items-center bg-gray-100'>
                  No image
                </div>
              )}
            </div>

            <h1>{item.name}</h1>
            <p>₹{item.price}</p>

          </Link>

          <Button
            item={item}
            button='ADD TO CART'
          />
        </div>
      ))}
    </div>
    <Footer/>
    
   </div>
  )
}

export default AllProducts