import React from 'react';
import Profile from './Profile';
import courseLogo from '../../assets/compsci2.png';
import CustomCalendar from '../common/CustomCalendar';

const Announcement: React.FC = () => {
  return (
    <div className="bg-gray-200 h-svh py-6">   
      <div className="flex border-solid border-2 border-indigo-600 m-auto w-11/12 ...">
        <div className="absolute top-0 left-0 h-36 w-36 mr-5">
            <div className="w-36 h-36 rounded-full overflow-ellipsis bg-gray-50 m-4 ml-20 ">
                <img src={courseLogo} alt="" className="w-full h-full object-cover" />
            </div>              
        </div>                               
        <Profile />
      </div>
      <div className="container mx-auto w-8/12 h-[700px] bg-green-700 bg-gradient-to-br from-emerald-600 mt-10">        
        <div className="h-[60px] p-4">
          <p className="text-gray-50 text-center m-2 hover:text-green-500 text-2xl">ANNOUNCEMENT</p>          
        </div>          
        <div className="grid grid-cols-3 gap-4 h-4/5 p-4">
          <div className="col-span-2 bg-gray-200 p-2 ">
            <p className="text-black text-left m-2 hover:text-green-500 text-2xl">ON THIS DATE:</p>
            <div className="p-4 w-11/12 m-auto mt-10 h-50 bg-white drop-shadow-md">
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
            <div className="p-4 w-11/12 m-auto mt-10 h-50 bg-white drop-shadow-md">
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
          <div className="bg-gray-200 p-2">
            <div className="m-auto">
              <CustomCalendar />
            </div>            
          </div>            
        </div>                      
      </div>          
    </div>
  );  
};

export default Announcement;