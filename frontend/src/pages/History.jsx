import React from 'react'
import Navbar from '../components/Navbar'
import Navbar2 from '../components/Navbar2'
import Footer from '../components/Footer'
import HistoryHero from '../components/HistoryHero'

const History = () => {

  return (

    <div className='min-h-screen w-full'>

      <Navbar />
      <Navbar2 />

      {/* HEADING */}

      <div className='px-5 sm:px-10 lg:px-30 pt-10 lg:pt-20 text-center'>

        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-wide text-gray-700'>
          Our History
        </h1>

        <p className='mt-5 text-sm sm:text-base lg:text-lg text-gray-600 leading-7 max-w-[1000px] mx-auto'>
          Balaji Marble India has been delivering premium marble and
          natural stones with trust, craftsmanship, and quality for decades.
        </p>

      </div>

      {/* HISTORY SECTIONS */}

      <HistoryHero
        heading={"EARLY 1980'S - ACHIEVING AN INTERNATIONAL STANDARD IN ITALIAN MARBLE PROCESSING"}

        img={"https://images.pexels.com/photos/14225905/pexels-photo-14225905.jpeg"}

        paragraph={
          "In the early 1980's Elegant set up its Mt. Abu, Rajasthan factory to manufacture marble tiles. The founders vision to bring an international standard of architectural materials led to the introduction of Italian machinery and world-class marble processing in India."
        }
      />

      <HistoryHero
        reverse={true}

        heading={"EXPANDING PREMIUM MARBLE COLLECTIONS ACROSS INDIA"}

        img={"https://www.jsbitalianmarble.com/wp-content/uploads/2025/12/Marble-Dealers-in-Kishangarh-Rajasthan.png"}

        paragraph={
          "Balaji Marble India continued expanding its premium natural stone collection while maintaining high standards in quality, finishing, and customer trust across residential and commercial projects."
        }
      />

      <HistoryHero

        heading={"ADVANCED STONE PROCESSING AND MODERN INFRASTRUCTURE"}

        img={"https://www.pedrini.it/media/ct2pdsbx/1_dji_0576_web.jpg"}

        paragraph={
          "With modern machinery and experienced craftsmanship, the company improved production quality and introduced elegant marble finishes suitable for luxury interiors and architecture."
        }
      />

      <HistoryHero
        reverse={true}

        heading={"BECOMING A TRUSTED NAME IN NATURAL STONES"}

        img={"https://marblecity.in/marblecity/showroom/17.jpg"}

        paragraph={
          "Through dedication, innovation, and customer satisfaction, Balaji Marble India established itself as a trusted marble supplier known for premium quality and timeless stone collections."
        }
      />

      <Footer />

    </div>

  )

}

export default History