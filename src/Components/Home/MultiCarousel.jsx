import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function MultiCarousel() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 0 // this is needed to tell the amount of px that should be visible.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      partialVisibilityGutter: 0 // this is needed to tell the amount of px that should be visible.
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
      partialVisibilityGutter: 0 // this is needed to tell the amount of px that should be visible.
    }
  }
  return (
    <div className=''>

      <div className='bg-logo_yellow w-[100%] md:w-[90%] lg:w-[1024PX] px-5  mt-10 h-[400px] md:min-h-[450px] lg:min-h-[600px] mx-auto relative rounded-lg '>
        <div className='text-center py-4'>
          <div className='h2 '>
            From Learning to Mastery
          </div>
          <div className='h4 text-center mt-3' >
            "Our trainers are dedicated to taking students on a journey from learning the basics to mastering their chosen fields."

          </div>
        </div>
        <div className=''>
          <Carousel partialVisible={true} responsive={responsive} focusOnSelect={true} autoPlay={true} rewind={true} rewindWithAnimation={true}>

            <div className='text-center sm:w-[400px] md:w-[100%] mx-auto rounded-xl md:px-5 lg:px-5'>
              <img className='h-48 md:h-60 w-[400px] md:w-[100%] lg:w-[100%] lg:h-80  rounded-t-xl' src="https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
              <div className='text-center rounded-b-xl w-[400px] md:w-[100%] lg:w-[100%]   h3 pb-3 h-10 bg-black  text-white'>Ranjith - black belt</div>
            </div>  

            <div className='text-center sm:w-[400px] md:w-[100%] mx-auto rounded-xl md:px-5 lg:px-5'>
              <img className='h-48 md:h-60 w-[400px] md:w-[100%] lg:w-[100%] lg:h-80  rounded-t-xl' src="https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
              <div className='text-center rounded-b-xl w-[400px] md:w-[100%] lg:w-[100%]   h3 pb-3 h-10 bg-black  text-white'>Ranjith - black belt</div>
            </div>  

            <div className='text-center sm:w-[400px] md:w-[100%] mx-auto rounded-xl md:px-5 lg:px-5'>
              <img className='h-48 md:h-60 w-[400px] md:w-[100%] lg:w-[100%] lg:h-80  rounded-t-xl' src="https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
              <div className='text-center rounded-b-xl w-[400px] md:w-[100%] lg:w-[100%]   h3 pb-3 h-10 bg-black  text-white'>Ranjith - black belt</div>
            </div>  

            <div className='text-center sm:w-[400px] md:w-[100%] mx-auto rounded-xl md:px-5 lg:px-5'>
              <img className='h-48 md:h-60 w-[400px] md:w-[100%] lg:w-[100%] lg:h-80  rounded-t-xl' src="https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
              <div className='text-center rounded-b-xl w-[400px] md:w-[100%] lg:w-[100%]   h3 pb-3 h-10 bg-black  text-white'>Ranjith - black belt</div>
            </div>  

{/*             
            <div className='text-center rounded-xl md:px-0 lg:px-5'>
              <img className='h-48 md:h-60 w-[100%] md:w-[100%] lg:h-80 lg:w-[100%] rounded-t-xl' src="https://images.pexels.com/photos/264905/pexels-photo-264905.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
              <div className='text-center rounded-b-xl   h3 pb-3 h-10 bg-black  text-white'>Ranjith - black belt</div>
            </div> 
            
            
            <div className='text-center rounded-xl md:px-0 lg:px-5'>
              <img className='h-48 md:h-60 w-[100%] md:w-[100%] lg:h-80 lg:w-[100%] rounded-t-xl' src="https://images.pexels.com/photos/9962890/pexels-photo-9962890.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
              <div className='text-center rounded-b-xl   h3 pb-3 h-10 bg-black  text-white'>Ranjith - black belt</div>
            </div>  
            
            <div className='text-center rounded-xl md:px-0 lg:px-5'>
              <img className='h-48 md:h-60 w-[100%] md:w-[100%] lg:h-80 lg:w-[100%] rounded-t-xl' src="https://images.pexels.com/photos/5691359/pexels-photo-5691359.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
              <div className='text-center rounded-b-xl   h3 pb-3 h-10 bg-black  text-white'>Ranjith - black belt</div>
            </div> 
            
            <div className='text-center rounded-xl md:px-0 lg:px-5'>
              <img className='h-48 md:h-60 w-[100%] md:w-[100%] lg:h-80 lg:w-[100%] rounded-t-xl' src="https://images.pexels.com/photos/264905/pexels-photo-264905.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
              <div className='text-center rounded-b-xl   h3 pb-3 h-10 bg-black  text-white'>Ranjith - black belt</div>
            </div>  */}
            {/* <div><img className='h-96 w-96 rounded-lg' src="https://images.pexels.com/photos/6898860/pexels-photo-6898860.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" /></div>
    <div><img className='h-96 w-96 rounded-lg' src="https://images.pexels.com/photos/264905/pexels-photo-264905.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" /></div>
    <div><img className='h-96 w-96 rounded-lg' src="https://images.pexels.com/photos/9962890/pexels-photo-9962890.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" /></div>
    <div><img className='h-96 w-96 rounded-lg' src="https://images.pexels.com/photos/5691359/pexels-photo-5691359.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" /></div>
    <div><img className='h-96 w-96 rounded-lg' src="https://images.pexels.com/photos/264905/pexels-photo-264905.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" /></div> */}

          </Carousel>
        </div>

      </div>



    </div>
  )
}

export default MultiCarousel;