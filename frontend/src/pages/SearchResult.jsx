import React, { useContext, useState } from 'react'
import { SearchContext } from '../context/SearchContext'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Navbar2 from '../components/Navbar2'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import { ProductContext } from '../context/ProductContext'

const SearchResults = () => {

    const { products } = useContext(ProductContext)
    const { search } = useContext(SearchContext)

    const filteredProducts = products.filter((item) => {

        return item.name
            .toLowerCase()
            .includes(search.toLowerCase())

    })

    return (

        <div className='min-h-screen bg-gray-50'>

            <Navbar />
            <Navbar2 />

            {/* SEARCH BAR */}

            <div className='w-full flex justify-center items-center py-8 px-5'>
                <SearchBar />
            </div>


            {/* SEARCH TITLE */}

            {search && filteredProducts.length > 0 && (

                <div className='text-center mb-8'>

                    <h1 className='text-2xl sm:text-3xl font-semibold text-gray-800'>
                        Search Results
                    </h1>

                    <p className='text-gray-500 mt-2'>
                        Results for "{search}"
                    </p>

                </div>

            )}


            {/* NO PRODUCTS */}

            {filteredProducts.length === 0 ? (

                <div className='min-h-[50vh] flex flex-col justify-center items-center px-5'>

                    <div className='text-6xl mb-5'>
                        🔍
                    </div>

                    <h2 className='text-2xl sm:text-3xl font-semibold text-gray-700'>
                        No Products Found
                    </h2>

                    <p className='text-gray-500 mt-2 text-center'>
                        We couldn't find any product matching "{search}".
                    </p>

                </div>

            ) : (

                /* PRODUCTS */

                <div className='w-full flex flex-wrap gap-8 justify-center px-6 lg:px-30 pb-16'>

                    {filteredProducts.map((item) => (

                        <Link
                            key={item._id}
                            to={`/product/${item._id}`}
                            className='w-[300px]'
                        >

                            <div className='bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-1'>

                                {/* IMAGE */}

                                <ProductImage
                                    src={item.imagesUrl}
                                    alt={item.name}
                                />

                                {/* PRODUCT DETAILS */}

                                <div className='p-5'>

                                    <h2 className='text-lg font-semibold text-gray-800 line-clamp-2'>
                                        {item.name}
                                    </h2>

                                    <p className='text-[#8B5E3C] text-xl font-bold mt-2'>
                                        ₹{item.price}
                                    </p>

                                </div>

                            </div>

                        </Link>

                    ))}

                </div>

            )}

            <Footer />

        </div>

    )
}


/* PRODUCT IMAGE */

const ProductImage = ({ src, alt }) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    return (

        <div className='relative w-full h-[300px] bg-gray-100 overflow-hidden'>

            {/* LOADING */}

            {loading && !error && (

                <div className='absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center'>

                    <div className='w-10 h-10 border-4 border-gray-300 border-t-[#8B5E3C] rounded-full animate-spin'></div>

                </div>

            )}


            {/* IMAGE */}

            {!error ? (

                <img
                    src={src}
                    alt={alt}
                    loading='lazy'
                    onLoad={() => setLoading(false)}
                    onError={() => {
                        setLoading(false)
                        setError(true)
                    }}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                        loading
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

export default SearchResults