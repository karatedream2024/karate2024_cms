import React, { useState, useEffect, useRef } from 'react';
import { FaEye } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddOrUpdateTournamentMutation, useDeleteTournamentMutation, useGetAllTournamentsQuery } from '../../features/api/tourapi';
// import { useDeleteTournamentMutation, useGetAllTournamentsQuery, useAddOrUpdateTournamentMutation } from '../../features/api/tournamentApi'; // Updated import

function Tournament() {
  const { data: tournamentData, error, isLoading } = useGetAllTournamentsQuery();

  const [deleteTournament] = useDeleteTournamentMutation();
  const [addOrUpdateTournament] = useAddOrUpdateTournamentMutation();

  const [showView, setShowView] = useState(false); // State to show/hide the modal
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [formState, setFormState] = useState({
    tournamentName: '',
    startDate: '',
    location: '',
    enquiry: '',
    About: '',
    title: '',
    category: ''
  });

  const modalRef = useRef();

  const handleDelete = (id) => {
    console.log(id, 'fsa')
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteTournament(id)
              .then(res => {
                toast.warning('Tournament deleted successfully', {
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

  const toggleModal = (tournament) => {
    setSelectedTournament(tournament);
    setFormState({
      tournamentName: tournament?.tournamentName || '',
      startDate: tournament?.startDate ? new Date(tournament.startDate).toISOString().split('T')[0] : '', // Format date
      location: tournament?.location || '',
      enquiry: tournament?.enquiry || '',
      About: tournament?.About || '',
      title: tournament?.title || '',
      category: tournament?.category || ''
    });
    setShowView(prev => !prev);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { tournamentName, startDate, location, enquiry, About, title, category } = formState;

    addOrUpdateTournament({
      tournamentId: selectedTournament?.id,
      tournamentName,
      startDate,
      location,
      enquiry,
      About,
      title,
      category
    })
      .then(res => {
        toast.success('Tournament saved successfully', {
          autoClose: 2000
        });
        setShowView(false);
      })
      .catch(err => {
        toast.error('Error saving tournament', {
          autoClose: 2000
        });
        console.log(err);
      });
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
      <h1 className="text-3xl font-bold mb-4">Tournament Details</h1>

      {/* Form for Adding/Updating Tournament */}
      {
        tournamentData && tournamentData?.length > 0 ?  null
      :   <div className="mb-4">
      <button
        className="bg-blue-500 text-white bg-logo_blue px-4 py-2 rounded"
        onClick={() => toggleModal(null)} // Opens form with empty fields for creating a new tournament
      >
        Add New Tournament
      </button>
    </div> 
      }
 

      {/* View Tournament Modal */}
      <div ref={modalRef} className={`${showView ? "absolute bg-white min-w-[95%] p-5 shadow-2xl backdrop-blur-3xl" : "hidden"}`}>
        <div className="h3 text-logo_yellow underline">{selectedTournament ? 'Edit Tournament' : 'Add Tournament'}</div>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="tournamentName"
              value={formState.tournamentName}
              onChange={handleFormChange}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formState.startDate}
              onChange={handleFormChange}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formState.location}
              onChange={handleFormChange}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Enquiry</label>
            <input
              type="text"
              name="enquiry"
              value={formState.enquiry}
              onChange={handleFormChange}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">About</label>
            <textarea
              name="About"
              value={formState.About}
              onChange={handleFormChange}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formState.title}
              onChange={handleFormChange}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formState.category}
              onChange={handleFormChange}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="border border-blue text-blue px-4 py-2 rounded"
              onClick={() => setShowView(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded bg-blue"
            >
              {selectedTournament ? 'Update Tournament' : 'Add Tournament'}
            </button>
          </div>
        </form>
      </div>

      {/* Tournament Table */}
      <table className="min-w-full bg-white border border-light-blue rounded-xl shadow-md mt-10">
        <thead>
          <tr className="bg-gray-100 border-b border-light-blue h-16">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Start Date</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tournamentData?.map(tournament => (
            <tr key={tournament.id} className="border-b border-light-blue h-14">
              <td className="px-4 py-2 text-center">{tournament.tournamentName}</td>
              <td className="px-4 py-2 text-center">{new Date(tournament.startDate).toLocaleDateString()}</td>
              <td className="px-4 py-2 text-center">{tournament.location}</td>
              <td className="px-4 py-2 text-center">{tournament.category}</td>
              <td className="px-4 py-2 flex justify-center items-center gap-5">
                <button onClick={() => toggleModal(tournament)}>
                  <FaEye className='h-6 w-6 mt-2' />
                </button>
                <button onClick={() => handleDelete(tournament._id)}>
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

export default Tournament;
