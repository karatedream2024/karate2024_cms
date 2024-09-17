import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { TextField, InputLabel, MenuItem, FormControl, Select, Button, Box } from '@mui/material';
import { useAddStudentMutation, useUpdateStudentMutation } from '../../features/api/studentapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DojoName } from '../../Restapi/DojoName';
function AddStudent() {
  const { search } = useLocation();
  const studentapivalue = queryString.parse(search);

  const navigate = useNavigate();

  const [studentValue, setStudentValue] = useState({
    image: studentapivalue.image || "",
    name: studentapivalue.name || "",
    fatherName: studentapivalue.fatherName || "",
    gender: studentapivalue.gender || "",
    dob: studentapivalue.dob || "",
    joiningDate: studentapivalue.joiningDate || "",
    student_number: studentapivalue.student_number || "",
    parent_number: studentapivalue.parent_number || "",
    email: studentapivalue.email || "",
    status: studentapivalue.status !== undefined ? studentapivalue.status : true,
    blood_group: studentapivalue.blood_group || "",
    belt: studentapivalue.belt || "",
    dojo: studentapivalue.dojo || "",
    occupation: studentapivalue.occupation || "",
    address: studentapivalue.address || ""
  });

  const [addStudentApi] = useAddStudentMutation();
  const [updateStudentApi] = useUpdateStudentMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (studentapivalue._id) {
      // Update existing student
      updateStudentApi({ id: studentapivalue._id, values: studentValue })
        .then(() => {
   
          toast.success('Student updated successfully', { autoClose: 2000 });
          setTimeout(() => {
            
          navigate('/cms');
          }, 2000);
        })
        .catch(err => {
          console.error('Error updating student:', err);
          toast.error('Failed to update student', { autoClose: 2000 });
        });
    } else {
      // Add new student
      addStudentApi(studentValue)
        .then(() => {
          toast.success('Student added successfully', { autoClose: 2000 });
          setTimeout(() => {
            
            navigate('/cms');
            }, 2000);
        })
        .catch(err => {
          console.error('Error adding student:', err);
          toast.error('Failed to add student', { autoClose: 2000 });
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentValue(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <Box className="flex flex-col gap-9">
        <Box className="rounded-sm p-10 bg-white shadow-default dark:border-blackdark dark:bg-boxdark">
          <Box className="pb-4 px-6.5 dark:border-blackdark">
            <h3 className="font-medium text-black h3">
              {studentapivalue._id ? 'Update Student' : 'Add Student'}
            </h3>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box className="p-6.5 flex flex-col md:grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4">
                <Box className="w-full ">
                  <TextField
                    name="image"
                    onChange={handleChange}
                    label="Image URL"
                    variant="outlined"
                    fullWidth
                    value={studentValue.image}
                  />
                </Box>
                <Box className="w-full ">
                  <TextField
                    name="name"
                    onChange={handleChange}
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={studentValue.name}
                  />
              </Box>
                <Box className="w-full ">
                  <TextField
                    name="fatherName"
                    onChange={handleChange}
                    label="Father's Name"
                    variant="outlined"
                    fullWidth
                    value={studentValue.fatherName}
                  />
                </Box>
                <Box className="w-full ">
                  <FormControl fullWidth>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      labelId="gender-label"
                      name="gender"
                      value={studentValue.gender}
                      onChange={handleChange}
                      label="Gender"
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Transgender">Transgender</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box className="w-full ">
                  <TextField
                    name="dob"
                    onChange={handleChange}
                    type="date"
                    label="Date of Birth"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={studentValue.dob}
                  />
                </Box>
                <Box className="w-full ">
                  <TextField
                    name="joiningDate"
                    onChange={handleChange}
                    type="date"
                    label="Joining Date"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={studentValue.joiningDate}
                  />
                </Box>
                <Box className="w-full ">
                  <TextField
                    name="student_number"
                    onChange={handleChange}
                    label="Student Phone Number"
                    variant="outlined"
                    fullWidth
                    value={studentValue.student_number}
                  />
                </Box>
                <Box className="w-full ">
                  <TextField
                    name="parent_number"
                    onChange={handleChange}
                    label="Parent Phone Number"
                    variant="outlined"
                    fullWidth
                    value={studentValue.parent_number}
                  />
                </Box>  
                <Box className="w-full ">
                  <TextField
                    name="email"
                    onChange={handleChange}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={studentValue.email}
                  />
                </Box>
                <Box className="w-full ">
                  <FormControl fullWidth>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                      labelId="status-label"
                      name="status"
                      value={studentValue.status}
                      onChange={handleChange}
                      label="Status"
                    >
                      <MenuItem value={true}>Active</MenuItem>
                      <MenuItem value={false}>Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box className="w-full ">
                  <FormControl fullWidth>
                    <InputLabel id="blood-group-label">Blood Group</InputLabel>
                    <Select
                      labelId="blood-group-label"
                      name="blood_group"
                      value={studentValue.blood_group}
                      onChange={handleChange}
                      label="Blood Group"
                    >
                      <MenuItem value="A">A</MenuItem>
                      <MenuItem value="B">B</MenuItem>
                      <MenuItem value="AB">AB</MenuItem>
                      <MenuItem value="O">O</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box className="w-full ">
                  <FormControl fullWidth>
                    <InputLabel id="belt-label">Belt</InputLabel>
                    <Select
                      labelId="belt-label"
                      name="belt"
                      value={studentValue.belt}
                      onChange={handleChange}
                      label="Belt"
                    >
                      <MenuItem value="White">White</MenuItem>
                      <MenuItem value="Yellow">Yellow</MenuItem>
                      <MenuItem value="Green">Green</MenuItem>
                      <MenuItem value="Black">Black</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box className="mb-4.5 md:col-span-2 lg:col-span-3">
                <TextField
                  name="address"
                  onChange={handleChange}
                  label="Address"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={1}
                  value={studentValue.address}
                />
              </Box>
                <Box className="w-full  ">
                  <FormControl fullWidth>
                    <InputLabel id="dojo-label">Dojo</InputLabel>
                    <Select
                      labelId="dojo-label"
                      name="dojo"
                      value={studentValue.dojo}
                      onChange={handleChange}
                      label="Dojo"
                    >
                       {DojoName.map((name) => (
                                    <MenuItem value={name}>{name}</MenuItem>
                                ))}
                    </Select>
                  </FormControl>
                </Box>
                
                <Box className="w-full ">
                  <TextField
                    name="occupation"
                    onChange={handleChange}
                    label="Occupation"
                    variant="outlined"
                    fullWidth
                    value={studentValue.occupation}
                  />
                </Box>
                <Box className="flex justify-end col-span-3 mt-6">
                <Button type="submit" variant="contained" color="primary">
                  {studentapivalue._id ? 'Update Student' : 'Add Student'}
                </Button>
              </Box>
           
         

          
           
          
            </Box>
       
          </form>
        </Box>
      </Box>
      <ToastContainer />
    </div>
  );
}

export default AddStudent;
