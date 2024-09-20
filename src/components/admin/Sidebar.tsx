// Sidebar.tsx
import React from 'react';
import schoolLogo from '../../assets/pasigIcon.jpg';
import { NavLink  } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-full md:w-[300px] h-full bg-green-700 bg-gradient-to-br from-emerald-600 p-4 mr-2">
      {/* Admin Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-36 h-36 bg-gray-300 rounded-full mb-2 overflow-hidden">
            <img src={schoolLogo} alt="" className="w-full h-full object-cover" />
        </div>
        <span className="text-lg font-semibold text-gray-50">ADMIN</span>
      </div>
      {/* Menu Items */}
      <nav className="flex flex-col space-y-4 w-full">
        <NavLink  to="/admin/*" className={({ isActive }) => 
                        isActive ? 'w-full py-2 text-center bg-gray-50 text-red-500 font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2' 
                                : 'w-full py-2 text-center bg-gray-50 text-black font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2'
                      }>
                      HOME
                    </NavLink >
        <NavLink  to="/admin/studentlist" className={({ isActive }) => 
            isActive ? 'w-full py-2 text-center bg-gray-50 text-red-500 font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2' 
                    : 'w-full py-2 text-center bg-gray-50 text-black font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2'
            }>
            MANAGE / VIEW STUDENTS ACCOUNTS
        </NavLink >
        <NavLink  to="/admin/seminarattendedlist" className={({ isActive }) => 
            isActive ? 'w-full py-2 text-center bg-gray-50 text-red-500 font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2' 
                    : 'w-full py-2 text-center bg-gray-50 text-black font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2'
            }>
            SEMINAR ATTENDED LISTS
        </NavLink >
        <NavLink  to="/admin/createseminarandanouncement" className={({ isActive }) => 
            isActive ? 'w-full py-2 text-center bg-gray-50 text-red-500 font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2' 
                    : 'w-full py-2 text-center bg-gray-50 text-black font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2'
            }>
            CREATE ANNOUNCEMENTS / SEMINARS
        </NavLink >
        {/* <NavLink  to="/admin/curriculum" className={({ isActive }) => 
            isActive ? 'w-full py-2 text-center bg-gray-50 text-red-500 font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2' 
                    : 'w-full py-2 text-center bg-gray-50 text-black font-semibold rounded hover:text-green-500 text-sm h-[50px] px-2'
            }>
            ADD CURRICULUM
        </NavLink >         */}
      </nav>
    </aside>
  );
};

export default Sidebar;