import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Header from './Header';
//import CustomCalendar from '../common/CustomCalendar';
import Sidebar from './Sidebar';
import 'flowbite/dist/flowbite.css';

const Announcement: React.FC = () => {   
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    useEffect(() => {
        // Get the current date as a JavaScript Date object
        const getCurrentDate = () => {
            return new Date(); // Use native Date object
        };
        

        const datepickerElement = document.getElementById('inline-calendar');

        if (datepickerElement) {
            const currentDate = getCurrentDate(); // Get the current date
            setSelectedDate(currentDate.toISOString().split('T')[0]); // Set initial state

            // Initialize Flowbite's datepicker with custom settings
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const datepicker = new (window as any).Datepicker(datepickerElement, {
                autohide: false, 
                todayBtn: true,
                clearBtn: true,
                autoselect: true,
                format: 'yyyy-mm-dd', 
                defaultDate: currentDate, // Set the current date as default
            });
            
            // Select current date visually
            datepicker.setDate(currentDate);  // This makes the current date visually selected
            
            // Listen for the `changeDate` event to capture the selected date
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            datepickerElement.addEventListener('changeDate', (event: any) => {
                setSelectedDate(event.detail.date);
            });
        }
    }, []);
      useEffect(() => {
        // Update the hidden input field when the selectedDate changes
        const hiddenInput = document.getElementById('hidden-date-input') as HTMLInputElement;
        if (hiddenInput && selectedDate) {
            hiddenInput.value = selectedDate;
        }
    }, [selectedDate]);
      return (
        <div className="flex flex-col bg-gray-300 py-2 min-h-screen w-full">
            <div className="flex-1 m-auto">
                <Header />  
                <div className="flex flex-col md:flex-row bg-background text-foreground mx-auto w-full h-[700px]">                
                    <Sidebar/>
                    <main className="flex-1 w-full md:w-8/12 mx-auto h-full bg-green-700 bg-gradient-to-br from-emerald-600">
                        <div className="h-[60px] p-4">
                            <p className="text-gray-50 text-center m-2 hover:text-3xl text-2xl">WELCOME ADMIN</p>
                        </div> 
                        <div className="grid grid-cols-3 gap-4 h-[600px] p-6">
                            <div className="col-span-2 bg-gray-100 p-2 h-full overflow-y-scroll scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100">
                                <p className="text-black text-left m-2 hover:text-green-500 text-2xl">ANNOUNCEMENT:</p>
                                <div className="w-11/12 m-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    <a href="#">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                                    </a>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                    <div className="relative p-4">
                                        <div className="absolute top-0 right-0">
                                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                            Read more
                                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                            </svg>
                                        </a>
                                        </div>
                                    </div>                                         
                                </div>    
                                <div className="w-11/12 m-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    <a href="#">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                                    </a>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                    <div className="relative p-4">
                                        <div className="absolute top-0 right-0">
                                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                            Read more
                                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                            </svg>
                                        </a>
                                        </div>
                                    </div>                                         
                                </div>    
                                <div className="w-11/12 m-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    <a href="#">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                                    </a>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                    <div className="relative p-4">
                                        <div className="absolute top-0 right-0">
                                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                            Read more
                                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                            </svg>
                                        </a>
                                        </div>
                                    </div>                                         
                                </div>    
                                <div className="w-11/12 m-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    <a href="#">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                                    </a>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                    <div className="relative p-4">
                                        <div className="absolute top-0 right-0">
                                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                            Read more
                                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                            </svg>
                                        </a>
                                        </div>
                                    </div>                                         
                                </div>                                
                            </div>
                            <div className="bg-gray-200 p-5 h-full flex justify-center items-start overflow-auto">
                                {/* <div className="p-1 w-11/12 m-4 mt-10 h-50 drop-shadow-md">
                                    <CustomCalendar />
                                </div> */}
                                <div className="relative max-w-sm">                                    
                                    <div className = "m-auto" id="inline-calendar"></div> {/* The calendar will be rendered here */}
                                     {/* Display the selected date */}
                                     {/* Hidden input field to hold the selected date */}
                                        <input 
                                        type="hidden" 
                                        id="hidden-date-input" 
                                        name="selectedDate" />
                                </div>
                            </div>            
                        </div>    
                    </main>
                </div>            
            </div>
            
        </div>        
      );
    };
    
export default Announcement;