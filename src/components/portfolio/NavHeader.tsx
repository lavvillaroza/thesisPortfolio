import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import schoolLogo from '../../assets/pasigIcon.jpg';

const NavHeader: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); // Get `userId` from route parameters     
  
  return (
    <header>
      <nav className="bg-emerald-600 bg-opacity-50 bg-gradient-to-br from-emerald-600 border-gray-200 px-4 lg:px-6 py-2.5 my-2 rounded h-[80px] ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">            
            <img src={schoolLogo} className="mr-3 h-9 sm:h-12 rounded-full object-scale-down" alt="Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Student Portfolio</span>
          </a>          

          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">              
              <li>
                    <NavLink  to={`/portfolio/${userId}/information`} className={({ isActive }) => 
                        isActive ? 'block py-2 pr-4 pl-3 text-yellow-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0' 
                                : 'block py-2 pr-4 pl-3 text-gray-50 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0'
                      }>
                      Information
                    </NavLink >                                
              </li>
              <li>                
                    <NavLink  to={`/portfolio/${userId}/skills`} className={({ isActive }) => 
                        isActive ? 'block py-2 pr-4 pl-3 text-yellow-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0' 
                                : 'block py-2 pr-4 pl-3 text-gray-50 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0'
                      }>
                      Skills
                    </NavLink >                                                
              </li>
              <li>
                    <NavLink  to={`/portfolio/${userId}/certifications`} className={({ isActive }) => 
                        isActive ? 'block py-2 pr-4 pl-3 text-yellow-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0' 
                                : 'block py-2 pr-4 pl-3 text-gray-50 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0'
                      }>
                      Certificates & Recognitions
                    </NavLink >                 
              </li>
              <li>
                    <NavLink  to={`/portfolio/${userId}/subjectstaken`} className={({ isActive }) => 
                        isActive ? 'block py-2 pr-4 pl-3 text-yellow-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0' 
                                : 'block py-2 pr-4 pl-3 text-gray-50 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0'
                      }>
                      Subjects
                    </NavLink >                 
              </li>
              <li>
                    <NavLink  to={`/portfolio/${userId}/seminars`} className={({ isActive }) => 
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
    </header>
  );
};

export default NavHeader;
