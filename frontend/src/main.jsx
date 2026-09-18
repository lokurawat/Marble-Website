import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import App from './App.jsx'
import Company from './pages/Company.jsx'
import Contact from './pages/Contact.jsx'
import History from './pages/History.jsx'
import Benefits from './pages/Benefits.jsx'

import Products from './components/Products.jsx'
import ProductView from './components/ProductView.jsx'
import CartProvider from './context/CartContext.jsx'
import SearchProvider from './context/SearchContext.jsx'
import SearchResult from './pages/SearchResult.jsx'
import AuthProvider from './context/AuthContext.jsx'
import AllProducts from './components/AllProducts.jsx'
import ProductProvider from './context/ProductContext.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import Admin from './pages/Admin.jsx'
import Register from './pages/Register.jsx'
import AccountInfo from './components/AccountInfo.jsx'
import PriceList from './priceList/PriceList.jsx'
import Checkout from './pages/Checkout.jsx'

createRoot(document.getElementById('root')).render(
 <ProductProvider>
   <SearchProvider>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>

        <Routes>

            <Route
              path='/'
              element={<App />}
            />

            <Route
              path='/company'
              element={<Company />}
            />

            <Route
              path='/contactus'
              element={<Contact />}
            />

            <Route
              path='/history'
              element={<History />}
            />

            <Route
              path='/benefits'
              element={<Benefits />}
            />

            <Route
              path='/products/:category'
              element={
                <Products />
              }
            />
            <Route path='/search' element={<SearchResult />} />
            <Route
              path='/product/:id'
              element={
                <ProductView />
              }
            />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/getAllProducts' element={<AllProducts/>} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/admin' element={<Admin/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/accountinfo' element={<AccountInfo/>}/>
           <Route path="/pricelist/:category" element={<PriceList />}/>
           <Route path="/checkout" element={<Checkout/>} />
          </Routes>

        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </SearchProvider>
 </ProductProvider>

)
