import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { format, eachDayOfInterval, endOfMonth } from "date-fns";

import { HiUserGroup } from "react-icons/hi";
import { MdOutlineGroup } from "react-icons/md";

function Dashboard() {
    const [month, setMonth] = useState("11");
    const [year, setYear] = useState("2000");
    const [dateList, setDateList] = useState([]);

    // Function to generate dates for the selected month and year
    const generateDateList = () => {
        let formattedMonth = parseInt(month) - 1;
        let startDate = new Date(parseInt(year), formattedMonth, 1);
        let endDate = endOfMonth(startDate);

        let monthDates = eachDayOfInterval({ start: startDate, end: endDate }).map(
            (date) => format(date, "yyyy-MM-dd")
        );

        setDateList(monthDates);
    };

    // Generate date list on mount & when month/year changes
    useEffect(() => {
        generateDateList();
    }, [month, year]);

    // Update chart state when dateList is updated
    const [chartState, setChartState] = useState({
        series: [
            {
                name: "Attendence",
                data: Array(31).fill().map(() => Math.floor(Math.random() * 20)), // Generating random data
            },
        ],
        options: {
            chart: {
                height: 350,
                type: "line",
            },
            stroke: {
                width: 5,
                curve: "smooth",
            },
            xaxis: {
                type: "datetime",
                categories: dateList, // Corrected: Using the generated date list
                tickAmount: 10,
                labels: {
                    formatter: function (value, timestamp, opts) {
                        return opts.dateFormatter(new Date(timestamp), "dd MMM");
                    },
                },
            },
            title: {
                text: "Forecast today",
                align: "left",
                style: {
                    fontSize: "16px",
                    color: "#666",
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "dark",
                    gradientToColors: ["#FDD835"],
                    shadeIntensity: 1,
                    type: "horizontal",
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100, 100, 100],
                },
            },
        },
    });

    // Update the chart whenever dateList changes
    useEffect(() => {
        setChartState((prevState) => ({
            ...prevState,
            options: {
                ...prevState.options,
                xaxis: {
                    ...prevState.options.xaxis,
                    categories: dateList,
                },
            },
        }));
    }, [dateList]);



    const dashcard = [
        { title: "Total Students", count: "1498", icon: <HiUserGroup size={25} color="#2563eb" /> },
        { title: "Total Application", count: "40", icon: <MdOutlineGroup size={25} color="#22c55e" /> },
        { title: "Total Enquiry", count: "20", icon: <MdOutlineGroup size={25} color="#fbbf24" /> },
        { title: "Total Class", count: "35", icon: <MdOutlineGroup size={25} color="#9333ea" /> }
    ];


    const [chartData, setChartData] = React.useState({
        series: [44, 55],
        options: {
            chart: { width: 380, type: 'donut' },
            labels: ["Upcoming", "Completed"],
            plotOptions: { pie: { startAngle: -90, endAngle: 270 } },
            dataLabels: { enabled: true },
            fill: { type: 'gradient' },
            legend: {
                formatter: (val, opts) => {
                    return ` ${val} - ${opts.w.globals.series[opts.seriesIndex]}`;
                }
            },
            title: { text: 'Completed  and upcoming Events' },
            responsive: [{
                breakpoint: 480,
                options: { chart: { width: 200 }, legend: { position: 'bottom' } }
            }]
        },
    });






    return (
        <div className="p-10 bg-gray-400 text-[#393737]">

<div className="text-2xl font-semibold  text-[#737373] -10" >
welcome_master
            </div>

            {/* Cards Section */}
            <div className='grid grid-cols-1  md:grid-cols-2  lg:grid-cols-4  gap-2 lg:gap-10  mt-10'  >
                {
                    dashcard?.map((item, index) => (
                        <div className='shadow-md   border-[#cbd5e1] border bg-white p-5  rounded-md' >

                            <div className='text-lg text-[#403d3b] font-semibold mt-2 ' >
                                {item.title}
                            </div>

                            <div className='flex justify-between w-full mt-3 ' >
                                <div className='text-xl' >
                                    {item.count}
                                </div>
                                <div className=' shadow-md h-10 w-10 justify-center items-center rounded-md bg-gray-400 inline-flex' >
                                    {item.icon}
                                </div>
                            </div>
                            <div>

                            </div>

                        </div>
                    ))
                }


            </div>


    <div className="text-2xl font-semibold  text-[#737373] mt-10" >
                Completed and Upcoming Events
            </div>


         

            {/* <div className="grid grid-cols-12 gap-2" > */}
            <div className="col-span-4 bg-white flex justify-center items-center rounded-md mt-10" >
                <div className="mt-10 flex justify-center">
                    <ReactApexChart options={chartData.options} series={chartData.series} type="donut" width={380} />
                </div>
            </div>
            <div className="text-2xl font-semibold text-[#737373] mt-10" >
                Attendence for Students
            </div>
            <div className="col-span-8 bg-white rounded-md p-2 mt-10 my-5" >
                <div className="flex gap-10 justify-center my-4" >
                    <div class="w-full max-w-[100px] min-w-[100px]">
                        <label  class="block mb-1 text-sm  font-semibold text-slate-600">
                            Input Number
                        </label>

                        <div class="relative">
                            <select
                                onChange={(e) => setMonth(e.target.value.padStart(2, "0"))}
                                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow cursor-pointer appearance-none">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="4">5</option>
                                <option value="4">6</option>
                                <option value="4">7</option>
                                <option value="4">8</option>
                                <option value="4">9</option>
                                <option value="4">10</option>
                                <option value="4">11</option>
                                <option value="4">12</option>
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </div>
                    </div>
                    <div class="w-full max-w-[100px] min-w-[100px]">
                        <label class="block mb-1 text-sm font-semibold text-slate-600">
                            Select Year
                        </label>

                        <div class="relative">
                            <select
                                onChange={(e) => setYear(e.target.value.padStart(2, "0"))}
                                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow cursor-pointer appearance-none">
                                <option value="1">2025</option>
                                <option value="2">2026</option>
                                <option value="2">2027</option>
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </div>
                    </div>


                </div>



                <div style={{ width: "100%", height: "400px", overflow: "hidden", marginLeft: "block", marginRight: "block" }}>
                    <ReactApexChart
                        options={chartState.options}
                        series={chartState.series}
                        type="line"
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>


            {/* </div> */}




        </div>
    );
}

export default Dashboard;