import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { FaEye, FaCloudUploadAlt, FaDollarSign } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddStudentMutation, useDeleteStudentMutation, useGetAllStudentQuery, useUpdateStudentMutation, useToggleStudentMutation } from '../../features/api/studentapi';
import { useAddUpdateFeeMutation, useDeleteFeeMutation, useGetAttenFeeMutation } from '../../features/api/feeapi';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import './Student.css';
import { DojoName } from '../../Restapi/DojoName';


function Student() {

  console.log(DojoName, 'lakcing dojo name');


  const navigate = useNavigate();

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [dojodata, setDojodata] = useState('Edappadi');
  const [searchTerm, setSearchTerm] = useState('');
  const [studentData, setStudentData] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const { data: studentDataApi, refetch, isLoading, error } = useGetAllStudentQuery({
    dojodata,
    search: searchTerm
  });

  useEffect(() => {
    if (studentDataApi) {
      setStudentData(studentDataApi.data);
    }
  }, [studentDataApi]);
  const [deleteStudentApi] = useDeleteStudentMutation();
  const [toggleStudentApi] = useToggleStudentMutation();
  const [addUpdateFeeApi] = useAddUpdateFeeMutation();
  const [getAttenFeeApi] = useGetAttenFeeMutation();
  const [deletefeeapi] = useDeleteFeeMutation();

  
  const[feeChange, setFeeChange] = useState(false)

  console.log(feeChange, 'feechange')

  const [feeModel, setFeeModel] = useState(false);
  const [feeDetailsModel, setFeeDetailsModel] = useState(false);
  const [feeValue, setFeeValue] = useState({
    amount: '',
    date: '',
    payment_type: '',
    studentId: ""
  });
  const [fees, setFees] = useState();

  const handleAddFee = () => {
    
    const feeValueGot = {
      amount: feeValue.amount,
      date: feeValue.date,
      payment_type: feeValue.payment_type,
      studentId: selectedStudent._id
    };
    addUpdateFeeApi(feeValueGot)
      .then(() => {
        toast.success('Fee added successfully', { autoClose: 2000 });
        setFeeModel(false);
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = () => {
    refetch(); // Trigger a refetch with updated parameters
  };

  const deleteStudent = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to delete this student?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteStudentApi({ id: id })
              .then(() => {
                toast.warning('Student deleted successfully', { autoClose: 2000 });
                refetch(); // Refetch data after deletion
              })
              .catch((err) => console.log(err));
          }
        },
        { label: 'No' }
      ]
    });
  };

  const toggleActiveStatus = (id, isActive) => {
    toggleStudentApi({ id, isActive: !isActive })
      .then(() => {
        toast.info('Student status toggled successfully', { autoClose: 2000 });
        refetch(); // Refetch data after toggling status
      })
      .catch((err) => console.log(err));
  };

  const fetchFeeDetails = (studentId) => {
    console.log(studentId, 'lake this for');
    getAttenFeeApi(studentId)
      .then((response) => {
        console.log(response?.data?.data[0].fees, 'fsafdsfsd?');
        setFees(response?.data?.data[0].fees);
        setFeeDetailsModel(true);
      })
      .catch((err) => console.log(err));
  };

  const handleAddStudentClick = () => {
    navigate('/cms/addstudent');
  };

  function searchmine(data) {
    setSearchTerm(data);
  }

  console.log(fees, "fees")

  const deletefeesnow = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deletefeeapi({ id: id, studentId: selectedStudent._id })
              .then(res => {
                refetch();
                toast.warning('Blog deleted successfully', {
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

  function editfeesnow(data) {
    console.log(data, 'data');
    setFeeValue(data);
    setFeeModel(true);
    setFeeDetailsModel(false);
    setFeeChange(true);
   
  }

  function handleUpdateFee(feeValue) {
    console.log(feeValue, 'xx')
    const feeValueGot = {
      amount: feeValue.amount,
      date: feeValue.date,
      payment_type: feeValue.payment_type,
      studentId: selectedStudent._id,
      feeId: feeValue._id
    };
    addUpdateFeeApi(feeValueGot)
      .then(() => {
        toast.success('Fee added successfully', { autoClose: 2000 });
        setFeeModel(false);
      })
      .catch((err) => console.log(err));
  }


  return (
    <div className="container mx-auto p-4 relative">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">Student Management</h1>
        <div className='flex justify-between pl-[5%]'>
          <button
            type="button"
            onClick={handleAddStudentClick}
            className="px-6 py-3.5 text-base font-medium text-white bg-logo_green hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center"
          >
            Add Student
          </button>
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
                value={dojodata}
                label="Dojo Name"
              >
              {DojoName.map((name) => (
                <MenuItem value={name}>{name}</MenuItem>
              ))}
              </Select>
            </FormControl>
          </div>
          <div className='w-96'>
            <Box className="w-full">
              <TextField
                name="search"
                onChange={(e) => searchmine(e.target.value)}
                label="Search"
                variant="outlined"
                fullWidth
              />
            </Box>
          </div>
        </div>

      </div>

      <table className="min-w-full bg-white border border-light-blue rounded-xl shadow-md mt-10">
        <thead>
          <tr className="bg-gray-100 border-b border-light-blue h-16">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Belt</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentData?.map((student) => (
            <tr key={student._id} className="border-b border-light-blue h-14">
              <td className="px-4 py-2 text-center">{student.name}</td>
              <td className="px-4 py-2 text-center">{student.belt}</td>
              <td className="px-4 py-2 flex justify-center items-center gap-5">
                <button onClick={() => {
                  const queryStringData = queryString.stringify(student);
                  navigate(`/cms/addstudent?${queryStringData}`);
                }}>
                  <FaCloudUploadAlt className="h-6 w-6" />
                </button>
                <button onClick={() => deleteStudent(student._id)}>
                  <RiDeleteBin5Fill className="h-6 w-6" />
                </button>
                <button onClick={() => toggleActiveStatus(student._id, student.isActive)}>
                  <FaEye className={student.isActive ? 'text-green-500' : 'text-gray-500'} />
                </button>
                <button onClick={() => {
                  setSelectedStudent(student);
                  setFeeDetailsModel(true)
                  fetchFeeDetails(student._id);
                }}>
                  <FaDollarSign className="h-6 w-6" />

                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Fee Modal */}
      {feeModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add Fee</h2>
            <TextField
              label="Amount"
              variant="outlined"
              fullWidth
              margin="normal"
              value={feeValue.amount}
              onChange={(e) => setFeeValue({ ...feeValue, amount: e.target.value })}
            />
            <TextField
              label="Date"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              value={feeValue.date}
              onChange={(e) => setFeeValue({ ...feeValue, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
     
            <FormControl fullWidth>
              <InputLabel id="gender-label">Payment_Type</InputLabel>
              <Select
                labelId="gender-label"
                name="Payment_Type"

                value={feeValue.payment_type}
                onChange={(e) => setFeeValue({ ...feeValue, payment_type: e.target.value })}
                label="Gender"
              >
                <MenuItem value="Male">Semi</MenuItem>
                <MenuItem value="Female">Full</MenuItem>
              </Select>
            </FormControl>
            <div className="flex justify-end mt-4">
              {
                feeChange ? <button
                  type="button"
                  onClick={()=>handleUpdateFee(feeValue)}
                  className="px-4 py-2 text-white bg-blue hover:bg-blue-700 rounded"
                >
                  Update Fee
                </button> :
                 <button
                  type="button"
                  onClick={handleAddFee}
                  className="px-4 py-2 text-white bg-blue hover:bg-blue-700 rounded"
                >
                  Add Fee
                </button>
              }
              {/* <button
                type="button"
                onClick={handleAddFee}
                className="px-4 py-2 text-white bg-blue hover:bg-blue-700 rounded"
              >
              {feeChange ? <div> 'update Fee' </div> : <div>'Add Fee' </div> }  
              </button> */}
              <button
                type="button"
                onClick={() => setFeeModel(false)}
                className="px-4 py-2 text-blue border border-blue bg-gray-500 hover:bg-gray-700 rounded ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fee Details Modal */}
      {feeDetailsModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md min-h-44 overflow-y-scroll">
            <h2 className="text-xl font-semibold mb-4">Fee Details</h2>
            <table className="min-w-full bg-white border rounded shadow-md min-h-44 ">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Payment Type</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody >
                {fees?.map((fee) =>

                (
                  <tr key={fee._id} className="border-b">
                    <td className="px-4 py-2 text-center">{fee.amount}</td>
                    <td className="px-4 py-2 text-center">{fee.date}</td>
                    <td className="px-4 py-2 text-center">{fee.payment_type}</td>
                    <td className="px-4 py-2 text-center">
                      <div className='flex gap-2'>
                      <span onClick={() => editfeesnow(fee)} ><FaDollarSign className="h-6 w-6" /></span>
                      <span onClick={() => deletefeesnow(fee._id)}> <RiDeleteBin5Fill className="h-6 w-6" /> </span>
                      </div>
                    </td>
                  </tr>
                )

                )}
              </tbody>
            </table>
            <div className="flex justify-end mt-4">

              <button
                type="button"
                onClick={() => {
                  setFeeModel(true)
                  setFeeDetailsModel(false)
                  setFeeChange(false);
                  setFeeValue ({
                    amount: '',
                    date: '',
                    payment_type: '',
                    studentId: ""
                  })
                  

                }}
                className="px-4 py-2 border-blue border text-white bg-blue hover:bg-gray-700 rounded"
              >
                Add Fees
              </button>
              <button
                type="button"
                onClick={() => setFeeDetailsModel(false)}
                className="px-4 mx-2 py-2 border-blue border text-blue hover:bg-gray-700 rounded"
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

export default Student;
