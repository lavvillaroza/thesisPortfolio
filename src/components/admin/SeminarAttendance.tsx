import React, { useState } from 'react';

import 'react-calendar/dist/Calendar.css';
import Header from './Header';
import { FaFolder } from 'react-icons/fa';
import CustomTableSeminarList from '../common/CustomTableSeminarList';
import SideNavbar from './SideNavbar';

const Attendees = [
    { email: 'john.doe@example.com', status: true },
    { email: 'jane.smith@example.com', status: false },
    { email: 'alice.johnson@example.com', status: true },
    { email: 'bob.brown@example.com', status: false },
    { email: 'chris.evans@example.com', status: true },
    { email: 'lisa.white@example.com', status: false },
    { email: 'mike.jones@example.com', status: true },
    { email: 'natalie.williams@example.com', status: false },
    { email: 'david.lee@example.com', status: true },
    { email: 'susan.clark@example.com', status: false },
    { email: 'george.miller@example.com', status: true },
    { email: 'emily.davis@example.com', status: false },
    { email: 'matthew.moore@example.com', status: true },
    { email: 'anna.king@example.com', status: false },
    { email: 'james.green@example.com', status: true },
    { email: 'linda.hall@example.com', status: false }
  ];
const SeminarAttendance: React.FC = () => {
        const [totalPages, setTotalPages] = useState(1);
        const [pageNumber, setPageNumber] = useState(1);

        const folders = [
        { Name: 'Cyberseurity Essentials Seminar'},
        { Name: "Web Development Fundamentals Seminar"},
        { Name: "Software Architecture Seminar"},
        { Name: "Cloud Engineer Seminar"},
      ];

      // Handle page changes for pagination
    const handlePrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setPageNumber((prev) => Math.min(prev + 1, totalPages));
      return (
        <div className="flex p-4 md:flex md:flex-col bg-gray-100 py-2 min-h-screen min-w-screen w-full">
            <div className="flex-1 m-auto">
                <Header />  
                <div className="flex flex-col md:flex-row bg-background text-foreground mx-auto w-full h-full md:h-[750px] overflow-y-auto scrollbar scrollbar-thumb-emerald-700 scrollbar-track-gray-100">                
                    <SideNavbar/>
                    <main className="font-roboto flex-1 w-full md:w-[1100px] md:h-full mx-auto h-full bg-emerald-700 bg-gradient-to-br from-emerald-600 rounded transition-all duration-200">
                        <div className="h-[60px] p-4">
                            <h5 className="mb-2 text-center text-3xl font-bold tracking-tight text-white dark:text-gray-900">SEMINAR ATTENDED LIST</h5>                            
                        </div> 
                        <div className="flex flex-col-reverse md:flex-row gap-4 min-h-[660px] px-6">
                            <div className="flex-auto w-full md:w-72 bg-gray-100 p-3 overflow-y-auto scrollbar scrollbar-thumb-emerald-700 scrollbar-track-gray-100 rounded transition-all duration-200">
                                <div className="overflow-y-auto scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100 h-[550px]">                                
                                    <div className="grid grid-cols-2 gap-4 justify-center"> 
                                    {folders.map((folder) => (
                                        <div
                                            key={folder.Name}
                                            className="flex flex-col items-center text-center cursor-pointer">
                                            <a
                                                type="button" className="flex items-center justify-center p-3 rounded-full  transition text-black">
                                                <FaFolder className="mr-3 h-24 w-24 text-yellow-300 hover:text-yellow-400" aria-hidden="true" />                                                
                                            </a>                                            
                                            <span className="mt-1 text-xs font-semibold text-black">
                                                {folder.Name}
                                            </span>
                                        </div>
                                        ))}
                                    </div>                                    
                                </div>    
                                {/* Pagination controls */}
                                <div className="flex flex-col items-end mt-5">
                                    <span className="text-sm text-gray-700 dark:text-gray-400 mr-5">
                                        Page {pageNumber} of {totalPages}
                                    </span>
                                    <div className="inline-flex mt-2 xs:mt-0">
                                        <button
                                            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            onClick={handlePrevPage}
                                            disabled={pageNumber === 1}
                                        >
                                            Prev
                                        </button>
                                        <button
                                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            onClick={handleNextPage}
                                            disabled={pageNumber === totalPages}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>                            
                            </div>    
                            <div className="flex-1 w-full md:w-8 md:flex-1 bg-gray-200 p-1 flex justify-center items-start rounded transition-all duration-200">
                                <div className="container mx-auto p-4 drop-shadow-lg ">                
                                    <CustomTableSeminarList data={Attendees} />
                                </div>
                            </div>                                   
                        </div>                           
                    </main>
                </div>            
            </div>
            
        </div>        
      );
    };
    
export default SeminarAttendance;