import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Header from './Header';
import SideNavbar from './SideNavbar';
import { StudentDetailModel } from '../../models/StudentDetailModel';
import axios from 'axios';
import { PiStudent } from "react-icons/pi";

const API_URL = "https://localhost:5050/api/Admin/GetStudentUsers";

const Student: React.FC = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [studentList, setStudentList] = useState<StudentDetailModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState<StudentDetailModel>({
                                                  id: 0,
                                                  studentId: '',
                                                  studentName: '',                                                  
                                                  course: '',
                                                  yearLevel: '',                                                  
                                                  yearStart: undefined,
                                                  yearEnd: undefined,
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
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||    
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

    // Handle page changes for pagination
    const handlePrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setPageNumber((prev) => Math.min(prev + 1, totalPages));
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
                  <div className="flex-1 mx-auto p-4 drop-shadow-lg ">
                    <div className="flex justify-between mb-4">                      
                      <button
                        onClick={openModal}
                        className="bg-emerald-700 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">
                        Add Student
                      </button>
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto scrollbar scrollbar-thumb-emerald-700 scrollbar-track-gray-100">
                        <div className="pb-4 bg-white dark:bg-gray-900">
                            <label htmlFor="table-search" className="sr-only">Search</label>
                            <div className="w-full relative p-4 mt-1">
                                <input 
                                    type="text" 
                                    id="table-search" 
                                    className="block pt-2 ps-3 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Search for students"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                            <div className="relative w-full max-w-full overflow-x-auto">
                                <table className="text-sm w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Student ID</th>
                                            <th scope="col" className="px-6 py-3">Student Name</th>                                            
                                            <th scope="col" className="px-6 py-3">Course</th>
                                            <th scope="col" className="px-6 py-3">Year Started</th>
                                            <th scope="col" className="px-6 py-3">Year Level</th>                                            
                                            <th scope="col" className="px-6 py-3">School Email</th>
                                            <th scope="col" className="px-6 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredStudents.length > 0 ? (
                                            filteredStudents.map(student => (
                                                <tr key={student.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <td className="px-6 py-4">{student.studentId}</td>
                                                    <td className="px-6 py-4">{student.studentName}</td>
                                                    <td className="px-6 py-4">{student.course}</td>
                                                    <td className="px-6 py-4">{student.yearStart}</td>
                                                    <td className="px-6 py-4">{student.schoolEmail}</td>
                                                    <td className="px-6 py-4">{student.yearLevel}</td>                                                    
                                                    <td className="px-6 py-4">
                                                        <a href={student.portfolioURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-500 hover:underline">View Portfolio</a>
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
                                {/* Pagination controls */}
                                <div className="flex flex-col items-end mt-5 mr-5">
                                    <span className="text-sm text-gray-700 dark:text-gray-400">
                                        Page {pageNumber} of {totalPages}
                                    </span>
                                    <div className="inline-flex mt-2 xs:mt-0">
                                        <button
                                            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            onClick={handlePrevPage}
                                            disabled={pageNumber === 1}>
                                            Prev
                                        </button>
                                        <button
                                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            onClick={handleNextPage}
                                            disabled={pageNumber === totalPages}>
                                            Next
                                        </button>
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
                    <div className="relative w-full max-w-lg md:max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700 overflow-auto">
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
                        <form>
                            <div className="flex flex-col p-4 space-x-4">
                                {/* Fillup Form Section */}                                
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
                                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Name</label>
                                        <input 
                                            type="text" 
                                            id="first_name" 
                                            value={newStudent.studentName}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder="First name" 
                                            required />
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <label htmlFor="yearStarted" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year Started</label>
                                            <input 
                                                type="text" 
                                                id="yearStarted" 
                                                value={newStudent?.course}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                placeholder="Year Started" 
                                                required />
                                        </div> 
                                        <div>
                                            <label htmlFor="yearLevel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year Level</label>
                                            <input 
                                                type="text" 
                                                id="yearLevel" 
                                                value={newStudent?.section}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                placeholder="Year Level"  />
                                        </div>   
                                    </div>                                                                             
                                    <div className="mb-6">
                                        <label htmlFor="school_email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">School email</label>
                                        <input 
                                            type="email" 
                                            id="school_email" 
                                            value={newStudent.schoolEmail}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder="juan.delacruz@school.com" 
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

export default Student;
