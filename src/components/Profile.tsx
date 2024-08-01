import React, { useState } from 'react';
import profileSvg from '../assets/avatar-profile-user.svg';
import { FaBriefcase, FaUser } from 'react-icons/fa6';
import { FaSignOutAlt } from 'react-icons/fa';

const Profile: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const profileData = {
    name: 'Salamanca, Hurry John L.',
    studentNo: '21-00904',
    course: 'Bachelor Of Science Information Technology',
    year: '3rd Year'
  };

  return (
    <div className="container mx-auto w-8/12 min-h-[120px] max-h-auto bg-green-700 rounded-xl bg-gradient-to-br from-emerald-600"> 
        <div className="relative ...">
            <div className="absolute top-0 left-0 mt-2">
                <div className="absolute top-0 left-0 flex items-center sm:hidden px-2">
                    {/* Mobile menu button*/}                
                    <button 
                    onClick={toggleMenu}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-50 hover:text-white hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {menuOpen ? (
                    <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                    ) : (
                    <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                    )}
                    </button>                
                </div>
                   
                {menuOpen && (
                    <div className="sm:hidden px-2 pt-2 pb-3 space-y-1">
                        <div className='grid grid-rows-4 px-4'>                               
                            <label className='text-sm font-medium leading-6 text-white'>Student No: {profileData.studentNo}</label>
                            <label className='text-sm font-medium leading-6 text-white'>Name: {profileData.name}</label> 
                            <label className='text-sm font-medium leading-6 text-white'>Course: {profileData.course}</label>                    
                            <label className='text-sm font-medium leading-6 text-white'>Year: {profileData.year}</label>           
                        </div>
                    </div>
                )}       
                <div className="hidden sm:block sm:ml-6">
                    <div className='grid grid-rows-4 px-4'>                               
                        <label className='text-sm font-medium leading-6 text-white'>Student No: {profileData.studentNo}</label>
                        <label className='text-sm font-medium leading-6 text-white'>Name: {profileData.name}</label> 
                        <label className='text-sm font-medium leading-6 text-white'>Course: {profileData.course}</label>                    
                        <label className='text-sm font-medium leading-6 text-white'>Year: {profileData.year}</label>           
                    </div>
                </div>                                           
            </div>
            <div className="origin-top-right absolute right-0 h-20 w-20 mr-5 z-50">            
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
                                        <a href="/portfolio/information" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900">
                                            <FaBriefcase className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            My Portfolio
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/profile/update" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900">
                                            <FaUser className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            My Profile                                    
                                        </a>
                                    </li>                        
                                </ul>
                                <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" />
                                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900">
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
  );
};

export default Profile;