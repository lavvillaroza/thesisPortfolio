import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Header from './Header';
import SideNavbar from './SideNavbar';
import { StudentDetailModel } from '../models/StudentDetailModel';
import axios from 'axios';
import { PiStudent } from "react-icons/pi";

const API_URL = "https://localhost:5050/api/Admin/GetStudentUsers";

const StudentManagement: React.FC = () => {
  const [studentList, setStudentList] = useState<StudentDetailModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState<StudentDetailModel>({
                                                  id: 0,
                                                  studentId: '',
                                                  firstName: '',
                                                  middleName: '',
                                                  lastName: '',
                                                  course: '',
                                                  yearLevel: '',
                                                  section: '',
                                                  schoolEmail: '',
                                                  personalEmail: '',
                                                  portfolioURL: '',
                                                  profilePicture: ''
                                              });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // Fetch student data from API
    const fetchStudents = async () => {
        try {
            const response = await axios.get<StudentDetailModel[]>(API_URL);
            setStudentList(response.data); // Store the fetched data in state
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    };
    fetchStudents(); // Call the fetch function
  }, []); // Empty dependency array means this will run once when the component mounts

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewStudent(prevStudent => ({ ...prevStudent, [name]: value}));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = studentList.filter(student =>
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="flex p-4 md:flex md:flex-col bg-gray-100 py-2 min-h-screen min-w-screen w-full">
          <div className="flex-1 m-auto">
            <Header />
          <div className="flex flex-col md:flex-row bg-background text-foreground mx-auto w-full h-full md:h-[730px] overflow-y-auto scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100">
            <SideNavbar />
            <main className="flex-1 w-full md:w-[1100px] md:h-full mx-auto h-full bg-green-700 bg-gradient-to-br from-emerald-600">
              <div className="h-[60px] p-4">
                <p className="text-gray-50 text-center m-2 hover:text-3xl text-2xl">STUDENT MANAGEMENT</p>
              </div> 
              <div className="grid grid-cols-3 gap-4 h-[600px] p-6">
                <div className="col-span-3 bg-gray-100 p-2 h-full">
                  <div className="flex-1 mx-auto p-4 drop-shadow-lg ">
                    <div className="flex justify-between mb-4">                      
                      <button
                        onClick={openModal}
                        className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                      >
                        Add Student
                      </button>
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <div className="pb-4 bg-white dark:bg-gray-900">
                            <label htmlFor="table-search" className="sr-only">Search</label>
                            <div className="relative p-4 mt-1">
                                <input 
                                    type="text" 
                                    id="table-search" 
                                    className="block pt-2 ps-3 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Search for students"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Student ID</th>
                                        <th scope="col" className="px-6 py-3">First Name</th>
                                        <th scope="col" className="px-6 py-3">Middle Name</th>
                                        <th scope="col" className="px-6 py-3">Last Name</th>
                                        <th scope="col" className="px-6 py-3">Course</th>
                                        <th scope="col" className="px-6 py-3">Portfolio URL</th>
                                        <th scope="col" className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents.length > 0 ? (
                                        filteredStudents.map(student => (
                                            <tr key={student.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="px-6 py-4">{student.studentId}</td>
                                                <td className="px-6 py-4">{student.firstName}</td>
                                                <td className="px-6 py-4">{student.middleName}</td>
                                                <td className="px-6 py-4">{student.lastName}</td>
                                                <td className="px-6 py-4">{student.course}</td>
                                                <td className="px-6 py-4">
                                                    <a href={student.portfolioURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-500 hover:underline">View Portfolio</a>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <a href={`/students/${student.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View Details</a>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td colSpan={7} className="text-center px-6 py-4">No data available.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
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
                    <div className="relative w-full max-w-xl my-5 md:max-w-xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <PiStudent  className="w-6 h-6 text-gray-900 dark:text-white"/>
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">ADD STUDENT</h3>
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
                        <div className="flex flex-col p-4 space-x-4">
                            {/* Fillup Form Section */}
                            <form>
                              <div className="grid gap-4 mb-6 md:grid-cols-2">
                                  <div>
                                      <label htmlFor="student_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student id</label>
                                      <input 
                                          type="text" 
                                          id="student_id" 
                                          value={newStudent?.studentId}
                                          onChange={handleInputChange}
                                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                          placeholder="Student id" 
                                          required />
                                  </div>  
                                  <div className="grid gap-4 md:grid-cols-2">
                                      <div>
                                          <label htmlFor="course" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course</label>
                                          <input 
                                              type="text" 
                                              id="course" 
                                              value={newStudent?.course}
                                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                              placeholder="Course" 
                                              required />
                                      </div> 
                                      <div>
                                          <label htmlFor="section" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section</label>
                                          <input 
                                              type="text" 
                                              id="section" 
                                              value={newStudent?.section}
                                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                              placeholder="Section"  />
                                      </div>   
                                  </div>                                                                        
                                  <div>
                                      <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                      <input 
                                          type="text" 
                                          id="first_name" 
                                          value={newStudent?.firstName}
                                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                          placeholder="First name" 
                                          required />
                                  </div>
                                  <div>
                                      <label htmlFor="middle_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Middle name</label>
                                      <input 
                                          type="text" 
                                          id="middle_name" 
                                          value={newStudent?.middleName}
                                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                          placeholder="Middle name" />
                                  </div>
                                  <div>
                                      <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                      <input 
                                          type="text" 
                                          id="last_name" 
                                          value={newStudent?.lastName}
                                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                          placeholder="Last name" 
                                          required />
                                  </div>   
                                  <div>
                                      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                                      <input 
                                          type="tel" 
                                          id="phone" 
                                          value={newStudent?.lastName}
                                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                          placeholder="09-1234-567-890" pattern="[0-9]{2}-[0-9]{4}-[0-9]{3}-[0-9]{3}"
                                          required />
                                  </div>                                  
                              </div>
                              <div className="grid gap-4 md:grid-cols-2">
                                  <div className="mb-6">
                                      <label htmlFor="school_email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">School email</label>
                                      <input 
                                          type="email" 
                                          id="school_email" 
                                          value={newStudent?.schoolEmail}
                                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                          placeholder="juan.delacruz@school.com" 
                                          required />
                                  </div> 
                                  <div className="mb-6">
                                      <label htmlFor="personal_email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Personal email</label>
                                      <input 
                                          type="email" 
                                          id="personal_email" 
                                          value={newStudent?.personalEmail}
                                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                          placeholder="juan.cruz@personal.com" 
                                          required />
                                  </div>    
                              </div>                                                                                       
                          </form>                            
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
                    </div>
                </div>
            )}
        </div>    
    </div>
  );
};

export default StudentManagement;
