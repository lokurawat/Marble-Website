import React from 'react'
import Navbar from '../components/Navbar'
import Navbar2 from '../components/Navbar2'
import Footer from '../components/Footer'
import BenefitComponent from '../components/BenefitComponent'

const Benefits = () => {

  return (

    <div className='min-h-screen w-full'>

      <Navbar />
      <Navbar2 />

      {/* CONTENT */}

      <div className='px-5 sm:px-10 lg:px-30 py-12 lg:py-25 flex flex-col gap-10'>

        {/* HEADING */}

        <div className='flex justify-center items-center flex-col text-center'>

          <h1 className='font-medium tracking-widest text-2xl sm:text-3xl lg:text-4xl text-gray-700 mb-6'>

            BENEFITS WITH US

          </h1>

          <p className='text-sm sm:text-base lg:text-lg max-w-[1000px] leading-7'>

            As India’s premier importer & manufacturer of Italian Marble,
            Elegant Marbles & Grani Industries Ltd. has a demonstrated
            expertise in selecting & supplying high quality materials.

          </p>

        </div>

        {/* BENEFITS */}

        <BenefitComponent
          data1={"Hand Selected Slabs & Blocks"}

          data2={"Much like buying a diamond, materials are evaluated for their color, content, clarity, and consistency with consideration on how the vein structures lend to book match veining. Which means you will only find stones of exceptional quality, generally only a 9 or 10 on the international quality standard scale at our yards."}
        />

        <BenefitComponent
          data1={"Exclusive Relationships at the source"}

          data2={"From the prestigious Carrara Mountains to the European quarries, not only are we able to directly supply large quantities of consistent quality, but also we get exclusive access to some of newest materials presented by nature."}
        />

        <BenefitComponent
          data1={"100% Transparent Process"}

          data2={"Mirror-polished, reinforced & ready to deliver, all our slabs are ready in their finest form for your inspection & approval prior to delivery so there are no surprises in your dream project"}
        />

      </div>

      <Footer />

    </div>

  )

}

export default Benefits