import React, { useState } from 'react';
import profileSvg from '../../assets/avatar-profile-user.svg';
import { FaBriefcase, FaUser } from 'react-icons/fa6';
import { FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import schoolLogo from '../../assets/pasigIcon.jpg';

const HeaderDefault: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const { logout } = useAuth(); // Destructure the logout function from useAuth

  // Handler function to call logout
  const handleLogout = () => {
      logout(); // Call the logout function from AuthContext
  };

//   const [menuOpen, setMenuOpen] = useState(false);
//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

  return (
    <header className="mt-1">  
        <div className='container mx-auto w-10/12 h-[120px]'>
            <div className="relative flex items-center justify-between h-28">
                <div className="w-30 h-32 rounded-full overflow-hidden">
                    <img src={schoolLogo} alt="" className="w-full h-full object-cover"/>
                </div>        
                <div className="origin-top-right absolute right-12 h-30 w-20 mr-5">            
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
                                
                            </button>
                        </div>
                        {dropdownOpen && (
                            <div
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-50 ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button">
                                <div className="py-1" role="none">
                                    <ul className="text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                                        <li>
                                            <a href="/portfolio/information" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900">
                                                <FaBriefcase className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                Manage E-Portfolio
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/profile/update" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900">
                                                <FaUser className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                Manage Profile                                    
                                            </a>
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

export default HeaderDefault;