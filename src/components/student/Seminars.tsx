import React from 'react';
import Profile from './Profile';
import Navbar from './Navbar';
import {  FaPlusCircle } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';

const seminarsData = [
    { title: 'Cyber Security Essentials', date: '07/28/2024', reflection: 'reflection', status: 0},
    { title: 'Web Development Fundamentals Seminar', date: '08/10/2024', reflection: '', status: 1},        
  ];
const Seminars: React.FC = () => {
  return (
    <>
      <div className="bg-gray-200 h-svh py-6">  
        <Profile />           
        <Navbar />
        <div className="container mx-auto w-8/12 h-[600px] bg-green-700 bg-gradient-to-br from-emerald-600">        
            <div className="h-[60px] p-4">
                <div className="mb-4 ">
                    <label className="text-gray-50 text-left mx-2 hover:text-green-700 text-2xl">SEMINARS ATTENDED</label>          
                    <button                        
                        className=" hover:bg-emerald-900 text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline ">          
                        <FaPlusCircle/>
                    </button>
                </div>                 
                <div  className='p-4 w-full m-auto h-[500px] bg-white drop-shadow-md rounded-lg overflow-auto col-span-3'>                  
                    <div className="container mx-auto p-4">                                        
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                            <tr>
                                <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-600 text-sm uppercase font-semibold">Title</th>
                                <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-600 text-sm uppercase font-semibold">Date</th>
                                <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-600 text-sm uppercase font-semibold">Status</th> 
                                <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left text-gray-600 text-sm uppercase font-semibold">Reflection</th>
                                                           
                            </tr>
                            </thead>
                            <tbody>
                                {seminarsData.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-2 px-4 text-gray-700">{item.title}</td>
                                    <td className="py-2 px-4 text-gray-700">{item.date}</td>                                    
                                    <td className="py-2 px-4 text-gray-700">
                                        {item.status === 0 ? (
                                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                            Missed
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Attended
                                            </span>
                                        )}</td>                                
                                    <td className="py-2 px-4 text-gray-700">  
                                        <div className='flex items-start'>
                                            <div className='flex items-end'>
                                                <a
                                                    href="#"                                        
                                                    className="text-blue-700 font-bold py-2 px-2">
                                                    <FaEye /> 
                                                </a>                                                 
                                            </div>                                            
                                        </div>                                                                                                          
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>                    
                    </div>
                </div>  
            </div>
        </div>  
          
      </div>
    </>  
    )
};

export default Seminars;