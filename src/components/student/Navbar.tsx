import React, { useState } from 'react';
import { NavLink  } from 'react-router-dom';
const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>                 
        <nav className="mt-10 mb-5 ">             
          <div className="container mx-auto w-8/12 bg-green-700 bg-gradient-to-br from-emerald-600">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden px-2">
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
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-normal">         
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    <NavLink  to="/" className={({ isActive }) => 
                        isActive ? 'bg-green-400 text-white px-3 py-2 rounded-md text-sm font-medium' 
                                : 'text-gray-50 hover:bg-green-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                      }>
                      Home
                    </NavLink >
                    <NavLink  to="/portfolio/information" className={({ isActive }) => 
                        isActive ? 'bg-green-400 text-white px-3 py-2 rounded-md text-sm font-medium' 
                                : 'text-gray-50 hover:bg-green-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                      }>
                      Information
                    </NavLink >
                    <NavLink  to="/portfolio/skills" className={({ isActive }) => 
                        isActive ? 'bg-green-400 text-white px-3 py-2 rounded-md text-sm font-medium' 
                                : 'text-gray-50 hover:bg-green-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                      }>
                      
                      Skills
                    </NavLink >
                    <NavLink  to="/portfolio/certificationsandrecognitions" className={({ isActive }) => 
                        isActive ? 'bg-green-400 text-white px-3 py-2 rounded-md text-sm font-medium' 
                                : 'text-gray-50 hover:bg-green-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                      }>
                      Certiicates and Recognitions
                    </NavLink >
                    <NavLink  to="/portfolio/subjecttaken" className={({ isActive }) => 
                        isActive ? 'bg-green-400 text-white px-3 py-2 rounded-md text-sm font-medium' 
                                : 'text-gray-50 hover:bg-green-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                      }>
                      Subject Taken
                    </NavLink >
                    <NavLink  to="/portfolio/seminars" className={({ isActive }) => 
                        isActive ? 'bg-green-400 text-white px-3 py-2 rounded-md text-sm font-medium' 
                                : 'text-gray-50 hover:bg-green-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                      }>
                      Seminars
                    </NavLink >
                    <NavLink  to="/portfolio/careerpath" className={({ isActive }) => 
                        isActive ? 'bg-green-400 text-white px-3 py-2 rounded-md text-sm font-medium' 
                                : 'text-gray-50 hover:bg-green-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                      }>
                      Career Path
                    </NavLink >                      
                  </div>
                </div>
              </div>
            </div>
            {menuOpen && (
            <div className="sm:hidden px-2 pt-2 pb-3 space-y-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-green-400 text-white block px-3 py-2 rounded-md text-base font-medium'
                    : 'text-gray-50 hover:bg-green-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                }
              >
                Home2
              </NavLink>
              <NavLink
                to="/portfolio/information"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-green-400 text-white block px-3 py-2 rounded-md text-base font-medium'
                    : 'text-gray-50 hover:bg-green-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                }
              >
                Information
              </NavLink>
              <NavLink
                to="/portfolio/skills"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-green-400 text-white block px-3 py-2 rounded-md text-base font-medium'
                    : 'text-gray-50 hover:bg-green-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                }
              >
                Skills
              </NavLink>
              <NavLink
                to="/portfolio/certificationsandrecognitions"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-green-400 text-white block px-3 py-2 rounded-md text-base font-medium'
                    : 'text-gray-50 hover:bg-green-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                }
              >
                Certificates and Recognitions
              </NavLink>
              <NavLink
                to="/portfolio/subjecttaken"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-green-400 text-white block px-3 py-2 rounded-md text-base font-medium'
                    : 'text-gray-50 hover:bg-green-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                }
              >
                Subject Taken
              </NavLink>
              <NavLink
                to="/portfolio/seminars"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-green-400 text-white block px-3 py-2 rounded-md text-base font-medium'
                    : 'text-gray-50 hover:bg-green-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                }
              >
                Seminars
              </NavLink>
              <NavLink
                to="/portfolio/careerpath"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-green-400 text-white block px-3 py-2 rounded-md text-base font-medium'
                    : 'text-gray-50 hover:bg-green-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                }
              >
                Career Path
              </NavLink>
            </div>
          )}
          </div>
        </nav>   
    </div>
    
  );
}

export default Navbar;
