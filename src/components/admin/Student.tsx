import React, { useCallback, useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Header from './Header';
import SideNavbar from './SideNavbar';
import { StudentDetailModel } from '../../models/StudentDetailModel';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { checkTokenAndLogout } from '../../utils/jwtUtil';
import { fetchSearchStudents, fetchStudents } from '../../api/adminApi';
import studentIcon from '../../assets/studentIcon.png';
import CustomToast from '../common/CustomToast';
import { REACT_BASE_URL } from '../../api/apiConfig';
import AddStudentModal from './modal/AddStudentModal';

const Student: React.FC = () => {
    const [totalPages, setTotalPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState<number>(10);
    const [studentList, setStudentList] = useState<StudentDetailModel[]>([]);    
    const [userId, setUserId] = useState();
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');        
    const navigate = useNavigate();

    const [showToast, setShowToast] = useState<boolean>(false); // For toast visibility
    const [toastMessage, setToastMessage] = useState<string>(''); // Toast message content
    const [toastType, setToastType] = useState<'success' | 'error'>('success'); // Toast type (success or error)        

    const [isClicked, setIsClicked] = useState(false);

    const openModal = () => {        
        setIsClicked(true);
        // Additional logic to open modal
        setTimeout(() => setIsClicked(false), 200); // Reset rotation after animation
        setAddModalOpen(true);
    };    

    const handleSave = (message: string, type: 'success' | 'error') => {
        if (type === 'success') {
            setToastMessage(message);
            setToastType(type);            
        } else {
            console.log("Error:", message);
            setToastMessage(message);
            setToastType(type);      
        }        
        fetchStudentsData('');
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 5000);
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
        const user = localStorage.getItem('userDetails');        
        if (user) {
            const userParse = JSON.parse(user);   
            setUserId(userParse.username);         
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
          {userId && (
                <AddStudentModal
                    userId= {userId}
                    isOpen={addModalOpen}                    
                    onClose={() => setAddModalOpen(false)}
                    onSave={handleSave}
                />
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
