import React, { useState } from 'react';
import profileSvg from '../../assets/avatar-profile-user.svg';
import { FaBriefcase, FaUser } from 'react-icons/fa6';
import { FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import 'flowbite';

const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const profileData = {
    name: 'Salamanca, Hurry John L.',
    studentNo: '21-00904',
    course: 'Bachelor Of Science Information Technology',
    year: '3rd Year'
  };

  const { logout } = useAuth(); // Destructure the logout function from useAuth

  // Handler function to call logout
  const handleLogout = () => {
      logout(); // Call the logout function from AuthContext
  };

  return (
    <header className="mt-5">  
        <div className='container mx-auto  rounded-xl bg-green-700 bg-gradient-to-br from-emerald-600 w-8/12'>
            <div className="relative flex items-center justify-between h-28">
                <div className="absolute top-0 left-0 mt-2 ml-2 w-3/4">
                    {/*</div><div className="hidden sm:block sm:ml-6">*/}
                    <div className="sm:block sm:ml-6 pt-2">
                        
                        {/* <div className='grid grid-rows-4 px-4'>                               
                            <label className='text-sm font-medium leading-6 text-white'>Student No: {profileData.studentNo}</label>
                            <label className='text-sm font-medium leading-6 text-white'>Name: {profileData.name}</label> 
                            <label className='text-sm font-medium leading-6 text-white'>Course: {profileData.course}</label>                    
                            <label className='text-sm font-medium leading-6 text-white'>Year: {profileData.year}</label>           
                        </div> */}
                        <div className='grid grid-rows-4 grid-cols-2 gap-2'>                                                          
                            <div className='flex flex-col items-start justify-center'>
                                <label className='text-md font-medium leading-5 text-white text-ellipsis overflow-hidden whitespace-nowrap'>Name: {profileData.name}</label> 
                            </div>
                            <div className='flex flex-col items-start justify-center'>
                                <label className='text-md font-medium leading-5 text-white text-ellipsis overflow-hidden whitespace-nowrap'>Student No: {profileData.studentNo}</label>
                            </div>                          
                            <div className='flex flex-col col-span-2 items-start justify-center'>
                                <label className='text-md font-medium leading-5 text-white text-ellipsis overflow-hidden whitespace-nowrap'>Course: {profileData.course}</label>                    
                            </div>
                            <div className='flex flex-col col-span-2  items-start justify-center'>
                                <label className='text-md font-medium leading-5 text-white text-ellipsis overflow-hidden whitespace-nowrap'>Year: {profileData.year}</label>           
                            </div>
                        </div>                                                
                    </div>                                           
                </div>
                <div className="origin-top-right absolute right-0 h-30 w-20 mr-5 z-50">            
                    <div className="relative inline-block">                
                        <div>
                            <button
                                onClick={toggleDropdown}
                                type="button"
                                className="inline-flex justify-center focus:outline-none "
                                id="menu-button"
                                aria-expanded={dropdownOpen}
                                aria-haspopup="true">
                                <img
                                    className="h-24 w-24 rounded-full"
                                    src={profileSvg}
                                    alt="Profile"/>
                                <svg
                                    className="ml-2 h-5 w-5 text-gray-700"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true">
                                    <path
                                    fillRule="evenodd"
                                    d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"/>
                                </svg>
                            </button>
                        </div>
                        {dropdownOpen && (
                            <div
                            className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-gray-50 ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button">
                                <div className="py-1" role="none">
                                    <ul className="text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                                        <li>
                                            <Link
                                                to="/student/information"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                                                >
                                                <FaBriefcase className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                My Portfolio
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/student/update"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                                                >
                                                <FaUser className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                My Profile
                                            </Link>                                            
                                        </li>                        
                                    </ul>
                                    <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" />
                                    <a href="#" onClick={handleLogout} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900">
                                        <FaSignOutAlt className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                        Sign out
                                    </a>
                                    
                                </div>
                            </div>
                        )}
                    </div>
                </div>  
            </div>
        </div>                        
    </header>              
  );
};

export default Header;