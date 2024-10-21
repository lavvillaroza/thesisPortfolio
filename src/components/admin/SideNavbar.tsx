import React, { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi'; // Icons for hamburger and close
import { NavLink } from 'react-router-dom';
import schoolLogo from '../../assets/pasigIcon.jpg';

const SideNavbar: React.FC = () => {
  // State to control mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);

   // Function to toggle the mobile dropdown
   const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <>
      {/* Desktop Sidebar (Visible on md and above) */}
      <aside className="hidden md:flex flex-col bg-gradient-to-b from-emerald-600 to-green-700 text-white w-80 p-4 mr-2">
       {/* Admin Profile Section */}
        <div className="flex flex-col items-center mb-6">
            <div className="w-36 h-36 bg-gray-300 rounded-full mb-2 overflow-hidden">
                <img src={schoolLogo} alt="" className="w-full h-full object-cover" />
            </div>
            <span className="text-lg font-semibold text-gray-50">HI ADMIN</span>
        </div>

       {/* Menu Items */}
        <nav className="flex flex-col space-y-4 w-full">
            <NavLink  to="/admin" className={({ isActive }) => 
                            isActive ? 'w-full py-2 text-center bg-gray-50 text-red-500 font-semibold rounded hover:text-green-500 hover:text-lg text-sm h-[50px] px-2' 
                                    : 'w-full py-2 text-center bg-gray-50 text-black font-semibold rounded hover:text-green-500 hover:text-lg text-sm h-[50px] px-2 '
                        }>
                        ANNOUNCEMENT
            </NavLink >
            <NavLink  to="/admin/addanouncement" className={({ isActive }) => 
                isActive ? 'w-full py-2 text-center bg-gray-50 text-red-500 font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2' 
                        : 'w-full py-2 text-center bg-gray-50 text-black font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2'
                }>
                CREATE ANNOUNCEMENT
            </NavLink >
            <NavLink  to="/admin/student" className={({ isActive }) => 
                isActive ? 'w-full py-2 text-center bg-gray-50 text-red-500 font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2' 
                        : 'w-full py-2 text-center bg-gray-50 text-black font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2'
                }>
                MANAGE STUDENT ACCOUNT
            </NavLink >
            <NavLink  to="/admin/seminarattended" className={({ isActive }) => 
                isActive ? 'w-full py-2 text-center bg-gray-50 text-red-500 font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2' 
                        : 'w-full py-2 text-center bg-gray-50 text-black font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2'
                }>
                MANAGE SEMINAR ATTENDED
            </NavLink >           
            <NavLink  to="/admin/curriculum" className={({ isActive }) => 
                isActive ? 'w-full py-2 text-center bg-gray-50 text-red-500 font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2' 
                        : 'w-full py-2 text-center bg-gray-50 text-black font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2'
                }>
                MANAGE SUBJECT
            </NavLink >       
            <NavLink  to="/admin/curriculum" className={({ isActive }) => 
                isActive ? 'w-full py-2 text-center bg-gray-50 text-red-500 font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2' 
                        : 'w-full py-2 text-center bg-gray-50 text-black font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2'
                }>
                MANAGE COURSE
            </NavLink >     
        </nav>
      </aside>

       {/* Mobile Header and Dropdown Menu */}
        <div className="md:hidden">
            <div className="p-4 bg-gradient-to-b from-emerald-600 to-green-700 text-white flex justify-between items-center">
            <span className="text-lg font-bold">HI ADMIN</span>
            <button onClick={toggleDropdown} className="focus:outline-none">
                {/* Toggle between hamburger and close icons */}
                {isOpen ? <HiX className="w-8 h-8" /> : <HiMenu className="w-8 h-8" />}
            </button>
            </div>
        
          {/* Mobile Dropdown Menu */}
            {isOpen && (
            <div className="bg-gradient-to-b from-emerald-600 bg-green-700 text-white p-4">
                <nav className="flex flex-col space-y-3">
                    <NavLink  to="/admin" className={({ isActive }) => 
                                    isActive ? 'w-full py-2 text-center bg-gray-50 text-red-500 font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2' 
                                            : 'w-full py-2 text-center bg-gray-50 text-black font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2'
                                }>
                                ANNOUNCEMENT
                    </NavLink >
                    <NavLink  to="/admin/addanouncement" className={({ isActive }) => 
                        isActive ? 'w-full py-2 text-center bg-gray-50 text-red-500 font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2' 
                                : 'w-full py-2 text-center bg-gray-50 text-black font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2'
                        }>
                        CREATE ANNOUNCEMENT
                    </NavLink >
                    <NavLink  to="/admin/student" className={({ isActive }) => 
                        isActive ? 'w-full py-2 text-center bg-gray-50 text-red-500 font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2' 
                                : 'w-full py-2 text-center bg-gray-50 text-black font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2'
                        }>
                        MANAGE STUDENT ACCOUNT
                    </NavLink >
                    <NavLink  to="/admin/seminarattended" className={({ isActive }) => 
                        isActive ? 'w-full py-2 text-center bg-gray-50 text-red-500 font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2' 
                                : 'w-full py-2 text-center bg-gray-50 text-black font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2'
                        }>
                        MANAGE SEMINAR ATTENDED
                    </NavLink >                    
                    <NavLink  to="/admin/curriculum" className={({ isActive }) => 
                        isActive ? 'w-full py-2 text-center bg-gray-50 text-red-500 font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2' 
                                : 'w-full py-2 text-center bg-gray-50 text-black font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2'
                        }>
                        MANAGE SUBJECT
                    </NavLink > 
                    <NavLink  to="/admin/curriculum" className={({ isActive }) => 
                        isActive ? 'w-full py-2 text-center bg-gray-50 text-red-500 font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2' 
                                : 'w-full py-2 text-center bg-gray-50 text-black font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2'
                        }>
                        MANAGE COURSE
                    </NavLink >   
                </nav>
            </div>
            )}          
        </div>
    </>
  );
};

export default SideNavbar;
