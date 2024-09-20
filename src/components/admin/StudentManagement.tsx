import React from 'react';

import 'react-calendar/dist/Calendar.css';
import Header from './Header';
import Sidebar from './Sidebar';
import { FaFolder } from 'react-icons/fa';
import CustomTableStudentList from '../common/CustomTableStudentList';

const studentList = [
    {
        "name": "John Doe",
        "course": "BSIT",
        "yearLevel": "1st",
        "section": "A"
      },
      {
        "name": "Jane Smith",
        "course": "BSCS",
        "yearLevel": "2nd",
        "section": "B"
      },
      {
        "name": "Michael Johnson",
        "course": "BSIT",
        "yearLevel": "3rd",
        "section": "C"
      },
      {
        "name": "Emily Davis",
        "course": "BSCS",
        "yearLevel": "4th",
        "section": "D"
      },
      {
        "name": "Chris Brown",
        "course": "BSIT",
        "yearLevel": "2nd",
        "section": "A"
      },
      {
        "name": "Sarah Wilson",
        "course": "BSCS",
        "yearLevel": "1st",
        "section": "C"
      },
      {
        "name": "David Lee",
        "course": "BSIT",
        "yearLevel": "4th",
        "section": "B"
      },
      {
        "name": "Laura Martinez",
        "course": "BSCS",
        "yearLevel": "3rd",
        "section": "D"
      },
      {
        "name": "James Anderson",
        "course": "BSIT",
        "yearLevel": "1st",
        "section": "B"
      },
      {
        "name": "Sophia Rodriguez",
        "course": "BSCS",
        "yearLevel": "2nd",
        "section": "A"
      },
      {
        "name": "Matthew Harris",
        "course": "BSIT",
        "yearLevel": "3rd",
        "section": "D"
      },
      {
        "name": "Olivia Clark",
        "course": "BSCS",
        "yearLevel": "4th",
        "section": "C"
      },
      {
        "name": "Daniel King",
        "course": "BSIT",
        "yearLevel": "2nd",
        "section": "C"
      },
      {
        "name": "Emma Wright",
        "course": "BSCS",
        "yearLevel": "1st",
        "section": "D"
      },
      {
        "name": "Ethan Scott",
        "course": "BSIT",
        "yearLevel": "4th",
        "section": "A"
      },
      {
        "name": "Ava Green",
        "course": "BSCS",
        "yearLevel": "3rd",
        "section": "B"
      }
  ];
  
const StudentManagement: React.FC = () => {
//     const folders = [
//         { section: 'A', block: 1 },
//         { section: 'B', block: 1 },
//         { section: 'C', block: 1 },
//         { section: 'D', block: 1 },
//       ];

      return (
        <div className="bg-gray-300 h-svh max-h-max py-1">  
            <Header />  
            <div className="flex flex-col md:flex-row bg-background text-foreground mx-auto w-9/12 h-[700px]">                
               <Sidebar/>
                <main className="flex-1 mx-auto w-8/12 h-[700px] bg-green-700 bg-gradient-to-br from-emerald-600 ">                    
                    <div className="grid grid-cols-4 gap-4 h-[700px] p-6">
                        {/* <div className="grid grid-cols-1 auto-rows-auto h-[650px] gap-2 overflow-y-scroll scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100">
                            <div className="bg-gray-200 p-2 drop-shadow-lg">
                                <p className="text-black text-center m-2 hover:text-green-500 text-md font-semibold">COURSE:</p>
                                <div className="grid grid-cols-2 gap-0 justify-center">
                                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">BSIT</button>
                                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">BSCS</button>
                                </div>
                            </div>
                            <div className="bg-gray-200 p-2 drop-shadow-lg">
                                <p className="text-black text-center m-2 hover:text-green-500 text-md font-semibold">ACADEMIC YEAR:</p>
                                <div className="grid grid-rows-4 gap-0 justify-center">
                                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">2024-2025</button>
                                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">2025-2026</button>
                                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">2025-2026</button>
                                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">2025-2026</button>
                                </div>
                            </div>
                            <div className="bg-gray-200 p-2 drop-shadow-lg">
                                <p className="text-black text-center m-2 hover:text-green-500 text-md font-semibold">YEAR LEVEL:</p>
                                <div className="grid grid-rows-4 gap-0 justify-center"> 
                                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">First Year</button>
                                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Second Year</button>
                                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Third Year</button>
                                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Fourth Year</button>
                                </div>
                            </div>
                            <div className="bg-gray-200 p-2 drop-shadow-lg">
                                <p className="text-black text-center m-2 hover:text-green-500 text-md font-semibold">SECTION FOLDER:</p>
                                <div className="grid grid-cols-2 gap-0 justify-center"> 
                                {folders.map((folder) => (
                                    <div
                                        key={folder.section}
                                        className="flex flex-col items-center text-center cursor-pointer"
                                    >
                                        <button
                                            type="button" className={`flex items-center justify-center p-3 rounded-full  transition text-black`}>
                                            <FaFolder className="mr-3 h-12 w-12 text-green-700 hover:text-green-800" aria-hidden="true" />                                           
                                        </button>
                                        <span className="mt-1 text-xs font-semibold text-black">
                                            {folder.section}
                                        </span>
                                    </div>
                                    ))}
                                </div>
                            </div>                                
                        </div>        */}
                        <div className="col-span-4 bg-gray-100 p-2 overflow-y-scroll scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100">
                            <div className="container mx-auto p-4 drop-shadow-lg ">                
                                <CustomTableStudentList data={studentList} />
                            </div>
                        </div>                                 
                    </div>    
                </main>
            </div>            
        </div>        
      );
    };
    
export default StudentManagement;