import React, { useContext } from 'react'
import { FaSearch } from 'react-icons/fa'
import { SearchContext } from '../context/SearchContext'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const {search,setSearch}=useContext(SearchContext)
    const navigate=useNavigate()
  return (
    <div className='w-100 flex justify-center items-center gap-3 rounded-full border px-4 py-2'>
 <input value={search} type="text" className='w-full outline-none' placeholder='Search Product...'  onChange={(e)=>{
    setSearch(e.target.value)
    navigate("/search")
 }}/>
 <FaSearch className='text-green-500 cursor-pointer text-2xl' />
    </div>
  )
}

export default SearchBar
