import React from 'react';
import MultiCarousel from './MultiCarousel';
import master from '../../assets/master.png'


function Home() {

  return (
    <div className='  '>

      <div>
        <div className='h-screen '>
          <div className=' h-[90%] md:h-[85%]  w-[100%]   relative'>
            <img className='bg-cover h-[100%]  w-[100%]   relative ' src="https://images.pexels.com/photos/7942466/pexels-photo-7942466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <div className='absolute top-0  h-[100%]  w-[100%] bg-[#93c5fd] opacity-60 '>
            </div>
            <div className='absolute top-0  h-[100%]  w-[100%] '>
              <div className='flex justify-center items-center w-[100%] '>
              </div>
              <div className='h5  text-white  '>
                <div className='border-2 mt-14    border-logo_red text-logo_red px-2 py-1 inline-block rounded-md '>
                  WORLD SO KYOKSHION
                </div>
                <div className='h1  py-10 lg:py-10 text-logo_blue opacity-90  text-center'>
                  Tamil Nadu Kyokshion Chinnu'S karate Association
                </div>
              </div>
              <div className='h4  w-[95%] md:w-[60%] mx-auto  text-black text-center '>
                Karate, a Japanese martial art, blends powerful strikes and precise techniques to cultivate physical and mental discipline. Rooted in centuries-old traditions, it emphasizes self-defense, respect, and personal development. Practitioners progress through a colored belt system, symbolizing their journey from novice to master.
              </div>
              <div className='flex mt-10 md:pl-10 justify-start lg:mt-10 '>
                <div className='h5 border border-logo_green text-console.log(); px-3 py-1 flex items-center justify-center'>
                  Contact us
                </div>
                <div className='flex justify-center items-center pl-[20px]'>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 20 20"><path fill="currentColor" d="M6.535 2.116c-1.04-.264-2.13-.152-2.984.326c-.87.486-1.48 1.348-1.51 2.501c-.046 1.802.371 4.22 2.027 7.058c1.635 2.803 3.44 4.483 4.938 5.481c.946.631 1.991.648 2.884.237c.88-.405 1.594-1.214 1.965-2.217a1.838 1.838 0 0 0-.12-1.536l-.954-1.702a2.5 2.5 0 0 0-3.074-1.114l-.666.255c-.323.123-.62.066-.788-.1c-.565-.555-.969-1.308-1.152-2.12c-.058-.256.06-.558.342-.771l.601-.454a2.5 2.5 0 0 0 .663-3.239l-.972-1.695a1.929 1.929 0 0 0-1.2-.91M3.041 4.97c.02-.774.412-1.327.998-1.655c.602-.337 1.424-.44 2.25-.23a.93.93 0 0 1 .579.439l.971 1.695a1.5 1.5 0 0 1-.397 1.943l-.601.454c-.52.392-.88 1.064-.716 1.789c.222.982.713 1.913 1.427 2.614c.522.512 1.266.542 1.846.32l.666-.255a1.5 1.5 0 0 1 1.845.668l.953 1.703c.12.214.14.47.055.7c-.29.785-.835 1.374-1.445 1.655c-.597.275-1.272.267-1.911-.16c-1.371-.914-3.07-2.481-4.63-5.153C3.37 8.817 3 6.583 3.042 4.97m9.702-2.908a.5.5 0 1 0-.486.874l.384.214a8.5 8.5 0 0 1 4.33 6.584l.032.315a.5.5 0 1 0 .994-.1l-.031-.314a9.5 9.5 0 0 0-4.84-7.36zm-1.172 2.68a.5.5 0 0 1 .686-.171l.124.074A6.5 6.5 0 0 1 15.45 9.15l.044.267a.5.5 0 1 1-.986.165l-.045-.267a5.5 5.5 0 0 0-2.595-3.812l-.124-.075a.5.5 0 0 1-.172-.686" /></svg>
                  </div>
                  <div className='h5 pl-[3px]'>
                    Have a Question? <br />
                    9585674087
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
      <div>
        <div className='h2 text-center text-logo_red'>
          Founder of this dojo
        </div>
        <div
          className={`bg-logo_white relative flex flex-col gap-10 justify-center  mx-auto items-center lg:grid lg:grid-cols-12 0`}>

          <div className=' flex flex-col col-span-6    w-[100%]     mx-auto lg:pl-[20%]'>
            <div className='h5  text-white  '>
              <div className='border-2 border-logo_red text-logo_blue px-2 py-1 inline-block rounded-md'>
                EDAPPADI KARATE
              </div>
            </div>
            <div className='h2  py-5 lg:py-5  text-logo_blue'>
              MASTER CHINNASAMY
            </div>
            <div className='h4   text-letter-black  text-justify md:w-[90%] text-log_letter_gray'>
              "Chinnusamy Master started as a student and now manages 46 classes. He founded our karate class, holds a black belt, and brings over 16 years of experience, making him a skilled and dedicated leader in martial arts."
            </div>
            <div className='flex mt-7 lg:mt-10 '>
              <div className='flex'>
                <div className='h5 '>
                  Chinnasamy
                </div>
                <div>
                  Founder
                </div>
              </div>
              <div className='flex items-center pl-[20px]'>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 20 20"><path fill="currentColor" d="M6.535 2.116c-1.04-.264-2.13-.152-2.984.326c-.87.486-1.48 1.348-1.51 2.501c-.046 1.802.371 4.22 2.027 7.058c1.635 2.803 3.44 4.483 4.938 5.481c.946.631 1.991.648 2.884.237c.88-.405 1.594-1.214 1.965-2.217a1.838 1.838 0 0 0-.12-1.536l-.954-1.702a2.5 2.5 0 0 0-3.074-1.114l-.666.255c-.323.123-.62.066-.788-.1c-.565-.555-.969-1.308-1.152-2.12c-.058-.256.06-.558.342-.771l.601-.454a2.5 2.5 0 0 0 .663-3.239l-.972-1.695a1.929 1.929 0 0 0-1.2-.91M3.041 4.97c.02-.774.412-1.327.998-1.655c.602-.337 1.424-.44 2.25-.23a.93.93 0 0 1 .579.439l.971 1.695a1.5 1.5 0 0 1-.397 1.943l-.601.454c-.52.392-.88 1.064-.716 1.789c.222.982.713 1.913 1.427 2.614c.522.512 1.266.542 1.846.32l.666-.255a1.5 1.5 0 0 1 1.845.668l.953 1.703c.12.214.14.47.055.7c-.29.785-.835 1.374-1.445 1.655c-.597.275-1.272.267-1.911-.16c-1.371-.914-3.07-2.481-4.63-5.153C3.37 8.817 3 6.583 3.042 4.97m9.702-2.908a.5.5 0 1 0-.486.874l.384.214a8.5 8.5 0 0 1 4.33 6.584l.032.315a.5.5 0 1 0 .994-.1l-.031-.314a9.5 9.5 0 0 0-4.84-7.36zm-1.172 2.68a.5.5 0 0 1 .686-.171l.124.074A6.5 6.5 0 0 1 15.45 9.15l.044.267a.5.5 0 1 1-.986.165l-.045-.267a5.5 5.5 0 0 0-2.595-3.812l-.124-.075a.5.5 0 0 1-.172-.686" /></svg>
                </div>
                <div className='h5 pl-[3px]'>
                  Have a Question? <br />

                  9585674087


                </div>

              </div>
            </div>

            <div className='grid grid-cols-3 gap-10'>
              <div>
                <img src="https://images.pexels.com/photos/15937359/pexels-photo-15937359/free-photo-of-teenage-karate-student-with-crossed-arms.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
              </div>
              <div>
                <img src="https://images.pexels.com/photos/15937359/pexels-photo-15937359/free-photo-of-teenage-karate-student-with-crossed-arms.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
              </div>
              <div>
                <img src="https://images.pexels.com/photos/15937359/pexels-photo-15937359/free-photo-of-teenage-karate-student-with-crossed-arms.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
              </div>
            </div>
          </div>
          <div className='flex flex-col col-span-6 justify-center items-center'>
            <img className='w-[50%] scale-150' src={master} alt="" />
          </div>


        </div>

      </div>


      <div className='mt-36 bg-letter-black rounded-tl-[300px] rounded-br-[300px] pb-24 '>
        <div className='text-center h2 pb-10 pt-10 text-white'>Founder of World so Kyokshion</div>
        <div className='grid grid-cols-3 mx-auto w-[100%]'>
          <div className='flex justify-center items-center w-[80%] mx-auto text-justify h5   text-letter-black  text-white'>
            Karate, a Japanese martial art, blends powerful strikes and precise techniques to cultivate physical and mental discipline. Rooted in centuries-old traditions, it emphasizes self-defense, respect, and personal development. Practitioners progress through a colored belt system, symbolizing their journey from novice to master.

          </div>
          <div>
            <img className='h-64 w-[100%]' src="https://images.pexels.com/photos/7045521/pexels-photo-7045521.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
          </div>
          <div className='flex justify-center items-center w-[80%] mx-auto text-justify h5   text-white'>
            Karate, a Japanese martial art, blends powerful strikes and precise techniques to cultivate physical and mental discipline. Rooted in centuries-old traditions, it emphasizes self-defense, respect, and personal development. Practitioners progress through a colored belt system, symbolizing their journey from novice to master.

          </div>

        </div>

      </div>

      <div className='mt-32 relative'>
        <div className='absolute -top-24   clear-start   pl-[10%]' >
          <svg className='' >
            <path d="M 10 80 Q 130 50 150 90 " className="stroke-logo_red" fill="none" strokeWidth={4} />
          </svg>
          <div className='h2 !text-3xl absolute top-6 '>
            Why Karate
          </div>
        </div>
        <div className='w-[90%] md:w-[50%]  mx-auto space-y-5'>
          <div className='text-left h3 '>
            <div className='text-logo_yellow underline  underline-offset-4'>  Self-Defense: </div> One of the primary reasons people practice karate is to learn self-defense techniques.
          </div>
          <div className='text-left h3'>
            <div className='text-logo_yellow underline underline-offset-4'>  Physical Fitness: </div> Karate training involves rigorous physical activity, promoting overall fitness.
          </div>
          <div className='text-left h3'>
            <div className='text-logo_yellow underline underline-offset-4'> Discipline and Focus: </div> Karate places a strong emphasis on discipline, respect, and mental focus.
          </div>
          <div className='text-left h3'>
            <div className='text-logo_yellow underline underline-offset-4'> Cultural Exchange: </div> Karate places a strong emphasis on discipline, respect, and mental focus.
          </div>
          <div className='text-left h3'>
            <div className='text-logo_yellow underline underline-offset-4'> Adaptability: </div> Karate is versatile and can be adapted to suit different ages, fitness levels, and abilities.
          </div>
        </div>
      </div>






      <div className='mt-36'>

        <div className='h3 text-logo_red text-center mt-10 font-bold  '>Best of us</div>
        <div className='h2 text-logo_blue text-center my-5'>Training Programs</div>
        <div class="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-10 w-[90%]  mx-auto mt-10">

          <div>
            <img className='h-60 w-[100%]' src="https://media.istockphoto.com/id/1960871767/photo/young-karate-fighters-in-karate-school.webp?b=1&s=612x612&w=0&k=20&c=8E39oCq9POzAVdKDGNuUW5393zym4LmZtbRFt0zEc2Q=" alt="" />
            <div className='text-center py-2 h3'>Kids Karate Groups</div>
            <div className='text-center h5 py-2'>Karate can be practiced as an art, self defense or as a combat sport. Traditional karate places emphasis on self-development.</div>
            {/* <div className='text-center mt-5'> <span className='bg-logo_red px-10 h4 py-3 text-logo_white'>Learn More</span></div> */}
          </div>
          <div>
            <img className='h-60 w-[100%]' src="https://media.istockphoto.com/id/1403476109/photo/martial-arts-fighters-training-together.webp?b=1&s=612x612&w=0&k=20&c=9_PGv3g-HylxgE1_Rgg8qdHYglWMblfB0fzom-zZs7I=" alt="" />
            <div className='text-center py-2 h3'>Self Defence Programs</div>
            <div className='text-center h5 py-2'>Karate can be practiced as an art, self defense or as a combat sport. Traditional karate places emphasis on self-development.</div>
          </div>
          <div>
            <img className='h-60 w-[100%]' src="https://media.istockphoto.com/id/1756190078/photo/portrait-of-a-boy-in-a-judo-class-at-the-gym.webp?b=1&s=612x612&w=0&k=20&c=CSJeYHU5YB6J3LHTNVd8us_Jipo_123C1AEVFohWHhE=" alt="" />
            <div className='text-center py-2 h3 '>Traditional Martial Arts</div>
            <div className='text-center h5 py-2 '>Karate can be practiced as an art, self defense or as a combat sport. Traditional karate places emphasis on self-development.</div>
          </div>
        </div>
      </div>
      <div className='mt-36'>
        <MultiCarousel />

      </div>







    </div>
  );
}

export default Home;
