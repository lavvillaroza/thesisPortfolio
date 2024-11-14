import React, { useEffect, useState } from 'react';
import NavHeader from './NavHeader';
import { checkTokenAndLogout } from '../../utils/jwtUtil';
//import { addSubject, fetchSearchSubjects, fetchSubjects } from '../../api/subjectApi';
//import { PiBook } from 'react-icons/pi';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
//import { SubjectModel } from '../../models/SubjectModel';
import { StudentSubjectTakenModel } from '../../models/StudentSubjectTakenModel';
import { fetchStudentSubjectsTaken } from '../../api/studentApi';

// const initialStudentSubject: StudentSubjectTakenModel = {
//   id: 0,
//   userId: 0,
//   subjectId: 0,
//   subjectName: '',
//   subjectDescription: '',
//   prereq: '',
//   lec: 0,
//   lab: 0,
//   units: 0,
//   hrs: 0,  
//   lastModifiedDate:  ''
// }

const SubjectsTaken: React.FC = () => {
    const [totalPages, setTotalPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState<number>(10);
    const [studentSubjects, setStudentSubjects] = useState<StudentSubjectTakenModel[]>([]);    
    // const [newStudentSubject, setNewStudentSubject] = useState<StudentSubjectTakenModel>(initialStudentSubject);
    // const [subjects, setSubjects] = useState<SubjectModel[]>([]);
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const openModal = () => setIsModalOpen(true);
    // const closeModal = () => setIsModalOpen(false);
    const navigate = useNavigate();

    // const [showToast, setShowToast] = useState<boolean>(false); // For toast visibility
    // const [toastMessage, setToastMessage] = useState<string>(''); // Toast message content
    // const [toastType, setToastType] = useState<'success' | 'error'>('success'); // Toast type (success or error)    
    const [dropdownOpenRowId, setDropdownOpenRowId] = useState<number | null>(null);

    // Toggle dropdown visibility
    const toggleDropdown = (id: number) => {
        // Toggle the dropdown only for the current row
        setDropdownOpenRowId(prevId => (prevId === id ? null : id));
    };

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     const user = localStorage.getItem('userDetails');        
    //     if (user) {
    //         const userParse = JSON.parse(user);
    //         newSubject.createdBy = userParse.username;
    //         newSubject.lastModifiedBy = userParse.username;            
    //     } 
    //     const formData = new FormData();
    //     formData.append('subjectName', newSubject.subjectName);
    //     formData.append('subjectDescription', newSubject.subjectDescription);
    //     formData.append('prereq', newSubject.prereq);
    //     formData.append('lec', newSubject.lec.toString());
    //     formData.append('lab', newSubject.lab.toString());
    //     formData.append('units', newSubject.units.toString());
    //     formData.append('hours', newSubject.hrs.toString());
    //     formData.append('createdBy', newSubject.createdBy);
    //     formData.append('lastModifiedBy', newSubject.createdBy);        
        
    //     try {
    //         await addSubject(formData); // Call the new API function
    //         setToastMessage('Student added successfully!');
    //         setToastType('success');
    //         setShowToast(true);
    
    //         // Reset the form
    //         setNewSubject(initialSubject);
    //         // Close the modal
    //         closeModal();
    //         await fetchSubjectsData('');
    //     } catch (error) {
    //         setToastMessage('Error adding announcement.');
    //         setToastType('error');
    //         setShowToast(true);
    //         console.error('Error adding announcement:', error);
    //     } finally {
    //         // Hide toast after 8 seconds
    //         setTimeout(() => {
    //             setShowToast(false);
    //         }, 8000);
    //     }
    // };

  // Handle page changes for pagination
    const handlePrevPage = async () => {
        setPageNumber((prev) => Math.max(prev - 1, 1));        
    };

    const handleNextPage = async () => {
        setPageNumber((prev) => Math.min(prev + 1, totalPages));        
    };

    // Function to fetch student data based on search value
    const fetchStudentSubjectsTakenData = async () => {
        if (checkTokenAndLogout()) {
            navigate("/");
            return;
        }        
        try {
            const user = localStorage.getItem('userDetails');        
            if (user) {
                const userParse = JSON.parse(user);
                const result = await fetchStudentSubjectsTaken({ pageNumber, pageSize }, userParse.userid);            
                setStudentSubjects(result.items);
                setTotalPages(result.totalPages);
            }
            else {
                navigate("/");
                return;
            }            
        } catch (error) {
            console.error('Error fetching students data:', error);
        } 
    };

    useEffect(() => {
        fetchStudentSubjectsTakenData()
    },);

  return (
      <div className="font-roboto flex p-4 md:flex md:flex-col bg-gray-100 py-2 min-h-screen min-w-screen w-full">
        <div className="flex-1 m-auto">
            <NavHeader />                
            <div className="flex flex-col md:flex-col bg-background text-foreground mx-auto w-full h-full md:h-[750px] overflow-y-auto scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100">                     
                <main className="flex-1 w-full md:w-[1100px] md:h-full mx-auto h-full bg-green-700 bg-gradient-to-br from-emerald-600 rounded transition-all duration-200">                        
                    <div className="flex flex-col-reverse md:flex-row gap-4 min-h-[720px] px-6 pt-10">
                        <div className="flex-auto w-full md:w-72 bg-gray-100 p-1 overflow-y-auto scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100 rounded transition-all duration-200">
                          <div className="p-4">                                          
                            <div className="p-4 w-12/12 m-auto mx-2 my-2 h-[620px] bg-white drop-shadow-md rounded-lg overflow-auto">
                              <div className="pb-2 bg-white dark:bg-gray-900 h-[600px] md:h-full">
                                  <div className="w-full relative flex justify-between items-center">                                      
                                      <div className="relative py-3 pr-2">
                                          <button
                                              //onClick={openModal}
                                              className="bg-emerald-700 hover:bg-emerald-800 text-white font-normal p-3 rounded-full transition duration-150 ease-in-out flex items-center justify-center">
                                              <FaPlus className="w-3 h-3" />
                                          </button>   
                                      </div>                                
                                  </div>                            
                                  <div className="relative w-full max-w-full">
                                      <div className="w-full h-[450px] px-2 md:h-full">
                                          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-200 overflow-y-auto scrollbar scrollbar-thumb-emerald-700 scrollbar-track-gray-100 rounded transition-all duration-200">
                                              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                  <tr>                                                
                                                      <th scope="col" className="px-4 py-2 border-b border-gray-200 bg-gray-100">Subject Name</th>
                                                      <th scope="col" className="px-4 py-2 border-b border-gray-200 bg-gray-100">Subject Description</th>
                                                      <th scope="col" className="px-4 py-2 border-b border-gray-200 bg-gray-100">Prereq</th>
                                                      <th scope="col" className="px-4 py-2 border-b border-gray-200 bg-gray-100">Lec</th>
                                                      <th scope="col" className="px-4 py-2 border-b border-gray-200 bg-gray-100">Lab</th>
                                                      <th scope="col" className="px-4 py-2 border-b border-gray-200 bg-gray-100">Units</th>
                                                      <th scope="col" className="px-4 py-2 border-b border-gray-200 bg-gray-100">Hrs</th>                                                            
                                                      <th scope="col" className="px-4 py-2 border-b border-gray-200 bg-gray-100">Action</th>
                                                  </tr>
                                              </thead>
                                              <tbody>
                                              {studentSubjects && studentSubjects.length > 0 ? (
                                                  studentSubjects.map(subjectTaken => (
                                                      <tr key={subjectTaken.id} className="bg-white border-b hover:bg-gray-50 ">
                                                          <td className="px-4 py-1.5">{subjectTaken.subjectName}</td>                                                                                                            
                                                          <td className="px-4 py-1.5">{subjectTaken.subjectDescription}</td>
                                                          <td className="px-4 py-1.5">{subjectTaken.prereq}</td>
                                                          <td className="px-4 py-1.5">{subjectTaken.lec}</td>
                                                          <td className="px-4 py-1.5">{subjectTaken.lab}</td>
                                                          <td className="px-4 py-1.5">{subjectTaken.units}</td>
                                                          <td className="px-4 py-1.5">{subjectTaken.hrs}</td>                                                                
                                                          <td className="px-4 py-1.5">
                                                              <div className="relative">
                                                                  <button 
                                                                      id={`dropdownMenuIconButton-${subjectTaken.id}`} 
                                                                      onClick={() => toggleDropdown(subjectTaken.id)}                                            
                                                                      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none  focus:ring-gray-50 "
                                                                      type="button">
                                                                      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                                                          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                                                                      </svg>

                                                                  </button>

                                                                  {/* Dropdown menu */}
                                                                  <div 
                                                                      id={`dropdownDots-${subjectTaken.id}`} 
                                                                      className={`${dropdownOpenRowId === subjectTaken.id  ? 'block' : 'hidden'} z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-22  absolute mt-2`}>
                                                                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                                                                          <li>
                                                                              <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">Update</a>
                                                                          </li>
                                                                          <li>
                                                                              <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">Delete</a>
                                                                          </li>                                                                            
                                                                      </ul>                                                                        
                                                                  </div>
                                                              </div>                                                                    
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
                                  {/* Pagination controls */}
                                  <div className="relative flex flex-col items-end my-5 mr-2 pb-5">
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
                </main>                  
            </div>                                          
        </div>
    </div> 
    )
};

export default SubjectsTaken;