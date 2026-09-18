import React, { useContext, useEffect } from 'react'
import { SearchContext } from '../context/SearchContext'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Navbar2 from '../components/Navbar2'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import { ProductContext } from '../context/ProductContext'
const SearchResults = () => {
 
    const {products}=useContext(ProductContext)

    const { search } = useContext(SearchContext)

    const filteredProducts = products.filter((item) => {

        return item.name
            .toLowerCase()
            .includes(search.toLowerCase())

    })

    return (

        <div>

            <Navbar />
            <Navbar2 />
            <div className='w-full flex justify-center items-center'>
                <SearchBar />
            </div>

            <div className='w-full flex flex-wrap gap-8 justify-center my-10 px-30 '>

                {
                    (filteredProducts.length === 0) ? <div className='text-4xl font-bold text-gray-500 h-[60vh] flex items-center'>
  No Products Found
</div>
                        : filteredProducts.map((item) => {

                            return (

                                <Link
                                    key={item._id}
                                    to={`/product/${item._id}`}
                                >

                                    <div className='w-[300px] flex flex-col gap-3 items-center'>

                                        <img
                                            className='w-full h-[300px] object-cover'
                                            src={item.imagesUrl}
                                            alt=""
                                        />

                                        <h1>{item.name}</h1>

                                        <p>₹{item.price}</p>

                                    </div>

                                </Link>

                            )

                        })

                }

            </div>
            <Footer />

        </div>

    )

}

export default SearchResults