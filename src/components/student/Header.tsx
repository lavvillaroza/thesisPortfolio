import React, { useState } from 'react';
import profileSvg from '../../assets/avatar-profile-user.svg';
import { FaBriefcase, FaUser, FaBars } from 'react-icons/fa6';
import { FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [detailsVisible, setDetailsVisible] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const toggleDetails = () => setDetailsVisible(!detailsVisible);

    const profileData = {
        name: 'Salamanca, Hurry John L.',
        studentNo: '21-00904',
        course: 'Bachelor Of Science Information Technology',
        year: '3rd Year'
    };

    const { logout } = useAuth();
    const handleLogout = () => logout();

    return (
        <header className="mt-5">
            <div className="container mx-auto rounded-xl bg-green-700 bg-gradient-to-br from-emerald-600 w-8/12">
                <div className={`relative flex items-center justify-between  ${detailsVisible ? 'h- auto py-4' : 'h-28'}`}>
                    <div className="absolute top-0 left-0 mt-2 ml-2 w-3/4">
                        {/* Hamburger Icon for Mobile */}
                        <button
                            onClick={toggleDetails}
                            className="sm:hidden text-white p-2"
                            aria-label="Toggle details"
                        >
                            <FaBars className="h-6 w-6" />
                        </button>

                        {/* Student Details (visible on large screens or when toggled on mobile) */}
                        {(detailsVisible || window.innerWidth >= 640) && (
                            <div className="pt-2 sm:block">
                                <div className="grid grid-rows-4 grid-cols-2 gap-2">
                                    <div className="flex flex-col items-start">
                                        <label className="text-md font-medium leading-5 text-white text-ellipsis overflow-hidden whitespace-nowrap">
                                            Name: {profileData.name}
                                        </label>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <label className="text-md font-medium leading-5 text-white text-ellipsis overflow-hidden whitespace-nowrap">
                                            Student No: {profileData.studentNo}
                                        </label>
                                    </div>
                                    <div className="flex flex-col col-span-2 items-start">
                                        <label className="text-md font-medium leading-5 text-white text-ellipsis overflow-hidden whitespace-nowrap">
                                            Course: {profileData.course}
                                        </label>
                                    </div>
                                    <div className="flex flex-col col-span-2 items-start">
                                        <label className="text-md font-medium leading-5 text-white text-ellipsis overflow-hidden whitespace-nowrap">
                                            Year: {profileData.year}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="origin-top-right absolute right-0 h-30 w-20 mr-5 z-50">
                        <div className="relative inline-block">
                            <button
                                onClick={toggleDropdown}
                                type="button"
                                className="inline-flex justify-center focus:outline-none"
                                aria-expanded={dropdownOpen}
                                aria-haspopup="true"
                            >
                                <img
                                    className="h-24 w-24 rounded-full"
                                    src={profileSvg}
                                    alt="Profile"
                                />
                            </button>

                            {dropdownOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-gray-50 ring-1 ring-black ring-opacity-5"
                                    role="menu"
                                >
                                    <ul className="text-sm text-gray-700">
                                        <li>
                                            <Link to="/student/information" className="flex items-center px-4 py-2 hover:bg-gray-200">
                                                <FaBriefcase className="mr-3 h-5 w-5 text-gray-400" />
                                                My Portfolio
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/student/update" className="flex items-center px-4 py-2 hover:bg-gray-200">
                                                <FaUser className="mr-3 h-5 w-5 text-gray-400" />
                                                My Profile
                                            </Link>
                                        </li>
                                    </ul>
                                    <div className="h-0 my-2 border border-solid border-gray-900 opacity-25" />
                                    <a
                                        href="#"
                                        onClick={handleLogout}
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                                    >
                                        <FaSignOutAlt className="mr-3 h-5 w-5 text-gray-400" />
                                        Sign out
                                    </a>
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
