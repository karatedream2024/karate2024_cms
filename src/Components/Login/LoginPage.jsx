import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckUserMutation } from '../../features/api/loginapi';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { authdata } from '../../features/slice/login';

function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "", 
    password: ""
  });
  
  const dispatch = useDispatch();
  
  const [checkUser, { isLoading, isError, error }] = useCheckUserMutation();

  const handleSubmit = async () => {
    if (!user.email || !user.password) {
      toast.error('Please fill in all fields');
      return;
    }try {
      const res = await checkUser(user).unwrap();
      console.log(res?.data[0].email, 'LKG');
    
      const userlogindata = {
        email: res?.data[0]?.email,
        password: res?.data[0]?.password,
        token: res?.token
      };
      
      console.log(userlogindata, 'userlogin');
      
      // Convert userlogindata to JSON string and store it in localStorage
      localStorage.setItem('userlogindata', JSON.stringify(userlogindata));
      
   
      
      toast.success('Login successful');
      dispatch(authdata(userlogindata?.token));
      
      setTimeout(() => {
        
      navigate('/cms');
      }, 2000);
    } catch (error) {
      toast.error('Login failed');
      console.error(error);
    }
  };

  return (
    <div>
      <img
        className='h-screen w-screen bg-cover bg-no-repeat'
        src="https://images.pexels.com/photos/960137/pexels-photo-960137.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="Background"
      />
      <div className='absolute top-0 mx-auto w-full'>
        <div className='flex justify-center items-center h-screen'>
          <div className="w-[400px] h-[400px] backdrop:blur-2xl shadow-2xl p-10 border border-line rounded-xl shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-line py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium h4 text-logo_white">
                Sign In Form
              </h3>
            </div>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block h5 text-logo_white">
                  Username
                </label>
                <input
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  type="text"
                  placeholder="Enter your email address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent bg-white/10 text-white py-3 px-5 text-black outline-none transition focus:border-blue active:border-blue"
                />
              </div>

              <div>
                <label className="mb-2.5 block h5 text-logo_white">
                  Password
                </label>
                <input
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  type="password"
                  placeholder="Enter password"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent bg-white/10 text-white py-3 px-5 text-black outline-none transition focus:border-blue active:border-blue"
                />
              </div>

              <div className="mt-5 mb-5.5 flex items-center justify-between">
                <label htmlFor="formCheckbox" className="flex cursor-pointer">
                  <div className="relative pt-0.5">
                    <input
                      type="checkbox"
                      id="formCheckbox"
                      className="taskCheckbox sr-only"
                    />
                  </div>
                </label>
              </div>

              <button
                onClick={handleSubmit}
                className="flex w-full justify-center rounded h3 text-white bg-blue p-3 font-medium text-gray hover:bg-opacity-90"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
