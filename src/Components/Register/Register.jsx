import React, { useState, useEffect, useRef } from 'react';
import { FaEye } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDeleteRegistrationMutation, useGetAllRegistrationsQuery } from '../../features/api/register';
// import { useDeleteRegistrationMutation, useGetAllRegistrationsQuery } from '../../features/api/registrationapi';

function Register() {
  const { data: registrationData, error, isLoading } = useGetAllRegistrationsQuery();
  const [deleteRegistration] = useDeleteRegistrationMutation();
  const [showView, setShowView] = useState(false); // State to show/hide the modal
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const modalRef = useRef();

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure you want to delete this registration?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteRegistration(id)
              .then(() => {
                toast.warning('Registration deleted successfully', {
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
  };

  const handleView = (registration) => {
    setSelectedRegistration(registration);
    setShowView(true);
  };

  const closeModal = () => {
    setShowView(false);
    setSelectedRegistration(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowView(false);
      }
    };

    if (showView) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showView]);

  return (
    <div className="container mx-auto p-4 relative">
      <div className='flex justify-between'>
        <h1 className="text-3xl font-bold mb-4">Registrations</h1>
      </div>

      {/* View Registration Modal */}
      <div ref={modalRef} className={`${showView ? "absolute bg-white min-w-[95%] p-5 shadow-2xl backdrop-blur-3xl" : "hidden"}`}>
        <div className="h3 text-logo_yellow underline">Registration Details</div>
        <div className="md:flex w-[100%] mx-auto">
          <div className="w-[100%] md:w-[50%]">
            <div className="text-logo_green h4">Name</div>
            <div className="h5">{selectedRegistration?.fullName}</div>
            <div className="text-logo_green h4 mt-2">Phone</div>
            <div className="h5">{selectedRegistration?.phone}</div>
            <div className="text-logo_green h4 mt-2">Date of Birth</div>
            <div className="h5">{new Date(selectedRegistration?.dob).toLocaleDateString()}</div>
            <div className="text-logo_green h4 mt-2">Gender</div>
            <div className="h5">{selectedRegistration?.gender}</div>
            <div className="text-logo_green h4 mt-2">Address</div>
            <div className="h5">{selectedRegistration?.Address}</div>
            <div className="text-logo_green h4 mt-2">Academy Name</div>
            <div className="h5">{selectedRegistration?.academyName}</div>
            <div className="text-logo_green h4 mt-2">Belt Rank</div>
            <div className="h5">{selectedRegistration?.beltRank}</div>
          </div>
        </div>
        <button onClick={closeModal} className="mt-4 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded">
          Close
        </button>
      </div>

      {/* Registrations Table */}
      <table className="min-w-full bg-white border border-light-blue rounded-xl shadow-md mt-10">
        <thead>
          <tr className="bg-gray-100 border-b border-light-blue h-16">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {registrationData?.map(registration => (
            <tr key={registration._id} className="border-b border-light-blue h-14">
              <td className="px-4 py-2 text-center">{registration.fullName}</td>
              <td className="px-4 py-2 text-center">{registration.phone}</td>
              <td className="px-4 py-2 flex justify-center items-center gap-5">
                <button onClick={() => handleView(registration)}>
                  <FaEye className='h-6 w-6 mt-2' />
                </button>
                <button onClick={() => handleDelete(registration._id)}>
                  <RiDeleteBin5Fill className='h-6 w-6 mt-2' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
}

export default Register;
