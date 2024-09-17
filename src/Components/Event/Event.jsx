import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { FaEye } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddEventMutation, useDeleteEventMutation, useGetAllEventQuery, useUpdateEventMutation } from '../../features/api/eventapi';

function Event() {
  const { data: eventData, error, isLoading } = useGetAllEventQuery();
  const [addeventapi] = useAddEventMutation();
  const [updateeventapi] = useUpdateEventMutation();
  const [deleteeventapi] = useDeleteEventMutation();
  const [getAddItemModel, setAddItemModel] = useState(false);
  const [eventvalue, seteventvalue] = useState({
    title: '',
    startdate: '',
    enddate: '',
    imageUrl: '',
    leader: '',
    description: '',
    prizes: {
      first_winner: '',
      second_winner: '',
      third_winner: ''
    },
    quote: '',
    downloadLinkText: ''
  });
  const [addUpdate, setaddUpdate] = useState();
  const openUpdateModal = (event) => {
    setaddUpdate(event);
    setAddItemModel(true);
    seteventvalue({
      title: event.title,
      startdate: event.startdate,
      enddate: event.enddate,
      imageUrl: event.imageUrl,
      leader: event.leader,
      description: event.description,
      prizes: event.prizes,
      quote: event.quote,
      downloadLinkText: event.downloadLinkText
    });
  };

  function addevent() {
    if (!addUpdate) {
      addeventapi(eventvalue)
        .then(res => {
          console.log(res.data);
          setAddItemModel(false);
          toast.success('Event added successfully', {
            autoClose: 2000
          });
        })
        .catch(err => console.log(err));
    } else {
      updateeventapi({ id: addUpdate._id, values: eventvalue })
        .then(res => {
          console.log(res.data);
          setAddItemModel(false);
          toast.success('Event updated successfully', {
            autoClose: 2000
          });
        })
        .catch(err => console.log(err));
    }
  }

  const deleteevent = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteeventapi({ id: id })
              .then(res => {
                toast.warning('Event deleted successfully', {
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

  const closeAllModel = () => {
    setAddItemModel(false);
  };

  const [showview, setShowView] = useState(false); // State to show/hide the modal
  const modalRef = useRef();

  // Function to toggle the modal
  const toggleModal = () => {
    setShowView(prev => !prev);
  };

  // Add click event listener to detect clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowView(false);
        setAddItemModel(false);
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

      <div className='flex justify-between'>
        <h1 className="text-3xl font-bold mb-4">Event Details</h1>
        {/* Add event Button */}
        <div className="mb-4 pr-[5%]">
          <button
            onClick={() => {
              setAddItemModel(true);
              setaddUpdate(null);
              seteventvalue({
                title: "",
                startdate: "",
                enddate: "",
                imageUrl: "",
                leader: "",
                description: "",
                prizes: {
                  first_winner: "",
                  second_winner: "",
                  third_winner: ""
                },
                quote: "",
                downloadLinkText: ""
              });
            }}
            className="bg-transparent hover:bg-logo_yellow text-blue-700 font-semibold hover:text-white py-2 px-4 border border-logo_yellow text-logo_yellow hover:border-transparent rounded"
          >
            Add Event
          </button>
        </div>
      </div>

      {/* View event Modal */}
      <div ref={modalRef} className={`${showview ? "absolute bg-white min-w-[95%] p-5 shadow-2xl backdrop-blur-3xl" : "hidden"}`}>
        <div className="h3 text-logo_yellow underline">Event Details</div>
        <div className="md:flex w-[100%] mx-auto">
          <div className="w-[100%] md:w-[50%]">
            <div className="text-logo_green h4">Image</div>
            <div className="flex justify-center">
              <img
                className="h-[300px] w-[300px] rounded-full bg-logo_red"
                src={eventvalue.imageUrl || 'https://defaultimage.url'}
                alt="Event"
              />
            </div>
          </div>
          <div>
            <div>
              <div className="text-logo_green h3">Title</div>
              <div className="h5">{eventvalue.title}</div>
            </div>
            <div>
              <div className="text-logo_green h3 mt-2">Start Date</div>
              <div className="h5">{new Date(eventvalue.startdate).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-logo_green h3 mt-2">End Date</div>
              <div className="h5">{new Date(eventvalue.enddate).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-logo_green h3 mt-2">Leader</div>
              <div className="h5">{eventvalue.leader}</div>
            </div>
            <div>
              <div className="text-logo_green h3 mt-2">Description</div>
              <div className="h5">{eventvalue.description}</div>
            </div>
            <div>
              <div className="text-logo_green h3 mt-2">Prizes</div>
              <div className="h5">1st: {eventvalue.prizes.first_winner}</div>
              <div className="h5">2nd: {eventvalue.prizes.second_winner}</div>
              <div className="h5">3rd: {eventvalue.prizes.third_winner}</div>
            </div>
            <div>
              <div className="text-logo_green h3 mt-2">Quote</div>
              <div className="h5">{eventvalue.quote}</div>
            </div>
            <div>
              <div className="text-logo_green h3 mt-2">Download Link Text</div>
              <div className="h5">{eventvalue.downloadLinkText}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Table */}
      <table className="min-w-full bg-white border border-light-blue rounded-xl shadow-md mt-10">
        <thead>
          <tr className="bg-gray-100 border-b border-light-blue h-16">
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Start Date</th>
            <th className="px-4 py-2">End Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {eventData?.map(event => (
            <tr key={event._id} className="border-b border-light-blue h-14">
              <td className="px-4 py-2 text-center">{event.title}</td>
              <td className="px-4 py-2 text-center">{new Date(event.startdate).toLocaleDateString()}</td>
              <td className="px-4 py-2 text-center">{new Date(event.enddate).toLocaleDateString()}</td>
              <td className="px-4 py-2 flex justify-center items-center gap-5">
                <button onClick={() => openUpdateModal(event)}>
                  <FaCloudUploadAlt className='h-6 w-6 mt-2' />
                </button>
                <button onClick={() => deleteevent(event._id)}>
                  <RiDeleteBin5Fill className='h-6 w-6 mt-2' />
                </button>
                <button onClick={toggleModal}>
                  <FaEye className='h-6 w-6 mt-2' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add event Modal */}
      {getAddItemModel && (
        <div className="absolute top-20 flex items-center justify-center bg-gray-800 bg-opacity-50 w-[100%] ">
          <div className="bg-white p-5  rounded-lg shadow-lg w-[100%] mx-auto ">
            <h2 className="text-xl font-semibold mb-4">{addUpdate ? 'Edit Event' : 'Add New Event'}</h2>
            <div className='grid sm:grid-cols-2 gap-2'>
            <div className="mb-4">
              <TextField
                value={eventvalue.title}
                onChange={(e) => seteventvalue({ ...eventvalue, title: e.target.value })}
                id="outlined-basic"
                label="Title"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="mb-4">
            <TextField
                    name="dob"
                    type="date"
                    label="Date of Birth"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={eventvalue.startdate}
                    onChange={(e) => seteventvalue({ ...eventvalue, startdate: e.target.value })}
                  />
     
            </div>
            <div className="mb-4">
            <TextField
                    name="dob"
                    type="date"
                    label="Date of Birth"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={eventvalue.enddate}
                    onChange={(e) => seteventvalue({ ...eventvalue, enddate: e.target.value })}
                  />
       
            </div>
            <div className="mb-4">
              <TextField
                value={eventvalue.imageUrl}
                onChange={(e) => seteventvalue({ ...eventvalue, imageUrl: e.target.value })}
                id="outlined-basic"
                label="Image URL"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="mb-4">
              <TextField
                value={eventvalue.leader}
                onChange={(e) => seteventvalue({ ...eventvalue, leader: e.target.value })}
                id="outlined-basic"
                label="Leader"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="mb-4">
              <TextField
                value={eventvalue.description}
                onChange={(e) => seteventvalue({ ...eventvalue, description: e.target.value })}
                id="outlined-basic"
                label="Description"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="mb-4">
              <TextField
                value={eventvalue.prizes.first_winner}
                onChange={(e) => seteventvalue({ ...eventvalue, prizes: { ...eventvalue.prizes, first_winner: e.target.value } })}
                id="outlined-basic"
                label="First Winner"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="mb-4">
              <TextField
                value={eventvalue.prizes.second_winner}
                onChange={(e) => seteventvalue({ ...eventvalue, prizes: { ...eventvalue.prizes, second_winner: e.target.value } })}
                id="outlined-basic"
                label="Second Winner"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="mb-4">
              <TextField
                value={eventvalue.prizes.third_winner}
                onChange={(e) => seteventvalue({ ...eventvalue, prizes: { ...eventvalue.prizes, third_winner: e.target.value } })}
                id="outlined-basic"
                label="Third Winner"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="mb-4">
              <TextField
                value={eventvalue.quote}
                onChange={(e) => seteventvalue({ ...eventvalue, quote: e.target.value })}
                id="outlined-basic"
                label="Quote"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="mb-4">
              <TextField
                value={eventvalue.downloadLinkText}
                onChange={(e) => seteventvalue({ ...eventvalue, downloadLinkText: e.target.value })}
                id="outlined-basic"
                label="Download Link Text"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  closeAllModel();
                  addevent();
                }}
                className="bg-logo_yellow hover:bg-logo_yellow-dark text-white font-semibold py-2 px-4 rounded"
              >
                {addUpdate ? 'Update Event' : 'Add Event'}
              </button>
              <button
                onClick={closeAllModel}
                className="ml-4 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Event;
