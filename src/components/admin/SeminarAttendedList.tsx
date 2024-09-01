import React from 'react';

import 'react-calendar/dist/Calendar.css';
import Header from './Header';
import Sidebar from './Sidebar';
import CustomCalendar from '../common/CustomCalendar';


const SeminarAttendedList: React.FC = () => {
      return (
        <div className="flex flex-col bg-gray-300 py-2 min-h-screen w-full ">
            <div className="flex-1 m-auto">
                <Header />  
                <div className="flex flex-col md:flex-row bg-background text-foreground mx-auto w-9/12 h-[700px]">                
                    <Sidebar/>
                    <main className="flex-1 mx-auto w-8/12 h-full bg-green-700 bg-gradient-to-br from-emerald-600 ">
                        <div className="h-[60px] p-4">
                            <p className="text-gray-50 text-center m-2 hover:text-green-500 text-2xl">SEMINAR ATTENDED LIST</p>
                        </div> 
                        <div className="grid grid-cols-2 gap-4 h-[600px] p-6">
                            <div className="bg-gray-100 p-2 h-full">
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
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Read more</a>                
                                    </div>
                                </div>              
                                </div>
                            </div>   
                            <div className="bg-gray-200 p-2 h-full">
                                <div className="p-1 w-11/12 m-4 mt-10 h-50 drop-shadow-md">
                                    <CustomCalendar />
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