import React from 'react';
import Profile from './Profile';
import Navbar from './Navbar';

const CareerPath: React.FC = () => {
  return (
    <>
      <div className="bg-gray-200 h-svh py-6">  
        <Profile /> 
        <Navbar />
        <div className="container mx-auto w-8/12 h-[600px] bg-green-700 bg-gradient-to-br from-emerald-600">        
          <div className="h-[60px] p-4">
            <label className="text-gray-50 text-left m-2 hover:text-green-700 text-2xl">CAREER PATH</label>          
          </div>  
        </div>
      </div>
    </>  
    )
};

export default CareerPath;