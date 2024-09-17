  import React, { useState, useEffect, useRef } from 'react';
  import { useRegisterUserMutation, useGetFullUserQuery, useUpdateUserMutation, useDeleteUserMutation } from '../../features/api/userapi';
  import Box from '@mui/material/Box';
  import TextField from '@mui/material/TextField';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { FaEye, FaCloudUploadAlt } from "react-icons/fa";
  import { RiDeleteBin5Fill } from "react-icons/ri";
  import { confirmAlert } from 'react-confirm-alert';
  import 'react-confirm-alert/src/react-confirm-alert.css';
  import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

  function User() {
    const [registerUser] = useRegisterUserMutation();
    const { data: users, isLoading, error } = useGetFullUserQuery();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();
    const [showModal, setShowModal] = useState(false);
    const [updata, setupdata] = useState(false);
    const [userData, setUserData] = useState({
      name: '',
      email: '',
      password: '',
      phone: '',
      userType: ''
    });
    const [editUser, setEditUser] = useState(true);
    const [showUserDetails, setShowUserDetails] = useState(null);
    const modalRef = useRef();

    const handleAddUser = async () => {
      try {
        await registerUser(userData);
        toast.success('User registered successfully');
        setShowModal(false);
      } catch (error) {
        console.error('Error registering user:', error);
      }
    };

    const handleUpdateUser = async () => {
      try {
        await updateUser({ ...userData, id: editUser._id });
        toast.success('User updated successfully');
        setShowModal(false);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };




    const handleDelete = async (email) => {
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to delete this user?',
        buttons: [
          {
            label: 'Yes',
            onClick: async () => {
              try {
                await deleteUser(email);
                toast.warning('User deleted successfully');
              } catch (error) {
                console.error('Error deleting user:', error);
              }
            }
          },
          {
            label: 'No'
          }
        ]
      });
    };

    const closeAllModals = () => {
      setShowModal(false);
      setShowUserDetails(null);
    };

    const [up, setup] = useState(false)

    const openUserModal = (user) => {
      setup(true)
      setEditUser(user);
      setUserData({
        name: user.name || '',
        email: user.email || '',
        password: user.password || '',
        phone: user.phone || '',
        userType: user.userType || ''
      });
      setShowModal(true);
    };

    const viewUserDetails = (user) => {
      setShowUserDetails(user);
    };

    // useEffect(() => {
    //   const handleClickOutside = (event) => {
    //     if (modalRef.current && !modalRef.current.contains(event.target)) {
    //       setShowModal(false);
    //       setShowUserDetails(null);
    //     }
    //   };

    //   if (showModal || showUserDetails) {
    //     document.addEventListener("mousedown", handleClickOutside);
    //   } else {
    //     document.removeEventListener("mousedown", handleClickOutside);
    //   }

    //   return () => {
    //     document.removeEventListener("mousedown", handleClickOutside);
    //   };
    // }, [showModal, showUserDetails]);

    return (
      <div className="container mx-auto p-4 relative">
        <h1 className="text-3xl font-bold mb-4">User Management</h1>

        <div className="mb-4">
          <button
            onClick={() => {
              openUserModal({})
              setupdata(true)
            }}
            className="bg-blue border border-blue py-2 px-4 text-white rounded"
          >
            Add User
          </button>
        </div>

        {/* Users Table */}
        <table className="min-w-full bg-white border border-light-blue rounded-xl shadow-md mt-10">
          <thead>
            <tr className="bg-gray-100 border-b border-light-blue h-16">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.data?.map((user) => (
              <tr key={user._id} className="border-b border-light-blue h-14">
                <td className="px-4 py-2 text-center">{user.name}</td>
                <td className="px-4 py-2 text-center">{user.email}</td>
                <td className="px-4 py-2 flex justify-center items-center gap-5">
                  <button onClick={() => {
                    setupdata(false)
                    openUserModal(user)
                  }}>
                    <FaCloudUploadAlt className='h-6 w-6' />
                  </button>
                  <button onClick={() => handleDelete(user.email)}>
                    <RiDeleteBin5Fill className='h-6 w-6' />
                  </button>
                  <button onClick={() => viewUserDetails(user)}>
                    <FaEye className='h-6 w-6' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* User Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div ref={modalRef} className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
              <h2 className="text-xl font-semibold mb-4">{updata ? 'Add User' : 'Update User'}</h2>
              <div className="mb-4">
                <TextField
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  label="Name"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="mb-4">
              <FormControl fullWidth>
                <InputLabel id="gender-label">User Type</InputLabel>
                <Select
                  labelId="gender-label"
                  name="User Type"
                  onChange={(e) => setUserData({ ...userData, userType: e.target.value })}
                  value={userData.userType}
                  label="Dojo Name"
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                </Select>
              </FormControl>
              </div>
              <div className="mb-4">
                <TextField
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  label="Email"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="mb-4">
                <TextField
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                />
              </div>
              <div className="mb-4">
                <TextField
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  label="Phone"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="mb-4">


              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-blue border border-blue px-4 py-2 rounded hover:bg-gray-600 mr-2"
                  onClick={closeAllModals}
                >
                  Cancel
                </button>
                {
                  updata
                    ?
                    <button
                      type="button"
                      className="bg-blue text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={handleAddUser}
                    >
                      Add
                    </button>

                    :
                    <button
                      type="button"
                      className="bg-blue text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={handleUpdateUser}
                    >
                      Update
                    </button>
                }



              </div>
            </div>
          </div>
        )}

        {/* User Details Modal */}
        {showUserDetails && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
              <h2 className="text-xl font-semibold mb-4">User Details</h2>
              <div className="mb-4">
                <strong>Name:</strong> {showUserDetails.name}
              </div>
              <div className="mb-4">
                <strong>Email:</strong> {showUserDetails.email}
              </div>
              <div className="mb-4">
                <strong>Phone:</strong> {showUserDetails.phone}
              </div>
              <div className="mb-4">
                <strong>User Type:</strong> {showUserDetails.userType}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-blue text-white border border-gray-500 px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => setShowUserDetails(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    );
  }

  export default User;
