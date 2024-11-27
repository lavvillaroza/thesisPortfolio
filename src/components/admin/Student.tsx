import React, { useCallback, useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Header from './Header';
import SideNavbar from './SideNavbar';
import { StudentDetailModel } from '../../models/StudentDetailModel';
import { PiStudent } from "react-icons/pi";
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { checkTokenAndLogout } from '../../utils/jwtUtil';
import { addStudent, fetchSearchStudents, fetchStudents } from '../../api/adminApi';
import { fetchCourses } from '../../api/courseApi';
import studentIcon from '../../assets/studentIcon.png';
import { CourseModel } from '../../models/CourseModel';
import CustomToast from '../common/CustomToast';
import { REACT_BASE_URL } from '../../api/apiConfig';

const initialStudentDetail: StudentDetailModel = {
    id: 0,
    userId: 0,
    studentId: '',
    studentName: '',                                                  
    courseId: 0,
    courseName: '',
    yearLevel: 0,                                                  
    yearStart: 0,
    yearEnd: null,
    section: '',
    schoolEmail: '',
    personalEmail: '',
    portfolioURL: '',
    attachedResume: '',
    attachedResumeFile: null,
    createdBy: '',
    createdDate: null,
    lastModifiedBy: '',
    lastModifiedDate: null
};

const Student: React.FC = () => {
    const [totalPages, setTotalPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState<number>(10);
    const [studentList, setStudentList] = useState<StudentDetailModel[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newStudentDetail, setNewStudentDetail] = useState<StudentDetailModel>(initialStudentDetail);
                                              
    const [searchValue, setSearchValue] = useState('');    
    const closeModal = () => setIsModalOpen(false);
    const navigate = useNavigate();

    const [showToast, setShowToast] = useState<boolean>(false); // For toast visibility
    const [toastMessage, setToastMessage] = useState<string>(''); // Toast message content
    const [toastType, setToastType] = useState<'success' | 'error'>('success'); // Toast type (success or error)    
    const [courses, setCourses] = useState<CourseModel[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>('');

    const [isClicked, setIsClicked] = useState(false);

    const openModal = () => {        
        setIsClicked(true);
        // Additional logic to open modal
        setTimeout(() => setIsClicked(false), 200); // Reset rotation after animation
        setIsModalOpen(true);
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const user = localStorage.getItem('userDetails');        
        if (user) {
            const userParse = JSON.parse(user);
            newStudentDetail.createdBy = userParse.username;
            newStudentDetail.lastModifiedBy = userParse.username;            
        } 
        const formData = new FormData();
        formData.append('studentId', newStudentDetail.studentId);
        formData.append('studentName', newStudentDetail.studentName);
        formData.append('courseId', newStudentDetail.courseId.toString());
        formData.append('yearLevel', newStudentDetail.yearLevel.toString());
        formData.append('yearStart', newStudentDetail.yearStart.toString());
        formData.append('yearEnded', '');
        formData.append('section', newStudentDetail.section);
        formData.append('schoolEmail', newStudentDetail.schoolEmail);
        formData.append('personalEmail', '');
        formData.append('portfolioURL', '');
        formData.append('createdBy', newStudentDetail.createdBy);
        formData.append('lastModifiedBy', newStudentDetail.lastModifiedBy);
        
        try {
            await addStudent(formData); // Call the new API function
            setToastMessage('Student added successfully!');
            setToastType('success');
            setShowToast(true);
            // Reset the form
            setNewStudentDetail(initialStudentDetail);
             // Close the modal
            closeModal();
            await fetchStudentsData('');
        } catch (error) {
            setToastMessage('Error adding student.');
            setToastType('error');
            setShowToast(true);
            console.error('Error adding student:', error);
        } finally {
            // Hide toast after 8 seconds
            setTimeout(() => {
                setShowToast(false);
            }, 8000);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewStudentDetail(prevStudent => ({ ...prevStudent, [name]: value}));
    };

    // Handler for the onChange event
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {        
        const { name, value } = e.target;
        setSelectedOption(value); // Update selected option state
        setNewStudentDetail(prevStudent => ({ ...prevStudent, [name]: value}));
    };    

    const handleSearchButtonClick = () => {
        fetchStudentsData(searchValue);
    };
    
    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);        
    };
 // Handle page changes for pagination
    const handlePrevPage = async () => {
        setPageNumber((prev) => Math.max(prev - 1, 1));        
    };

    const handleNextPage = async () => {
        setPageNumber((prev) => Math.min(prev + 1, totalPages));        
    };    
    
    // Function to fetch student data based on search value
    const fetchStudentsData = useCallback(async (searchTerm: string) => {
        if (checkTokenAndLogout()) {
            navigate("/");
            return;
        }        
        try {
            let result;
            if (searchTerm) {
                result = await fetchSearchStudents({ pageNumber, pageSize }, searchTerm);
            } else {
                result = await fetchStudents({ pageNumber, pageSize });
            }
            setStudentList(result.items);
            setTotalPages(result.totalPages);
        } catch (error) {
            console.error('Error fetching students data:', error);
        } 
    }, [navigate, pageNumber, pageSize]);
    

      // Trigger search whenever `searchValue` or `pageNumber` changes
    useEffect(() => {
        fetchStudentsData(''); // Call with empty string initially
    }, [fetchStudentsData, pageNumber]); // Add fetchStudentsData as a dependency
    
    useEffect(() => {
        const fetchCoursesData = async () => {
            try {
                const result = await fetchCourses();
                setCourses(result);
            } catch (error) {
                console.error('Error fetching courses data:', error);
            }
        };    
        fetchCoursesData();
    }, []); // Empty dependency array
    
    const getYearString = (year: number): string => {
        switch (year) {
          case 1:
            return '1st Year';
          case 2:
            return '2nd Year';
          case 3:
            return '3rd Year';
          case 4:
            return '4th Year';
          default:
            return `${year}th Year`;
        }
      };
    const handleOpenPortfolioUrl = (student: StudentDetailModel) => {        
        window.open(REACT_BASE_URL + 'portfolio/' + student.userId.toString() + '/information', '_blank'); // Opens in a new tab
    };
  return (
    <div className="flex p-4 md:flex md:flex-col bg-gray-100 py-2 min-h-screen min-w-screen w-full">
          <div className="flex-1 m-auto">
            <Header />
          <div className="flex flex-col md:flex-row bg-background text-foreground mx-auto w-full h-full md:h-[750px] overflow-y-auto scrollbar scrollbar-thumb-emerald-700 scrollbar-track-gray-100">
            <SideNavbar />
            <main className="font-roboto flex-1 w-full md:w-[1100px] md:h-full mx-auto h-full bg-emerald-700 bg-gradient-to-br from-emerald-600 rounded transition-all duration-200">
              <div className="h-[60px] p-4">
                <h5 className="mb-2 text-center text-3xl font-bold tracking-tight text-white ">STUDENTS</h5>                                        
              </div> 
              <div className="flex flex-col-reverse md:flex-row gap-4 min-h-[660px] px-6">
                <div className="flex-auto w-full md:w-72 bg-gray-100 p-3 overflow-y-auto  rounded transition-all duration-200">
                  <div className="flex-1 mx-auto p-4 drop-shadow-lg ">                    
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto scrollbar scrollbar-thumb-emerald-700 scrollbar-track-gray-100">
                        <div className="pb-4 bg-whiteh-[600px]">
                            <div className="w-full relative flex justify-between items-center">
                                <label htmlFor="searchValue" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                                <div className="relative ml-2 my-2 w-[400px]">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                    </div>
                                    <input type="search" 
                                        id="searchValue"
                                        name="searchValue"
                                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500  " 
                                        placeholder="Search for student name"
                                        value={searchValue}
                                        onChange={handleSearchInputChange}
                                        required />
                                    <button 
                                        onClick={handleSearchButtonClick} 
                                        className="text-white absolute end-2.5 bottom-2.5 bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-4 py-2 ">
                                            Search
                                    </button>
                                </div>                                
                                <div className="relative py-3 pr-2">
                                    <button
                                        onClick={openModal}
                                        className={`bg-emerald-700 hover:bg-emerald-800 text-white font-normal p-3 rounded-full transition duration-150 ease-in-out transform flex items-center justify-center
                                            ${isClicked ? 'rotate-45' : ''}
                                            hover:scale-110`}
                                    >
                                        <FaPlus className="w-3 h-3" />
                                    </button>   
                                </div>                                
                            </div>                            
                            <div className="relative w-full max-w-full overflow-x-auto">
                                <div className="w-full h-[430px] px-2">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 border border-gray-200">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                            <tr>                                                
                                                <th scope="col" className="px-6 py-3 border-b border-gray-200 bg-gray-100">Student Name</th>
                                                <th scope="col" className="px-6 py-3 border-b border-gray-200 bg-gray-100">Student ID</th>
                                                <th scope="col" className="px-6 py-3 border-b border-gray-200 bg-gray-100">Course</th>
                                                <th scope="col" className="px-6 py-3 border-b border-gray-200 bg-gray-100">Year Start</th>
                                                <th scope="col" className="px-6 py-3 border-b border-gray-200 bg-gray-100">Year Level</th>
                                                <th scope="col" className="px-6 py-3 border-b border-gray-200 bg-gray-100">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {studentList.length > 0 ? (
                                                    studentList.map(student => (
                                                        <tr key={student.id} className="bg-white border-b">
                                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                                                                <img className="w-10 h-10 rounded-full border border-gray-500" src={studentIcon} alt="Jese image"/>
                                                                <div className="ps-3">
                                                                    <div className="text-base font-semibold">{student.studentName}</div>
                                                                    <div className="font-normal text-gray-500">{student.schoolEmail}</div>
                                                                </div>  
                                                            </th>                                                                                                                
                                                            <td className="px-6 py-4">{student.studentId}</td>
                                                            <td className="px-6 py-4">{student.courseName}</td>
                                                            <td className="px-6 py-4">{student.yearStart}</td>
                                                            <td className="px-6 py-4">{getYearString(student.yearLevel)}</td>
                                                            <td className="px-6 py-4">
                                                                <button 
                                                                    onClick={() => handleOpenPortfolioUrl(student) } 
                                                                    className="text-blue-600  hover:underline">
                                                                    View Portfolio
                                                                </button>
                                                            </td>                                                    
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr className="bg-white border-b hover:bg-gray-50 ">
                                                        <td colSpan={7} className="text-center px-6 py-4">No data available.</td>
                                                    </tr>
                                                )}
                                        </tbody>
                                    </table>  
                                </div>                               
                            </div>      
                             {/* Pagination controls */}
                             <div className="relative flex flex-col items-end mt-5 mr-5">
                                <span className="text-sm text-gray-700">
                                    Page {pageNumber} of {totalPages}
                                </span>
                                <div className="inline-flex mt-2 xs:mt-0">
                                    <button
                                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
                                        onClick={handlePrevPage}
                                        disabled={pageNumber === 1}>
                                        Prev
                                    </button>
                                    <button
                                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
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
            </main>
          </div>

          {/* Add Student Modal */}
          {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-full bg-gray-800 bg-opacity-50">
                    <div className="relative w-full max-w-lg md:max-w-2xl max-h-full bg-white rounded-lg shadow overflow-auto">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 border-b rounded-t ">
                            <PiStudent  className="w-6 h-6 text-gray-900"/>
                            <h3 className="text-xl font-medium text-gray-900">ADD STUDENT</h3>
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center "
                                onClick={closeModal}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col p-4 space-x-4">
                                {/* Fillup Form Section */}                                
                                <div className="grid gap-4 mb-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="studentId" className="block mb-2 text-sm font-medium text-gray-900">Student id</label>
                                        <input 
                                            type="text" 
                                            id="studentId" 
                                            name="studentId"
                                            value={newStudentDetail.studentId}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                                            placeholder="Student id" 
                                            required />
                                    </div>  
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <label htmlFor="courseId" className="block mb-2 text-sm font-medium text-gray-900">Course</label>
                                            <input 
                                                hidden
                                                type="text"
                                                id="courseId"
                                                name="courseId"
                                                value={newStudentDetail.courseId}>
                                            </input>
                                            <select                                                 
                                                value={selectedOption}                                                
                                                onChange={handleSelectChange}
                                                name="courseId"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                                required>
                                                <option selected>Course</option>
                                                {courses.map((course) => (
                                                        <option key={course.id} value={course.id}>{course.courseCode}</option>                                                        
                                                ))}                                                
                                            </select>                                            
                                        </div> 
                                        <div>
                                            <label htmlFor="section" className="block mb-2 text-sm font-medium text-gray-900">Section</label>
                                            <input 
                                                type="text" 
                                                id="section" 
                                                name="section"
                                                value={newStudentDetail.section}
                                                onChange={handleInputChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                                                placeholder="Section"  />
                                        </div>   
                                    </div>                                                                        
                                    <div>
                                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Student Name</label>
                                        <input 
                                            type="text" 
                                            id="studentName" 
                                            name="studentName"
                                            value={newStudentDetail.studentName}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                                            placeholder="Student Name" 
                                            required />
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <label htmlFor="yearStart" className="block mb-2 text-sm font-medium text-gray-900">Year Started</label>
                                            <input 
                                                type="text" 
                                                id="yearStart" 
                                                name="yearStart"
                                                value={newStudentDetail.yearStart}
                                                onChange={handleInputChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                                                placeholder="Year Start" 
                                                required />
                                        </div> 
                                        <div>
                                            <label htmlFor="yearLevel" className="block mb-2 text-sm font-medium text-gray-900">Year Level</label>
                                            <input 
                                                type="number" 
                                                id="yearLevel" 
                                                name="yearLevel"
                                                value={newStudentDetail.yearLevel}
                                                onChange={handleInputChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                                                placeholder="Year Level"  
                                                required/>
                                        </div>   
                                    </div>                                                                             
                                    <div className="mb-6">
                                        <label htmlFor="school_email" className="block mb-2 text-sm font-medium text-gray-900">School email</label>
                                        <input 
                                            type="email" 
                                            id="schoolEmail" 
                                            name="schoolEmail"
                                            value={newStudentDetail.schoolEmail}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                                            placeholder="juan.delacruz@school.com" 
                                            required />
                                    </div>                                
                                </div>                                                                                                                                                                            
                            </div>
                            {/* Modal footer */}
                            <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b ">
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
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

            {/* Toast notification */}
            {showToast && (
                <CustomToast
                message={toastMessage}
                type={toastType}
                onClose={() => setShowToast(false)}
                />
            )}
        </div>    
    </div>
  );
};

export default Student;
