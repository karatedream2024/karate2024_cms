import React, { Suspense, useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Register from './Components/Register/Register';
import Tournament from './Components/Tournment/Tournment';
import User from './Components/User/User';

// Lazy loaded components
const Navbar = React.lazy(() => import('./Components/Navbar/Navbar'));
const Home = React.lazy(() => import('./Components/Home/Home'));
const Blog = React.lazy(() => import('./Components/Blog/Blog'));
const Dojo = React.lazy(() => import('./Components/Dojo/Dojo'));
const Event = React.lazy(() => import('./Components/Event/Event'));
const Contact = React.lazy(() => import('./Components/Contact/Contact'));
const Attendence = React.lazy(() => import('./Components/Attendence/Attendence'));
const AddStudent = React.lazy(() => import('./Components/AddStudent/AddStudent'));
const Student = React.lazy(() => import('./Components/student/Student'));
const Showatten = React.lazy(() => import('./Components/ShowAttendance/Showatten'));
const LoginPage = React.lazy(() => import('./Components/Login/LoginPage'));

function App() {
  const authData = useSelector((state) => state.auth.authdata);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  const userLoginData = JSON.parse(localStorage.getItem('userlogindata'));

  console.log(userLoginData, 'linking')

  useEffect(() => {
    // Check login status from localStorage or any other source
    const userLoginData = JSON.parse(localStorage.getItem('userlogindata'));
    if (userLoginData && userLoginData.token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userLoginData]);



  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {isLoggedIn ? (
            <Route path="/cms" element={<Navbar />}>
              <Route index element={<Student />} />
              <Route path="/cms/event" element={<Event />} />
              <Route path="/cms/dojo" element={<Dojo />} />
              <Route path="/cms/blog" element={<Blog />} />
              <Route path="/cms/attendence" element={<Attendence />} />
              <Route path="/cms/addstudent" element={<AddStudent />} />
              <Route path="/cms/addstudent/:id" element={<AddStudent />} />
              <Route path="/cms/showatten" element={<Showatten />} />
              <Route path="/cms/register" element={<Register />} />
              <Route path="/cms/contact" element={<Contact />} />
              <Route path="/cms/tournment" element={<Tournament />} />
              <Route path="/cms/user" element={<User />} />
            </Route>
          ) : (
            <Route path="/cms" element={<LoginPage />} />
          )}
        </Routes> 
      </Suspense> 
    </BrowserRouter>
  );
}

export default App;
