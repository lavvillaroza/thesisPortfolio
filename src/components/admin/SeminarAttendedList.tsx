import React from 'react';

import 'react-calendar/dist/Calendar.css';
import Header from './Header';
import Sidebar from './Sidebar';
import { FaFolder } from 'react-icons/fa';
import CustomTableSeminarList from '../common/CustomTableSeminarList';

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
const SeminarAttendedList: React.FC = () => {
        const folders = [
        { Name: 'Cyberseurity Essentials Seminar'},
        { Name: "Web Development Fundamentals Seminar"},
        { Name: "Software Architecture Seminar"},
        { Name: "Cloud Engineer Seminar"},
      ];
      return (
        <div className="flex flex-col bg-gray-300 py-2 min-h-screen w-full ">
            <div className="flex-1 m-auto">
                <Header />  
                <div className="flex flex-col md:flex-row bg-background text-foreground mx-auto w-full h-[700px]">                
                    <Sidebar/>
                    <main className="flex-1 mx-auto w-8/12 h-full bg-green-700 bg-gradient-to-br from-emerald-600 ">
                        <div className="h-[60px] p-4">
                            <p className="text-gray-50 text-center m-2 hover:text-green-500 text-2xl">SEMINAR ATTENDED LIST</p>
                        </div> 
                        <div className="grid grid-cols-4 gap-4 h-[600px] p-6">
                            <div className="grid grid-cols-1 auto-rows-auto h-[550px] gap-2 overflow-y-scroll scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100">                            
                                <div className="bg-gray-200 p-2 drop-shadow-lg">                                
                                    <div className="grid grid-cols-2 gap-0 justify-center"> 
                                    {folders.map((folder) => (
                                        <div
                                            key={folder.Name}
                                            className="flex flex-col items-center text-center cursor-pointer"
                                        >
                                            <button
                                                type="button" className={`flex items-center justify-center p-3 rounded-full  transition text-black`}>
                                                <FaFolder className="mr-3 h-12 w-12 text-green-700 hover:text-green-800" aria-hidden="true" />                                           
                                            </button>
                                            <span className="mt-1 text-xs font-semibold text-black">
                                                {folder.Name}
                                            </span>
                                        </div>
                                        ))}
                                    </div>
                                </div>                                
                            </div>    
                            <div className="col-span-3 h-[550px]  bg-gray-100 p-2 overflow-y-scroll scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100">
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
    
export default SeminarAttendedList;