import React from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Navbar2 from './components/Navbar2';
import Hero1 from './components/Hero1';
import Hero2 from './components/Hero2';
import Hero3 from './components/Hero3';
import Hero4 from './components/Hero4';
const App = () => {
   
  return ( 
    <div className="min-h-screen w-full"> 

      <div className="sticky top-0 z-50">
        <Navbar/>
      </div>
        <Navbar2/>
      <Hero1/> 
      <Hero2/> 
      <Hero3/> 
      <Hero4/> 
      <Footer/> 

    </div> 
  ) 
} 
 
export default App
  
