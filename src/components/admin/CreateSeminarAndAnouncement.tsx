import React from 'react';

import 'react-calendar/dist/Calendar.css';
import Header from './Header';
import Sidebar from './Sidebar';



import CustomCalendar from '../common/CustomCalendar';

const CreateSeminarAndAnouncement: React.FC = () => {    
      return (
        <div className="flex flex-col bg-gray-300 py-2 min-h-screen w-full ">
            <div className="flex-1 m-auto">
                <Header />  
                <div className="flex flex-col md:flex-row bg-background text-foreground mx-auto w-9/12 h-[700px]">                
                    <Sidebar/>
                    <main className="flex-1 mx-auto w-8/12 h-full bg-green-700 bg-gradient-to-br from-emerald-600 ">                        
                        <div className="h-[60px] p-4">
                            <p className="text-gray-50 text-center m-2 hover:text-green-500 text-2xl">ADD SEMINAR OR ANNOUNCEMENT</p>
                        </div> 
                        <div className="grid grid-cols-3 gap-4 h-[600px] p-6">
                            <div className="col-span-2 bg-gray-100 p-4 h-full overflow-auto w-full" >                                
                                <form>
                                    <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-1">
                                        <div>
                                            <label htmlFor="first_name" className="block mb-2 text-lg font-bold text-gray-900 dark:text-white">Subject/Title</label>
                                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Subject/Title" required />
                                        </div>
                                        
                                        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                            <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                                <label htmlFor="message" className="block mb-2 text-md font-bold text-gray-900 dark:text-white">Description</label>
                                                <textarea id="comment" rows={12} className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a description..." required ></textarea>
                                            </div>
                                            <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                                <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-green-900 hover:bg-green-800">
                                                    Send
                                                </button>
                                                <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">  
                                                    <input className="hidden" id="file_input" type="file"></input>                                          
                                                    <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                                            </svg>
                                                        <span className="sr-only">Upload image</span>                                                        
                                                    </button>
                                                </div>
                                            </div>    
                                        </div>                                                                                                                                                           
                                    </div>                                                                    
                                </form>                                
                            </div>
                            <div className="bg-gray-200 p-2 h-full">                                
                                <div className="p-1 w-11/12 m-4 mt-10 h-50 drop-shadow-md">
                                    <CustomCalendar />
                                </div>                                                                    
                                <div className="p-1 w-11/12 m-4 h-50 drop-shadow-md">
                                    <label htmlFor="start-time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start time:</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                                            </svg>
                                        </div>
                                        <input type="time" id="start-time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="09:00" max="18:00" value="00:00" required />
                                    </div>
                                </div>
                                <div className="p-1 w-11/12 m-4 h-50 drop-shadow-md">
                                    <label htmlFor="end-time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End time:</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                                            </svg>
                                        </div>
                                        <input type="time" id="end-time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="09:00" max="18:00" value="00:00" required />
                                    </div>
                                </div>
                            </div>     
                        </div>   
                    </main>
                </div>            
            </div>
            
        </div>        
      );
    };
    
export default CreateSeminarAndAnouncement;