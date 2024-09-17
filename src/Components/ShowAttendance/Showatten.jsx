import React, { useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { TextField, InputLabel, MenuItem, FormControl, Select, Button, Box } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useGetAttenValueMutation } from '../../features/api/attendenceapi';

import { DojoName } from '../../Restapi/DojoName';
function Showatten() {
    const [postgetatten] = useGetAttenValueMutation();
    const [atten, setAtten] = useState([]);
    console.log(atten.length, 'this is atten');
    if (postgetatten.length == 0) {
        return toast.error('No data found', { autoClose: 2000 });
    }
    else {
        console.log('lake out range')
    }

    const [dojoselect, setDojoselect] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [output, setOutput] = useState([]);

    console.log(output, 'ranking')

    const formatDate = (date) => {
        return date ? date.format('YYYY-MM-DD') : 'Not selected';
    };

    // Function to generate date range
    const generateDateRange = (start, end) => {
        let dates = [];
        let currentDate = dayjs(start);
        const endDate = dayjs(end);

        while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
            dates.push(currentDate.format('YYYY-MM-DD'));
            currentDate = currentDate.add(1, 'day');
        }

        return dates;
    };

    // Handles attendance submission
    const getAttendance = () => {
        const getatten = {
            start: formatDate(startDate),
            end: formatDate(endDate),
            dojo: dojoselect,
        };
        postgetatten(getatten)
            .then((res) => {
                setOutput(res.data);
            })
            .catch((err) => {
                console.error(err);
                toast.error('Failed to update attendance', {
                    autoClose: 2000,
                });
            });
    };

    const dateRange = generateDateRange(startDate, endDate);

    console.log(output, 'this is output');

    const myoutput = output.map((output) => output);

    return (
        <div>
            <div className='bg-white grid grid-cols-3 gap-4 p-4'>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            renderInput={(params) => <TextField {...params} variant="outlined" margin="normal" />}
                        />
                    </LocalizationProvider>
                </div>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            renderInput={(params) => <TextField {...params} variant="outlined" margin="normal" />}
                        />
                    </LocalizationProvider>
                </div>
                <div>
                    <Box>
                        <FormControl fullWidth>
                            <InputLabel id="status-label">Select dojo</InputLabel>
                            <Select
                                labelId="status-label"
                                name="select Dojo"
                                value={dojoselect}
                                onChange={(e) => setDojoselect(e.target.value)}
                                label="Select Dojo"
                            >
                                {DojoName.map((name) => (
                                    <MenuItem value={name}>{name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </div>
            </div>
            <div className='flex justify-center mt-4 items-center'>
                <Button
                    onClick={getAttendance}
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Submit Attendance
                </Button>
            </div>

            <div className='m-3 md-0 w-[100%] overflow-scroll'>
                <table className="min-w-full  bg-white border border-light-blue rounded-xl shadow-md mt-10">
                    <thead>
                        <tr className="bg-gray-100 border-b border-light-blue h-16">
                            <th className='w-96'>Identity</th>
                            {dateRange.map((date) => (
                                <th key={date} className='text-center '><div className='w-32'>{date}</div></th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {output?.map((student) => (
                            <tr key={student._id} className="bg-gray-100 border-b  border-light-blue h-16">
                                <td className='text-center'>{student?.studentId?.name}</td>

                                {dateRange.map((date) => {
                                    const attendanceRecord = student.attendance.find(record => dayjs(record.date).format('YYYY-MM-DD') === date);
                                    return (
                                        <td key={date} className='text-center '>
                                            {attendanceRecord ? attendanceRecord.status : 'No mark'}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Showatten;
