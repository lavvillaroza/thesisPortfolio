import React from 'react';
import NavHeader from './NavHeader';
import { FaPlus } from 'react-icons/fa';

const Seminars: React.FC = () => {            
  return (
      <div className="font-roboto flex p-4 md:flex md:flex-col bg-gray-100 py-2 min-h-screen min-w-screen w-full">
        <div className="flex-1 m-auto">
            <NavHeader />                
            <div className="flex flex-col md:flex-col bg-background text-foreground mx-auto w-full h-full md:h-[750px] overflow-y-auto scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100">                     
                <main className="flex-1 w-full md:w-[1100px] md:h-full mx-auto h-full bg-green-700 bg-gradient-to-br from-emerald-600 rounded transition-all duration-200">                        
                    <div className="flex flex-col-reverse md:flex-row gap-4 min-h-[720px] px-6 pt-10">
                        <div className="flex-auto w-full md:w-72 bg-gray-100 p-1 overflow-y-auto scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100 rounded transition-all duration-200">
                          <div className="p-4">                                          
                            <div className="p-4 w-12/12 m-auto mx-2 my-2 h-[620px] bg-white drop-shadow-md rounded-lg overflow-auto">
                              <div className="pb-2 bg-white dark:bg-gray-900 h-[600px] md:h-full">
                                  <div className="w-full relative flex justify-between items-center">
                                        <div className="mb-4 ">
                                        <label className="text-gray-700 text-left mx-2 text-2xl">SEMINARS ATTENDED</label>                                        
                                        </div>
                                        <div className="relative py-3 pr-2">
                                          <button
                                              //onClick={openModal}
                                              className="bg-emerald-700 hover:bg-emerald-800 text-white font-normal p-3 rounded-full transition duration-150 ease-in-out flex items-center justify-center">
                                              <FaPlus className="w-3 h-3" />
                                          </button>   
                                      </div>                                
                                  </div>                            
                                  <div className="relative w-full max-w-full">
                                      <div className="w-full h-[450px] px-2 md:h-full">
                                          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-200 overflow-y-auto scrollbar scrollbar-thumb-emerald-700 scrollbar-track-gray-100 rounded transition-all duration-200">
                                              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                  <tr>                                                
                                                      <th scope="col" className="px-4 py-2 border-b border-gray-200 bg-gray-100">Title</th>
                                                      <th scope="col" className="px-4 py-2 border-b border-gray-200 bg-gray-100">Facilitator</th>
                                                      <th scope="col" className="px-4 py-2 border-b border-gray-200 bg-gray-100">Date Time</th>                                                      
                                                      <th scope="col" className="px-4 py-2 border-b border-gray-200 bg-gray-100">Reflection</th>                                                      
                                                      <th scope="col" className="px-4 py-2 border-b border-gray-200 bg-gray-100">Action</th>
                                                  </tr>
                                              </thead>
                                              <tbody>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <td colSpan={7} className="text-center px-6 py-4">No data available.</td>
                                                </tr>                                              
                                              </tbody>
                                          </table>  
                                      </div>                               
                                  </div>                                                               
                              </div>  
                            </div>                                
                          </div>  
                        </div>                            
                    </div>
                </main>                  
            </div>
        </div>
    </div> 
    )
};

export default Seminars;