import React, { useEffect, useState } from 'react'
import logo from '../../assets/karatelogo.png'
// import StudentDetails from '../Student/StudentDetails'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authdata } from '../../features/slice/login'


function Navbar({getlogin}) {


  const locate = useLocation()

  const dispatch = useDispatch()


  const [nav, setnav] = useState(locate.pathname)

  const [toggle, setToggle] = useState(false)

  const navigate = useNavigate()





  const navbarchange = (value) => {
    console.log(value, 'this is value')
    setnav(locate)
    setnav(value)
  }

  const navToggle = () => {


    setToggle(!toggle)

  }


  function localstorageclear() {
    localStorage.removeItem('login')
  getlogin('d')
    navigate('/cms')



  }

  function logout(){

    localStorage.removeItem('userlogindata')
    navigate('/cms')
    dispatch(authdata('range'));

  }


  return (

    <div className='h-screen w-screen flex flex-row bg-cmsbackground '>




      {/* mobile navbar */}
      <div className='absolute lg:hidden'>
        <div className='bg-background flex items-center justify-between px-10 w-[100vw]'>
          <div>
            <img className='h-16 w-16' src={logo} alt="" />
          </div>
          <div onClick={() => navToggle(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.17em" height="1em" viewBox="0 0 28 24"><path fill="currentColor" d="M2.61 0h22.431a2.61 2.61 0 1 1 0 5.22H2.61a2.61 2.61 0 1 1 0-5.22m0 9.39h22.431a2.61 2.61 0 1 1 0 5.22H2.61a2.61 2.61 0 1 1 0-5.22m0 9.391h22.431a2.61 2.61 0 1 1 0 5.22H2.61a2.61 2.61 0 1 1 0-5.22" /></svg>
          </div>
        </div>
      </div>


      <div className='lg:hidden absolute'>

        <div className={`${toggle ? 'w-[80%] sm:w-[50%] duration-700' : 'w-0'} bg-white h-[100vh] fixed right-0 z-40 `}>
          <div className='flex justify-between px-5 items-center'>
            <div className='absolute top-0 right-0 '>
              <img className='h-10 w-10' src={logo} alt="" />
            </div>
            <div onClick={() => navToggle()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="m12 14.122l5.303 5.303a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879L6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.304a1.5 1.5 0 1 0 2.122 2.12z" /></g></svg>
            </div>


          </div>
          <div>
            <div className={`${toggle ? '' : 'hidden'} relative w-[80%] mx-auto mt-2 mb-5 `} >
              <input type="text" className="outline-none border-none bg-background  h-12  w-[100%]   px-3 rounded-lg " />
              <div className="absolute top-0 right-3 hover:text-blue-400   flex items-center justify-center h-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M8.195 0c4.527 0 8.196 3.62 8.196 8.084a7.989 7.989 0 0 1-1.977 5.267l5.388 5.473a.686.686 0 0 1-.015.98a.71.71 0 0 1-.993-.014l-5.383-5.47a8.23 8.23 0 0 1-5.216 1.849C3.67 16.169 0 12.549 0 8.084C0 3.62 3.67 0 8.195 0m0 1.386c-3.75 0-6.79 2.999-6.79 6.698c0 3.7 3.04 6.699 6.79 6.699s6.791-3 6.791-6.699c0-3.7-3.04-6.698-6.79-6.698" /></svg>
              </div>

            </div>
          </div>
          <Link to='/cms'>
            <div onClick={() => navbarchange('/cms')} className={`${nav === '/cms' ? 'border-l-4 rounded-full text-blue' : ''} `}>
              <hr className='text-line' />

              <div className={` ${nav === '/cms' ? 'text-blue' : ''} my-3 pl-10 h5s`} >
                Dashboard
              </div>
              <hr className='text-line' />
            </div>
          </Link>
          <Link to='/cms/attendence'>
            <div onClick={() => navbarchange('/cms/attendence')} className={`${nav === '/cms/attendence' ? 'border-l-4 rounded-full text-blue' : ''} `}>
              <hr className='text-line' />

              <div className={` ${nav === '/cms/attendence' ? 'text-blue' : ''} my-3 pl-10 h5`} >
              Add  Attendence
              </div>
              <hr className='text-line' />
            </div>
          </Link>
          <Link to='/cms/showatten'>
            <div onClick={() => navbarchange('/cms/showatten')} className={`${nav === '/cms/showatten' ? 'border-l-4 rounded-full text-blue' : ''} `}>
              <hr className='text-line' />

              <div className={` ${nav === '/cms/showatten' ? 'text-blue' : ''} my-3 pl-10 h5`} >
                Attendence
              </div>
              <hr className='text-line' />
            </div>
          </Link>
          <Link to='/cms/event'>
            <div onClick={() => navbarchange('/cms/event')} className={`${nav === '/cms/event' ? 'border-l-4 rounded-full text-blue' : ''} `}>
              <hr className='text-line' />

              <div className={` ${nav === '/cms/event' ? 'text-blue' : ''} my-3 pl-10 h5`} >
                Event
              </div>
              <hr className='text-line' />
            </div>
          </Link>
          <Link to='/cms/dojo'>
            <div onClick={() => navbarchange('/cms/dojo')} className={`${nav === '/cms/dojo' ? 'border-l-4 rounded-full text-blue' : ''} `}>
              <hr className='text-line' />

              <div className={` ${nav === '/cms/dojo' ? 'text-blue' : ''} my-3 pl-10 h5`} >
                dojo
              </div>
              <hr className='text-line' />
            </div>
          </Link>
          <Link to='/cms/blog'>
            <div onClick={() => navbarchange('/cms/blog')} className={`${nav === '/cms/blog' ? 'border-l-4 rounded-full text-blue' : ''} `}>
              <hr className='text-line' />

              <div className={` ${nav === '/cms/blog' ? 'text-blue' : ''} my-3 pl-10 h5`} >
                Blog
              </div>
              <hr className='text-line' />
            </div>
          </Link>
          <Link to='/cms/register'>
            <div onClick={() => navbarchange('/cms/register')} className={`${nav === '/cms/register' ? 'border-l-4 rounded-full text-blue' : ''} `}>
              <hr className='text-line' />

              <div className={` ${nav === '/cms/register' ? 'text-blue' : ''} my-3 pl-10 h5`} >
              Register
              </div>
              <hr className='text-line' />
            </div>
          </Link>
          <Link to='/cms/contact'>
            <div onClick={() => navbarchange('/cms/contact')} className={`${nav === '/cms/contact' ? 'border-l-4 rounded-full text-blue' : ''} `}>
              <hr className='text-line' />

              <div className={` ${nav === '/cms/contact' ? 'text-blue' : ''} my-3 pl-10 h5`} >
              Contact
              </div>
              <hr className='text-line' />
            </div>
          </Link>
          <Link to='/cms/tournment'>
            <div onClick={() => navbarchange('/cms/tournment')} className={`${nav === '/cms/tournment' ? 'border-l-4 rounded-full text-blue' : ''} `}>
              <hr className='text-line' />

              <div className={` ${nav === '/cms/tournment' ? 'text-blue' : ''} my-3 pl-10 h5`} >
              Tournment
              </div>
              <hr className='text-line' />
            </div>
          </Link>
          <Link to='/cms/user'>
            <div onClick={() => navbarchange('/cms/user')} className={`${nav === '/cms/user' ? 'border-l-4 rounded-full text-blue' : ''} `}>
              <hr className='text-line' />

              <div className={` ${nav === '/cms/user' ? 'text-blue' : ''} my-3 pl-10 h5`} >
              User
              </div>
              <hr className='text-line' />
            </div>
          </Link>




        </div>
      </div>



      {/* desktop navbar */}
      <div className='w-[300px] h-[95%] overflow-hidden shadow-xl hidden lg:block m-5 bg-white rounded-2xl z-10  fixed '>
        <div className='flex justify-around mt-5 items-center h3 text-center text-[#52525b]'>
          <div>
          TNKKK
          </div>
          <div>
          <img className='w-24' src={logo} alt="" />
          </div>
        </div>
     
        <div className=''>

          

        <Link to='/cms'>
            <div onClick={() => navbarchange('/cms')} className={`${nav === '/cms' ? '' : ''} `}>


            <div className={` ${nav === '/cms' ? 'text-white bg-blue  ' : 'hover:text-logo_blue hover:bg-blue/20 duration-300'} h5 mx-[10%] py-2 rounded-lg mt-2 pl-[10%] flex text-letter-black  `} >
              Dashboard
              </div>

            </div>
          </Link>
 

      
          <Link to='/cms/attendence'>
            <div onClick={() => navbarchange('/cms/attendence')} className={`${nav === '/cms/attendence' ? '' : ''} `}>


            <div className={` ${nav === '/cms/attendence' ? 'text-white bg-blue  ' : 'hover:text-logo_blue hover:bg-blue/20 duration-300'} h5 mx-[10%] py-2 rounded-lg mt-2 pl-[10%] flex text-letter-black  `} >
              Attendence
              </div>

            </div>
          </Link>
          <Link to='/cms/showatten'>
            <div onClick={() => navbarchange('/cms/showatten')} className={`${nav === '/cms/showatten' ? '' : ''} `}>


            <div className={` ${nav === '/cms/showatten' ? 'text-white bg-blue  ' : 'hover:text-logo_blue hover:bg-blue/20 duration-300'} h5 mx-[10%] py-2 rounded-lg mt-2 pl-[10%] flex text-letter-black  `} >
             Show Attendence
              </div>

            </div>
          </Link>


          <Link to='/cms/event'>
            <div onClick={() => navbarchange('/cms/event')} className={`${nav === '/cms/event' ? '' : ''} `}>


            <div className={` ${nav === '/cms/event' ? 'text-white bg-blue  ' : 'hover:text-logo_blue hover:bg-blue/20 duration-300'} h5 mx-[10%] py-2 rounded-lg mt-2 pl-[10%] flex text-letter-black  `} >
            Event
              </div>

            </div>
          </Link>

          <Link to='/cms/blog'>
            <div onClick={() => navbarchange('/cms/blog')} className={`${nav === '/cms/blog' ? '' : ''} `}>


            <div className={` ${nav === '/cms/blog' ? 'text-white bg-blue  ' : 'hover:text-logo_blue hover:bg-blue/20 duration-300'} h5 mx-[10%] py-2 rounded-lg mt-2 pl-[10%] flex text-letter-black  `} >
            Blog
              </div>

            </div>
          </Link>
          <Link to='/cms/dojo'>
            <div onClick={() => navbarchange('/cms/dojo')} className={`${nav === '/cms/dojo' ? '' : ''} `}>


            <div className={` ${nav === '/cms/dojo' ? 'text-white bg-blue  ' : 'hover:text-logo_blue hover:bg-blue/20 duration-300'} h5 mx-[10%] py-2 rounded-lg mt-2 pl-[10%] flex text-letter-black  `} >
            Dojo
              </div>

            </div>
          </Link>
          <Link to='/cms/register'>
            <div onClick={() => navbarchange('/cms/register')} className={`${nav === '/cms/register' ? '' : ''} `}>


            <div className={` ${nav === '/cms/register' ? 'text-white bg-blue  ' : 'hover:text-logo_blue hover:bg-blue/20 duration-300'} h5 mx-[10%] py-2 rounded-lg mt-2 pl-[10%] flex text-letter-black  `} >
            Registration
              </div>

            </div>
          </Link>
          <Link to='/cms/contact'>
            <div onClick={() => navbarchange('/cms/contact')} className={`${nav === '/cms/contact' ? '' : ''} `}>


            <div className={` ${nav === '/cms/contact' ? 'text-white bg-blue  ' : 'hover:text-logo_blue hover:bg-blue/20 duration-300'} h5 mx-[10%] py-2 rounded-lg mt-2 pl-[10%] flex text-letter-black  `} >
            Contact
              </div>

            </div>
          </Link>
          <Link to='/cms/tournment'>
            <div onClick={() => navbarchange('/cms/tournment')} className={`${nav === '/cms/tournment' ? '' : ''} `}>


            <div className={` ${nav === '/cms/tournment' ? 'text-white bg-blue  ' : 'hover:text-logo_blue hover:bg-blue/20 duration-300'} h5 mx-[10%] py-2 rounded-lg mt-2 pl-[10%] flex text-letter-black  `} >
            Tournament
              </div>

            </div>
          </Link>
          <Link to='/cms/user'>
            <div onClick={() => navbarchange('/cms/user')} className={`${nav === '/cms/user' ? '' : ''} `}>


            <div className={` ${nav === '/cms/user' ? 'text-white bg-blue  ' : 'hover:text-logo_blue hover:bg-blue/20 duration-300'} h5 mx-[10%] py-2 rounded-lg mt-2 pl-[10%] flex text-letter-black  `} >
            Permission
              </div>

            </div>
          </Link>


          {/* <Link to='/cms/cmsupcomingevent'>
            <div onClick={() => navbarchange('/cms/cmsupcomingevent')} className={`${nav === '/cms/cmsupcomingevent' ? '' : ''} `}>
              <div className={` ${nav === '/cms/cmsupcomingevent' ? 'text-white bg-blue  ' : ''} h5 mx-[10%] py-2 rounded-lg mt-2 pl-[10%] flex text-letter-black  `} >
              Upcoming
              </div>
            </div>
          </Link> */}
          <div className={` `}>
            <div onClick={()=>logout()} className={` text-white text-center  bg-black   h6 mx-[10%] py-2 rounded-lg mt-2  flex justify-center text-letter-black  `} >
              Log Out 
            </div>
          </div>
        </div> 
      </div>
      <div className='w-[100%] mx-auto lg:pl-[340px]  overflow-x-hidden mt-14 lg:mt-6 '>




        <Outlet />


      </div>
    </div>
  )
}

export default Navbar