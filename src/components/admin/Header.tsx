import React, { useState } from 'react';
import profileSvg from '../../assets/avatar-profile-user.svg';
import { FaUser } from 'react-icons/fa6';
import { FaLock, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const HeaderNew: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const { logout } = useAuth(); // Destructure the logout function from useAuth

  // Handler function to call logout
  const handleLogout = () => {
      logout(); // Call the logout function from AuthContext
  };

  return (
    <header className="font-roboto">  
        <div className='container mx-auto w-full'>
            <div className="relative flex items-center justify-between h-28">                
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
                                    <div className="py-3 px-4">
                                        <span className="block text-sm font-semibold text-gray-900 dark:text-white">                                        
                                            My Account</span>
                                    </div>
                                    <ul className="text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">                                        
                                        <li>
                                            <a href="/profile/update" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900">
                                                <FaUser className="mr-3 h-3 w-3 text-gray-400" aria-hidden="true" />
                                                My Profile                                    
                                            </a>
                                        </li> 
                                        <li>
                                            <a href="/profile/update" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900">
                                                <FaLock className="mr-3 h-3 w-3 text-gray-400" aria-hidden="true" />
                                                Change Password                                   
                                            </a>
                                        </li>                           
                                    </ul>
                                    <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" />
                                    <a href="#" onClick={handleLogout} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900">
                                        <FaSignOutAlt className="mr-3 h-4 w-4 text-gray-400" aria-hidden="true" />
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

export default HeaderNew;