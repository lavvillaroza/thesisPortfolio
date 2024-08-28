import React, { useState } from 'react';
import Profile from './Profile';
import Navbar from './Navbar';
import { FaPenAlt } from 'react-icons/fa';
import LargeModal from '../common/LargeModal';

const initialAboutMe = "I'm currently an implementation developer at a fintech startup called Nest Wealth where I help customize our codebase to fit new client needs. Advocating for diversity and inclusion is something that's very important to me, and thankfully I've found a workplace that helps support that mission.";

const Information: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aboutMe, setAboutMe] = useState(initialAboutMe);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAboutMe = () => {
    if ( aboutMe.trim()) {            
      closeModal();
    }
  };

  return (
  <>
    <div className="bg-gray-200 h-svh py-6">  
      <Profile />  
      <Navbar />
      <div className="container mx-auto w-8/12 h-[600px] bg-green-700 bg-gradient-to-br from-emerald-600 ">        
        <div className="h-[60px] p-4">
          <label className="text-gray-50 text-left m-2 hover:text-green-700 text-2xl">PERSONAL INFORMATION</label>          
        </div>  
        <div className="h-[60px] p-4 ">
          
          <div className="mb-4 ">
          <label className="text-gray-50 text-left mx-2 hover:text-green-700 text-2xl">About Me</label> 
            <button
              onClick={openModal}
              className=" hover:bg-emerald-900 text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline "
            >          
              <FaPenAlt/>
            </button>
          </div>  
          <div className="p-4 w-12/12 m-auto mx-2 my-2 h-[400px] bg-white drop-shadow-md rounded-lg overflow-auto">              
              <p className='text-wrap text-lg text-justify'>
                {aboutMe}
              </p>              
            </div>
        </div>  
      </div>
      <LargeModal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-2xl font-bold mb-4">Update About Me</h2>        
          <textarea
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
            placeholder="Enter Description"
            rows={4}
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleAboutMe}
              className="mt-4 bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Save
            </button>
          </div>        
        </LargeModal>
    </div>
  </>  
  )
};

export default  Information;