// import requests from '../Requests'
// import axios from '../axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { TextField, InputLabel, MenuItem, FormControl, Select, Button, Box } from '@mui/material';
import Radio from '@mui/material/Radio';
import { useGetAllStudentQuery } from '../../features/api/studentapi';
import { useAddUpdateAttenMutation } from '../../features/api/attendenceapi';

import { confirmAlert } from 'react-confirm-alert';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DojoName } from '../../Restapi/DojoName';

function Attendence() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [dojoData, setDojodata] = useState('Edappadi')
  const [search, setSearch] = useState('')

  const { data: studentData, error, isLoading } = useGetAllStudentQuery({ dojodata: dojoData, search });
  const [postattenapi] = useAddUpdateAttenMutation();


  const [atten, setatten] = useState([])

  console.log(atten, 'ranged')

  console.log(new Date(), 'this is date');
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // Months are zero-based
  const year = today.getFullYear();

  console.log(day, 'lake')

  const formattedDate = `${year}-${month}-${day}`; // Example format: MM/DD/YYYY
  console.log(formattedDate, 'this is date');

  function attendencemark(value, value2) {

    const obj = {
      studentId: value2,
      date: formattedDate,
      status: value,
      userId: "66e29193fd7f524fb187a01c"
    }

    if (atten.length > 0) {
      const index = atten.find((v) => v.studentId === value2)
      console.log(index, 'this is index')

      if (index) {
        const findindex = atten.findIndex((v) => v.studentId === value2)
        atten.splice(findindex, 1, obj)
        setatten([...atten])

      }
      else {
        setatten([...atten, obj])
      }

    }
    else {
      setatten([...atten, obj])
    }
  }


  // console.log(studentData, 'this is student data')
  function addupdateatten() {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            console.log("ranged worked here")
            postattenapi(atten)
              .then(res => {
                toast.warning('Attendence Updated successfully', {
                  autoClose: 2000
                });
              })
              .catch(err => console.log(err));
          }
        },
        {
          label: 'No'
        }
      ]
    });

  }


  const [selectedValue, setSelectedValue] = useState('option1-value1');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };




  return (
    <div className="container mx-auto p-4 relative">
      <div className='flex justify-between'>
        <h1 className="text-3xl font-bold mb-4">Student Attendence</h1>
        {/* Add blog Button */}
        <div className="mb-4 pr-[5%]">

        </div>
      </div>

      <div className='bg-white p-5'>
        <div className='bg-white flex justify-between'>
          <div className='w-96'>
            <FormControl fullWidth>
              <InputLabel id="gender-label">Dojo Name</InputLabel>
              <Select
                labelId="gender-label"
                name="Dojo Name"
                onChange={(e) => setDojodata(e.target.value)}
                value={dojoData}
                label="Dojo Name"
              >
                {DojoName.map((name) => (
                  <MenuItem value={name}>{name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

        </div>

      </div>

      {/* Blog Table */}
      <table className="min-w-full bg-white border border-light-blue rounded-xl shadow-md mt-10">
        <thead>
          <tr className="bg-gray-100 border-b border-light-blue h-16">
            <th className=" py-2">Name</th>
            {/* <th className="px-4 py-2 hidden md:block">fatherName</th> */}
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            studentData?.data?.map((v, i) => (

              <tr key={i} className="border-b border-light-blue h-14">
                <td className="px-4 py-2 text-center">{v.name}</td>
                {/* <td className="px-4 py-2 text-center hidden md:block">{v.fatherName}</td> */}
                <td className="px-4 py-2  flex flex-col md:flex-row justify-center items-center  w-[100%] gap-5 ">
                  <button className='flex  items-center justify-center h-[100%]'>
                    <input className='h-5 w-5' onClick={(e) => attendencemark(e.target.value, v._id)} value={"present"} type="radio" id={v._id} name={v._id} /> <span className='px-2'>Present</span>


                  </button>
                  <button className='flex items-center justify-center h-[100%]' >

                    <input className='h-5 w-5' onClick={(e) => attendencemark(e.target.value, v._id)} value={"late"} type="radio" id={v._id} name={v._id} /> <span className='px-2'>late</span>

                  </button>

                  <button className='flex items-center justify-center h-[100%]'>
                    <input className='h-5 w-5' onClick={(e) => attendencemark(e.target.value, v._id)} value={"absent"} type="radio" id={v._id} name={v._id} /> <span className='px-2'>absent</span>

                  </button>
                </td>
              </tr>

            ))
          }


        </tbody>


      </table>


      <div className='flex justify-end items-end mt-10'>
        <Button onClick={() => addupdateatten()} type="submit" variant="contained" className='' color="primary">
          submitAttendence
        </Button>
      </div>


      <ToastContainer />

    </div>
  )
}

export default Attendence 