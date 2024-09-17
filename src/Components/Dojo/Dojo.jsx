import React, { useState, useEffect, useRef } from 'react';
import { useAddDojoMutation, useDeleteDojoMutation, useGetAllDojoQuery, useUpdateDojoMutation } from '../../features/api/userlogin';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { FaEye } from "react-icons/fa";

import { FaCloudUploadAlt } from "react-icons/fa";

import { RiDeleteBin5Fill } from "react-icons/ri";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Dojo() {


  const { data: dojoData, error, isLoading } = useGetAllDojoQuery();

  console.log(dojoData, 'walking dojo')
  const [addDojoapi] = useAddDojoMutation();
  const [updateDojoapi] = useUpdateDojoMutation();
  const [deleteDojoapi] = useDeleteDojoMutation();
  const [getAddItemModel, setAddItemModel] = useState(false);
  const [dojovalue, setdojovalue] = useState({
    dojoName: '',
    location_link: '',
    imageurl: '',
    incharge: '',
    aboutdojo: ''
  });

  const [addUpdate, setaddUpdate] = useState()
  const openUpdateModal = (dojo) => {
    setaddUpdate(dojo)
    setAddItemModel(true)
    setdojovalue({
      dojoName: dojo.dojoName,
      location_link: dojo.location_link,
      imageurl: dojo.imageurl,
      incharge: dojo.incharge,
      aboutdojo: dojo.aboutdojo
    }
    )
  };
  function addDojo() {
    if (!addUpdate) {
      addDojoapi(dojovalue)
        .then(res => {
          console.log(res.data)
          setAddItemModel(false)
          toast.success('Dojo added successfully', {
            autoClose: 2000
          })
        }
        )
        .catch(err => console.log(err))
    }
    else {
      updateDojoapi({ id: addUpdate._id, values: dojovalue })
        .then(res => {
          console.log(res.data)
          setAddItemModel(false)
          toast.success('Dojo updated successfully', {
            autoClose: 2000
          })
        })
        .catch(err => console.log(err))
    }
  }
  const deleteDojo = (id) => {

    confirmAlert({

      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteDojoapi({ id: id })
              .then(res => {
                toast.warning('Dojo deleted successfully', {
                  autoClose: 2000
                })
              })
              .catch(err => console.log(err))
          }
        },
        {
          label: 'No',
          // onClick: () => alert('Click No')
        }
      ]
    });

    console.log(id, 'delete dojo')

  }

  const closeAllModel = () => {
    setAddItemModel(false);
  };

  const openAddMarksModal = (dojo) => {
    // Implementation for adding marks
    console.log('Add marks for dojo:', dojo);
  };

  const [showview, setShowView] = useState(false); // State to show/hide the modal
  const modalRef = useRef();

  // Function to toggle the modal
  const toggleModal = () => {
    setShowView((prev) => !prev);
  };

  // Add click event listener to detect clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowView(false);
        setAddItemModel(false);
        // Close modal if clicked outside
      }
    };

    if (showview) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showview]);


  return (
    <div className="container mx-auto p-4 relative">
      <div className='flex justify-between '>

      <h1 className="text-3xl font-bold mb-4">Dojo Details</h1>

      {/* Add dojo Button */}
      <div className="mb-4 pr-[5%]">
        <button
           onClick={() => {
            setAddItemModel(true),
              setaddUpdate(null)
            setdojovalue(
              {
                dojoName: "",
                location_link: "",
                imageurl: "",
                incharge: "",
                aboutdojo: ""
              }
            )
          }
          }
        
        class="bg-transparent hover:bg-logo_yellow text-blue-700 font-semibold hover:text-white py-2 px-4 border border-logo_yellow text-logo_yellow hover:border-transparent rounded">
  Add Dojo
</button>
      </div>

      </div>

      {/* view dojo Model */}
      <div ref={modalRef} className={`${showview ? "absolute bg-white min-w-[95%] p-5 shadow-2xl backdrop-blur-3xl" : "hidden"}`}>
        <div className="h3 text-logo_yellow underline">Dojo Details</div>
        <div className="md:flex w-[100%] mx-auto">
          <div className="w-[100%] md:w-[50%]">
            <div className="text-logo_green h4">Image</div>
            <div className="flex justify-center">
              <img
                className="h-[300px] w-[300px] rounded-full bg-logo_red"
                src="https://images.pexels.com/photos/11785594/pexels-photo-11785594.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Dojo"
              />
            </div>
          </div>
          <div>
            <div>
              <div className="text-logo_green h3">Dojo Name</div>
              <div className="h5">Edappadi Dojo</div>
            </div>

            <div>
              <div className="text-logo_green h3 mt-2">Incharge</div>
              <div className="h5">Rangith</div>
            </div>

            <div>
              <div className="text-logo_green h3 mt-2">Map Link Address</div>
              <div className="">Edappadi Dojo</div>
            </div>

            <div>
              <div className="text-logo_green h3 mt-2">About Dojo</div>
              <div className="h5">This is where I want to celebrate in this dojo.</div>
            </div>
          </div>
        </div>
      </div>



      {/* dojo Table */}
      <table className="min-w-full bg-white border border-light-blue rounded-xl shadow-md mt-10">
        <thead>
          <tr className="bg-gray-100 border-b border-light-blue h-16">
            <th className="px-4 py-2">Dojo Name</th>
            <th className="px-4 py-2">Incharge</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dojoData?.map(dojo => (
            <tr key={dojo._id} className="border-b border-light-blue h-14">
              <td className="px-4 py-2 text-center">{dojo.dojoName} </td>
              <td className="px-4 py-2 text-center">{dojo.incharge} </td>
              <td className="px-4 py-2 flex justify-center items-center  gap-5">
                <button
                  onClick={() => openUpdateModal(dojo)}
                >
                  <FaCloudUploadAlt className='h-6 w-6 mt-2' />
                </button>


                <button
                  onClick={() => deleteDojo(dojo._id)}
                >
                  <RiDeleteBin5Fill className='h-6 w-6  mt-2' />
                </button>


                <button
                  onClick={toggleModal}
                >
                  <FaEye className='h-6 w-6  mt-2' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add dojo Modal */}
      {getAddItemModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Add New dojo</h2>

            <div className="mb-4">
              <TextField
                value={dojovalue.dojoName}
                onChange={(e) => (setdojovalue({ ...dojovalue, dojoName: e.target.value }))}
                id="outlined-basic"
                label="Dojo Name"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="mb-4">
              <TextField
                value={dojovalue.incharge}
                onChange={(e) => (setdojovalue({ ...dojovalue, incharge: e.target.value }))}
                id="outlined-basic"
                label="Incharge Name"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="mb-4">
              <TextField
                value={dojovalue.imageurl}
                onChange={(e) => (setdojovalue({ ...dojovalue, imageurl: e.target.value }))}
                id="outlined-basic"
                label="Image"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="mb-4">
              <TextField
                value={dojovalue.location_link}
                onChange={(e) => (setdojovalue({ ...dojovalue, location_link: e.target.value }))}
                id="outlined-basic"
                label="Location_link"
                variant="outlined"
                fullWidth
              />

            </div>
            <div className="mb-4">
              <TextField
                value={dojovalue.aboutdojo}
                onChange={(e) => (setdojovalue({ ...dojovalue, aboutdojo: e.target.value }))}
                id="outlined-basic"
                label="About Dojo"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-500 text-blue border border-blue px-4 py-2 rounded hover:bg-gray-600 mr-2"
                onClick={closeAllModel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => addDojo()}
              >
                Add
              </button>
            </div>

          </div>
        </div>
      )}




      <ToastContainer />
    </div>
  );
}

export default Dojo;
