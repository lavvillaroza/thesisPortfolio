import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Header from './Header';
import SideNavbar from './SideNavbar';
import axios from 'axios';
import { PiStudent } from "react-icons/pi";
import courseLogo from '../../assets/compsci2.png';
import {CourseModel} from '../../models/CourseModel'
import { FaPlus } from 'react-icons/fa';

const API_URL = "https://localhost:5050/api/Course/GetAllCoursessAsync";

const Course: React.FC = () => {
  const [courseList, setCourseList] = useState<CourseModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState<CourseModel>({
                                                  id: 0,
                                                  courseName: '',
                                                  courseCode: '',                                                                                                    
                                                  totalUnits: 0,                                                  
                                                  courseLogo: ''});
  const [searchTerm, setSearchTerm] = useState<string>('');
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // Fetch student data from API
    const fetchCourses = async () => {
        try {
            const response = await axios.get<CourseModel[]>(API_URL);
            setCourseList(response.data); // Store the fetched data in state
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    };
    fetchCourses(); // Call the fetch function
  }, []); // Empty dependency array means this will run once when the component mounts

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCourse(prevCourse => ({ ...prevCourse, [name]: value}));
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCourses = courseList.filter(course =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||    
    course.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
  );
    
  return (
    <div className="flex p-4 md:flex md:flex-col bg-gray-100 py-2 min-h-screen min-w-screen w-full">
          <div className="flex-1 m-auto">
            <Header />
          <div className="flex flex-col md:flex-row bg-background text-foreground mx-auto w-full h-full md:h-[750px] overflow-y-auto scrollbar scrollbar-thumb-emerald-700 scrollbar-track-gray-100">
            <SideNavbar />
            <main className="font-roboto flex-1 w-full md:w-[1100px] md:h-full mx-auto h-full bg-emerald-700 bg-gradient-to-br from-emerald-600 rounded transition-all duration-200">
              <div className="h-[60px] p-4">
                <h5 className="mb-2 text-center text-3xl font-bold tracking-tight text-white dark:text-gray-900">STUDENT MANAGEMENT</h5>                                        
              </div> 
              <div className="flex flex-col-reverse md:flex-row gap-4 min-h-[660px] px-6">
                <div className="flex-auto w-full md:w-72 bg-gray-100 p-3 overflow-y-auto scrollbar scrollbar-thumb-emerald-700 scrollbar-track-gray-100 rounded transition-all duration-200">
                    <div className="overflow-y-auto scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100 h-[550px]">
                        <label htmlFor="table-search" className="sr-only">Search</label>
                        <div className="w-full relative p-4 mt-1 flex justify-between items-center">
                            <input 
                                type="text" 
                                id="table-search" 
                                className="block pt-2 ps-3 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Search for courses"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <button
                                onClick={openModal}
                                className="bg-emerald-700 hover:bg-emerald-800 text-white font-normal p-3 rounded-full transition duration-150 ease-in-out flex items-center justify-center"
                            >
                                <FaPlus className="w-5 h-5" />
                            </button>
                        </div>                  
                        <div className="w-full relative max-w-full overflow-x-auto">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full m-auto">
                                <div className="ml-4 w-full">
                                    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                        <div>
                                            <img 
                                                className="object-fill w-32 h-32 rounded-t-lg md:h-32 md:w-32 md:rounded-none md:rounded-s-lg" 
                                                src={courseLogo} 
                                                alt="Course logo"/>
                                        </div>
                                        <div className="flex flex-col justify-between p-4 leading-normal w-full">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">BSIT</h5>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Bachelor of Science in Information Technology</p>
                                        </div>
                                    </div>
                                </div>                                                                    
                            </div>                                      
                        </div>                                             
                    </div>                  
                </div>
              </div>
            </main>
          </div>

          {/* Add Student Modal */}
          {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-full bg-gray-800 bg-opacity-50">
                    <div className="relative w-full max-w-lg md:max-w-xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700 overflow-auto">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <PiStudent  className="w-6 h-6 text-gray-900 dark:text-white"/>
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">ADD COURSE</h3>
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={closeModal}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <form>
                            <div className="flex flex-col p-4 space-x-4">
                                {/* Fillup Form Section */}                                
                                <div className="grid gap-4 mb-6 md:grid-rows-1">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <label htmlFor="course_code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Code</label>
                                            <input 
                                                type="text" 
                                                id="course_code" 
                                                value={newCourse?.courseCode}
                                                onChange={handleInputChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                placeholder="Course Code" 
                                                required />
                                        </div>                                      
                                        <div>
                                            <label htmlFor="total_units" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Units</label>
                                            <input 
                                                type="number" 
                                                id="total_units" 
                                                value={newCourse.totalUnits}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                placeholder="Section"  />
                                        </div>   
                                    </div>        
                                    <div>
                                        <label htmlFor="course_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Name</label>
                                        <input 
                                            type="text" 
                                            id="course_name" 
                                            value={newCourse?.courseName}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder="Course Name" 
                                            required />
                                    </div>                                                          
                                    <div>
                                        <label htmlFor="course_logo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Logo</label>
                                        <input 
                                            type="text" 
                                            id="course_logo" 
                                            value={newCourse.courseLogo}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder="Course Logo" 
                                            required />
                                    </div>                                                                  
                                </div>                                                                                                                                                                            
                            </div>
                            {/* Modal footer */}
                            <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                <button 
                                    onClick={closeModal} 
                                    className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Close
                                </button>
                            </div>
                        </form> 
                    </div>
                </div>
            )}
        </div>    
    </div>
  );
};

export default Course;
