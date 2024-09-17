import React, { useState, useEffect, useRef } from 'react';
import { FaEye } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDeleteContactMutation, useGetAllContactsQuery } from '../../features/api/contactapi';

function Contact() {
  const { data: contactData, error, isLoading } = useGetAllContactsQuery();
  console.log(contactData, 'woking well')
  const [deleteContact] = useDeleteContactMutation();
  const [showView, setShowView] = useState(false); // State to show/hide the modal
  const [selectedContact, setSelectedContact] = useState(null);
  const modalRef = useRef();

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteContact(id)
              .then(res => {
                toast.warning('Contact deleted successfully', {
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

  const toggleModal = (contact) => {
    setSelectedContact(contact);
    setShowView(prev => !prev);
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
      <h1 className="text-3xl font-bold mb-4">Contact Details</h1>

      {/* View Contact Modal */}
      <div ref={modalRef} className={`${showView ? "absolute bg-white min-w-[95%] p-5 shadow-2xl backdrop-blur-3xl" : "hidden"}`}>
        <div className="h3 text-logo_yellow underline">Contact Details</div>
        <div className="">
          <div>
            <div className="text-logo_green h3">Name</div>
            <div className="h5">{selectedContact?.name}</div>
          </div>
          <div>
            <div className="text-logo_green h3 mt-2">Email</div>
            <div className="h5">{selectedContact?.email}</div>
          </div>
          <div>
            <div className="text-logo_green h3 mt-2">Message</div>
            <div className="h5">{selectedContact?.message}</div>
          </div>
          <div>
            <div className="text-logo_green h3 mt-2">Phone Number</div>
            <div className="h5">{selectedContact?.phone}</div>
          </div>
          {/* Add more fields as needed */}
        </div>
      </div>

      {/* Contact Table */}
      <table className="min-w-full bg-white border border-light-blue rounded-xl shadow-md mt-10">
        <thead>
          <tr className="bg-gray-100 border-b border-light-blue h-16">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactData?.map(contact => (
            <tr key={contact.id} className="border-b border-light-blue h-14">
              <td className="px-4 py-2 text-center">{contact.name}</td>
              <td className="px-4 py-2 text-center">{contact.email}</td>
              <td className="px-4 py-2 flex justify-center items-center gap-5">
                <button onClick={() => toggleModal(contact)}>
                  <FaEye className='h-6 w-6 mt-2' />
                </button>
                <button onClick={() => handleDelete(contact.id)}>
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

export default Contact;
