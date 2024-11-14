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
      <aside className="font-roboto h-[90%] hidden md:flex flex-col bg-gradient-to-b from-emerald-500 to-emerald-700 text-white w-80 p-4 mr-2 rounded transition-all duration-200">
        {/* Admin Profile Section */}
        <div className="flex flex-col items-center mb-6 hover:shadow-lg hover:bg-emerald-500 p-2 rounded transition-all duration-200">
                <div className="w-36 h-36 bg-gray-300 rounded-full mb-2 overflow-hidden">
                    <img src={schoolLogo} alt="Admin" className="w-full h-full object-cover" />
                </div>
                <span className="text-lg font-semibold text-gray-50">HI ADMIN</span>
            </div>
        {/* Divider */}
            <div className="border-t border-gray-200 my-2" />
        {/* Menu Items */}
            <nav className="font-roboto flex flex-col space-y-4 w-full ">
                <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                        `w-full py-2 flex items-center justify-center hover:shadow-lg bg-gray-50 font-semibold rounded transition-all duration-200 hover:scale-105 ${
                        isActive ? "text-red-500 hover:text-emerald-500" : "text-black hover:text-emerald-500"
                        }`
                    }>
                    Announcements
                </NavLink>
                <NavLink  to="/admin/addanouncement" 
                    className={({ isActive }) =>
                        `w-full py-2 flex items-center justify-center bg-gray-50 font-semibold rounded transition-all duration-200 hover:scale-105 ${
                        isActive ? "text-red-500 hover:text-green-500" : "text-black hover:text-green-500"
                        }`
                    }>
                    Create Announcement
                </NavLink >
                <NavLink  to="/admin/student" 
                    className={({ isActive }) =>
                        `w-full py-2 flex items-center justify-center bg-gray-50 font-semibold rounded transition-all duration-200 hover:scale-105 ${
                        isActive ? "text-red-500 hover:text-green-500" : "text-black hover:text-green-500"
                        }`
                    }>
                    Students Account
                </NavLink >
                <NavLink  to="/admin/seminar" 
                    className={({ isActive }) =>
                        `w-full py-2 flex items-center justify-center bg-gray-50 font-semibold rounded transition-all duration-200 hover:scale-105 ${
                        isActive ? "text-red-500 hover:text-green-500" : "text-black hover:text-green-500"
                        }`
                    }>
                    Seminars Attendance
                </NavLink >                       
                <NavLink  to="/admin/subject" 
                    className={({ isActive }) =>
                        `w-full py-2 flex items-center justify-center bg-gray-50 font-semibold rounded transition-all duration-200 hover:scale-105 ${
                        isActive ? "text-red-500 hover:text-green-500" : "text-black hover:text-green-500"
                        }`
                    }>
                    Subjects
                </NavLink >       
                <NavLink  to="/admin/course" 
                    className={({ isActive }) =>
                        `w-full py-2 flex items-center justify-center bg-gray-50 font-semibold rounded transition-all duration-200 hover:scale-105 ${
                        isActive ? "text-red-500 hover:text-green-500" : "text-black hover:text-green-500"
                        }`
                    }>
                    Courses
                </NavLink >     
            </nav>
      </aside>
       {/* Mobile Header and Dropdown Menu */}
        <div className="font-roboto md:hidden">
            <div className="p-4 bg-gradient-to-b from-emerald-600 to-emerald-700 text-white flex justify-between items-center">
            <span className="text-lg font-bold">HI ADMIN</span>
            <button onClick={toggleDropdown} className="focus:outline-none">
                {/* Toggle between hamburger and close icons */}
                {isOpen ? <HiX className="w-8 h-8" /> : <HiMenu className="w-8 h-8" />}
            </button>
            </div>
        
          {/* Mobile Dropdown Menu */}
            {isOpen && (
            <div className="bg-gradient-to-b from-emerald-600 bg-emerald-700 text-white p-4">
                <nav className="flex flex-col space-y-3">
                    <NavLink  to="/admin" 
                                className={({ isActive }) =>
                                    `w-full py-2 flex items-center justify-center hover:shadow-lg bg-gray-50 font-semibold rounded transition-all duration-200 hover:scale-95 ${
                                    isActive ? "text-red-500 hover:text-emerald-500" : "text-black hover:text-emerald-500"
                                    }`
                                }>
                                Announcements
                    </NavLink >
                    <NavLink  to="/admin/addanouncement" 
                        className={({ isActive }) =>
                            `w-full py-2 flex items-center justify-center hover:shadow-lg bg-gray-50 font-semibold rounded transition-all duration-200 hover:scale-95 ${
                            isActive ? "text-red-500 hover:text-emerald-500" : "text-black hover:text-emerald-500"
                            }`
                        }>
                        Create Announcement
                    </NavLink >
                    <NavLink  to="/admin/student" 
                            className={({ isActive }) =>
                                `w-full py-2 flex items-center justify-center hover:shadow-lg bg-gray-50 font-semibold rounded transition-all duration-200 hover:scale-95 ${
                                isActive ? "text-red-500 hover:text-emerald-500" : "text-black hover:text-emerald-500"
                                }`
                        }>
                        Students Account
                    </NavLink >
                    <NavLink  to="/admin/seminar" 
                        className={({ isActive }) =>
                            `w-full py-2 flex items-center justify-center hover:shadow-lg bg-gray-50 font-semibold rounded transition-all duration-200 hover:scale-95 ${
                            isActive ? "text-red-500 hover:text-emerald-500" : "text-black hover:text-emerald-500"
                            }`
                        }>
                        Seminars Attendance
                    </NavLink >                    
                    <NavLink  to="/admin/subject" 
                        className={({ isActive }) =>
                            `w-full py-2 flex items-center justify-center hover:shadow-lg bg-gray-50 font-semibold rounded transition-all duration-200 hover:scale-95 ${
                            isActive ? "text-red-500 hover:text-emerald-500" : "text-black hover:text-emerald-500"
                            }`
                        }>
                        Subjects
                    </NavLink > 
                    <NavLink  to="/admin/course" 
                        className={({ isActive }) =>
                            `w-full py-2 flex items-center justify-center hover:shadow-lg bg-gray-50 font-semibold rounded transition-all duration-200 hover:scale-95 ${
                            isActive ? "text-red-500 hover:text-emerald-500" : "text-black hover:text-emerald-500"
                            }`
                        }>
                        Courses
                    </NavLink >   
                </nav>
            </div>
            )}          
        </div>
    </>
  );
};

export default SideNavbar;
