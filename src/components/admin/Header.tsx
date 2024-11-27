import React, { useEffect, useState } from 'react';
import profileSvg from '../../assets/adminIcon.png';
import { FaUser, FaLock, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import UserProfileModal from './modal/UserProfileModal';
import ChangePasswordModal from './modal/ChangePasswordModal';
import { checkTokenAndLogout } from '../../utils/jwtUtil';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
  const [isChangePasswordModalOpen, setIsChangePasswordModaOpen] = useState(false); // State to handle modal visibility
  const [userId, setUserId] = useState<number>(0);

  const navigate = useNavigate();
  
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const { logout } = useAuth();

  const handleLogout = () => logout();

  const openModal = () => {
    setIsModalOpen(true);
    setDropdownOpen(false); // Close dropdown when opening modal
  };

  const openChangePasswordModal = () => {
    console.log(userId);
    setIsChangePasswordModaOpen(true); 
    setDropdownOpen(false);   
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

useEffect(() => {
    loadUser();
  }, []);


  const closeModal = () => setIsModalOpen(false);
  const closeChangePasswordModal = () => setIsChangePasswordModaOpen(false);

  return (
    <header className="font-roboto">
      <div className="container mx-auto w-full">
        <div className="relative flex items-center justify-between h-28">
          <div className="origin-top-right absolute right-0 h-30 w-30 z-50">
            <div className="relative inline-block">
              <button
                onClick={toggleDropdown}
                type="button"
                className="inline-flex justify-center focus:outline-none hover:scale-110"
                id="menu-button"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <img
                  className="h-16 w-16 rounded-full border-2 border-gray-500"
                  src={profileSvg}
                  alt="Profile"
                />
              </button>
              {dropdownOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-gray-50 ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="py-1" role="none">
                    <div className="py-3 px-4">
                      <span className="block text-sm font-semibold text-gray-900">
                        My Account
                      </span>
                    </div>
                    <ul className="text-sm text-gray-700">
                      <li>
                        <button
                          onClick={openModal} // Open the modal on click
                          className="flex items-center w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                        >
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
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                    >
                      <FaSignOutAlt className="mr-3 h-4 w-4 text-gray-400" aria-hidden="true" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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

export default Header;
