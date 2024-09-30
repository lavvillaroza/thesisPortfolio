import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Header from './Header';
//import CustomCalendar from '../common/CustomCalendar';
import Sidebar from './Sidebar';
import 'flowbite/dist/flowbite.css';

const Announcement: React.FC = () => {   
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    useEffect(() => {
        // Initialize the datepicker after the component is mounted
        const datepickerElement = document.getElementById('inline-calendar');
        if (datepickerElement) {
          // Initialize Flowbite's datepicker with custom settings
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          new (window as any).Datepicker(datepickerElement, {
            autohide: false, // Customize the behavior to prevent automatic hiding
            todayBtn: true, // Show today button
            clearBtn: true, // Show clear button
            autoselect: true, // Automatically select today
            format: 'yyyy-mm-dd', // Date format
          });
            // Listen for the `changeDate` event to capture selected date
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
        <div className="flex flex-col bg-gray-300 py-2 min-h-screen w-full ">
            <div className="flex-1 m-auto">
                <Header />  
                <div className="flex flex-col md:flex-row bg-background text-foreground mx-auto w-9/12 h-[700px]">                
                    <Sidebar/>
                    <main className="flex-1 mx-auto w-8/12 h-full bg-green-700 bg-gradient-to-br from-emerald-600 ">
                        <div className="h-[60px] p-4">
                            <p className="text-gray-50 text-center m-2 hover:text-green-500 text-2xl">WELCOME ADMIN</p>
                        </div> 
                        <div className="grid grid-cols-3 gap-4 h-[600px] p-6">
                            <div className="col-span-2 bg-gray-100 p-2 h-full">
                                <p className="text-black text-left m-2 hover:text-green-500 text-2xl">ANNOUNCEMENT:</p>
                                <div className="p-4 w-11/12 m-auto mt-10 h-50 bg-white drop-shadow-lg">
                                <p className="mb-4 text-black text-left hover:text-green-500 text-xl">ANNOUNCEMENT</p>
                                <p className='text-wrap text-sm'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                </p>
                                <div className="relative p-4">
                                    <div className="absolute top-0 right-0">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Read more</a>                
                                    </div>
                                </div>              
                                </div>
                                <div className="p-4 w-11/12 m-auto mt-10 h-50 bg-white drop-shadow-lg">
                                <p className="mb-4 text-black text-left hover:text-green-500 text-xl">ANNOUNCEMENT</p>
                                <p className='text-wrap text-sm'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                </p>
                                <div className="relative p-4">
                                    <div className="absolute top-0 right-0">
                                    <a href="#"  onClick={(e) => e.preventDefault()} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Read more</a>                
                                    </div>
                                </div>              
                                </div>
                            </div>
                            <div className="bg-gray-200 pt-10 h-full flex justify-center items-start overflow-auto">
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