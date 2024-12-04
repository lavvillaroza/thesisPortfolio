import React, { useEffect, useState } from 'react';
import profileSvg from '../../assets/adminIcon.png';
import { FaUser, FaLock, FaSignOutAlt} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import {  NavLink, useNavigate } from 'react-router-dom';
import schoolLogo from '../../assets/pasigIcon.jpg';
import UserProfileModal from './modal/UserProfileModal';
import { checkTokenAndLogout } from '../../utils/jwtUtil';
import ChangePasswordModal from './modal/ChangePasswordModal';

const NavHeader: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
  const [isChangePasswordModalOpen, setIsChangePasswordModaOpen] = useState(false); // State to handle modal visibility
  const [userId, setUserId] = useState<number>(0);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const openChangePasswordModal = () => {
    console.log(userId);
    setIsChangePasswordModaOpen(true); 
    setDropdownOpen(false);   
  };

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  const openModal = () => {
    setIsModalOpen(true);
    setDropdownOpen(false); // Close dropdown when opening modal
  };
  
  const loadUser = async () => {
    try {          
        if (checkTokenAndLogout()) {
          navigate("/");
          return;
        }
        const user = localStorage.getItem('userDetails');        
        if (user) {
            const userParse = JSON.parse(user);   
            setUserId(userParse.userid);              
        } 
        else {
          navigate("/");
        }
    } catch (error) {
        console.error('Error fetching course data:', error);
    }
  };

  const closeModal = () => setIsModalOpen(false);
  const closeChangePasswordModal = () => setIsChangePasswordModaOpen(false);
  
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <header>
      <nav className="bg-emerald-600 bg-gradient-to-br from-emerald-600 border-gray-200 px-4 lg:px-6 py-2.5 my-2 rounded h-[80px] bg-opacity-50">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">            
            <img src={schoolLogo} className="mr-3 h-9 sm:h-12 rounded-full object-scale-down" alt="Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Student Portfolio</span>
          </a>

          <div className="flex items-center lg:order-2">
            <div className="relative inline-block">
              <button
                onClick={toggleDropdown}
                type="button"
                className="flex items-center text-sm font-medium text-gray-50 rounded-full hover:scale-110"
                id="menu-button"
                aria-expanded={dropdownOpen}
                aria-haspopup="true">
                <span className="sr-only">Open user menu</span>
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-50 mr-2">
                    <img className="w-10 h-10 me-2 rounded-full" src={profileSvg} alt="Profile" />
                </div>                
              </button>
              {dropdownOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-gray-50 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button">
                  <div className="px-4 py-3 text-sm text-gray-900 ">
                      <span className="block text-sm font-semibold text-gray-900">
                        My Account
                      </span>
                  </div>
                  <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" />
                  <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownUserAvatarButton">                    
                    <li>
                      <button
                          onClick={openModal} // Open the modal on click
                          className="flex items-center w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900">
                          <FaUser className="mr-3 h-3 w-3 text-gray-400" aria-hidden="true" />
                          My Profile
                      </button>                      
                    </li>
                    <li>
                        <button
                          onClick={openChangePasswordModal} // Open the modal on click
                          className="flex items-center w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                        >
                          <FaLock className="mr-3 h-3 w-3 text-gray-400" aria-hidden="true" />
                          Change Password
                        </button>        
                    </li>
                  </ul>
                  <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" />
                  <a href="#" onClick={handleLogout} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900">
                    <FaSignOutAlt className="mr-3 h-4 w-4 text-gray-400" aria-hidden="true" />
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                    <NavLink  to="/student/announcement" className={({ isActive }) => 
                        isActive ? 'block py-2 pr-4 pl-3 text-yellow-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0' 
                                : 'block py-2 pr-4 pl-3 text-gray-50 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0'
                      }>
                      Home
                    </NavLink >
              </li>
              <li>
                    <NavLink  to="/student/information" className={({ isActive }) => 
                        isActive ? 'block py-2 pr-4 pl-3 text-yellow-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0' 
                                : 'block py-2 pr-4 pl-3 text-gray-50 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0'
                      }>
                      Information
                    </NavLink >                                
              </li>
              <li>                
                    <NavLink  to="/student/skills" className={({ isActive }) => 
                        isActive ? 'block py-2 pr-4 pl-3 text-yellow-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0' 
                                : 'block py-2 pr-4 pl-3 text-gray-50 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0'
                      }>
                      Skills
                    </NavLink >                                                
              </li>
              <li>
                    <NavLink  to="/student/certifications" className={({ isActive }) => 
                        isActive ? 'block py-2 pr-4 pl-3 text-yellow-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0' 
                                : 'block py-2 pr-4 pl-3 text-gray-50 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0'
                      }>
                      Certificates & Recognitions
                    </NavLink >                 
              </li>
              <li>
                    <NavLink  to="/student/subjectstaken" className={({ isActive }) => 
                        isActive ? 'block py-2 pr-4 pl-3 text-yellow-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0' 
                                : 'block py-2 pr-4 pl-3 text-gray-50 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0'
                      }>
                      Subjects
                    </NavLink >                 
              </li>
              <li>
                    <NavLink  to="/student/seminars" className={({ isActive }) => 
                        isActive ? 'block py-2 pr-4 pl-3 text-yellow-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0' 
                                : 'block py-2 pr-4 pl-3 text-gray-50 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0'
                      }>
                      Seminars
                    </NavLink >                  
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Render the UserProfileModal */}
      {isModalOpen && (
        <UserProfileModal          
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}

      {/* Render the ChangePassword */}
      {isChangePasswordModalOpen && (
        <ChangePasswordModal  
          userId={userId}
          isOpen={isChangePasswordModalOpen}
          onClose={closeChangePasswordModal}
          />
      )}
      
    </header>
  );
};

export default NavHeader;
