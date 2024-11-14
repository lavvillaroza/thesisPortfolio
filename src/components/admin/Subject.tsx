import React, { useCallback, useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Header from './Header';
import SideNavbar from './SideNavbar';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { checkTokenAndLogout } from '../../utils/jwtUtil';
import { SubjectModel } from '../../models/SubjectModel';
import { addSubject, fetchSearchSubjects, fetchSubjects } from '../../api/subjectApi';
import { PiBook } from 'react-icons/pi';

const initialSubject:SubjectModel = {
    id: 0,
    subjectName: '',
    subjectDescription: '',
    prereq: '',
    lec: 0,
    lab: 0,
    units: 0,
    hrs: 0,
    year: 0,    
    createdBy:  '',
    createdDate:  '',
    lastModifiedBy:  '',
    lastModifiedDate:  ''
}

const Subject: React.FC = () => {
    const [totalPages, setTotalPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState<number>(10);
    const [subjectList, setSubjectList] = useState<SubjectModel[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSubject, setNewSubject] = useState<SubjectModel>(initialSubject);
                                              
    const [searchValue, setSearchValue] = useState('');
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const navigate = useNavigate();

    const [showToast, setShowToast] = useState<boolean>(false); // For toast visibility
    const [toastMessage, setToastMessage] = useState<string>(''); // Toast message content
    const [toastType, setToastType] = useState<'success' | 'error'>('success'); // Toast type (success or error)    

    const [dropdownOpenRowId, setDropdownOpenRowId] = useState<number | null>(null);


    // Toggle dropdown visibility
    const toggleDropdown = (id: number) => {
        // Toggle the dropdown only for the current row
        setDropdownOpenRowId(prevId => (prevId === id ? null : id));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = localStorage.getItem('userDetails');        
        if (user) {
            const userParse = JSON.parse(user);
            newSubject.createdBy = userParse.username;
            newSubject.lastModifiedBy = userParse.username;            
        } 
        const formData = new FormData();
        formData.append('subjectName', newSubject.subjectName);
        formData.append('subjectDescription', newSubject.subjectDescription);
        formData.append('prereq', newSubject.prereq);
        formData.append('lec', newSubject.lec.toString());
        formData.append('lab', newSubject.lab.toString());
        formData.append('units', newSubject.units.toString());
        formData.append('hours', newSubject.hrs.toString());
        formData.append('createdBy', newSubject.createdBy);
        formData.append('lastModifiedBy', newSubject.createdBy);        
        
        try {
            await addSubject(formData); // Call the new API function
            setToastMessage('Student added successfully!');
            setToastType('success');
            setShowToast(true);
    
            // Reset the form
            setNewSubject(initialSubject);
            // Close the modal
            closeModal();
            await fetchSubjectsData('');
        } catch (error) {
            setToastMessage('Error adding announcement.');
            setToastType('error');
            setShowToast(true);
            console.error('Error adding announcement:', error);
        } finally {
            // Hide toast after 8 seconds
            setTimeout(() => {
                setShowToast(false);
            }, 8000);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewSubject(prevSubject => ({ ...prevSubject, [name]: value}));
    };

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        setPageNumber(1); // Reset to first page on new search
    };

  // Handle page changes for pagination
    const handlePrevPage = async () => {
        setPageNumber((prev) => Math.max(prev - 1, 1));        
    };

    const handleNextPage = async () => {
        setPageNumber((prev) => Math.min(prev + 1, totalPages));        
    };

    // Function to fetch student data based on search value
    const fetchSubjectsData = useCallback(async (searchTerm: string) => {
        if (checkTokenAndLogout()) {
            navigate("/");
            return;
        }        
        try {
            let result;
            if (searchTerm) {
                result = await fetchSearchSubjects({ pageNumber, pageSize }, searchTerm);
            } else {
                result = await fetchSubjects({ pageNumber, pageSize });
            }
            setSubjectList(result.items);
            setTotalPages(result.totalPages);
        } catch (error) {
            console.error('Error fetching students data:', error);
        } 
    }, [navigate, pageNumber, pageSize]);

      // Trigger search whenever `searchValue` or `pageNumber` changes
    useEffect(() => {
        if (searchValue) {
            fetchSubjectsData(searchValue);
        }
        else {
            fetchSubjectsData('');
        }
    }, [searchValue, pageNumber, fetchSubjectsData]);
      return (
        <div className="font-roboto flex p-4 md:flex md:flex-col bg-gray-100 py-2 min-h-screen min-w-screen w-full">  
            <div className="flex-1 m-auto">
              <Header />  
              <div className="flex flex-col md:flex-row bg-background text-foreground mx-auto w-full h-full md:h-[750px]">
                <SideNavbar/>
                  <main className="flex-1 w-full md:w-[1100px] md:h-full mx-auto h-full bg-emerald-700 bg-gradient-to-br from-emerald-600 rounded transition-all duration-200">
                      <div className="h-[60px] p-4">
                          <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-white dark:text-gray-900">SUBJECTS</h5>                                        
                      </div> 
                      <div className="flex flex-col-reverse md:flex-row gap-4 min-h-[660px] px-6 overflow-y-auto scrollbar scrollbar-thumb-emerald-700 scrollbar-track-gray-100 rounded transition-all duration-200">
                          <div className="flex-auto w-full md:w-72 bg-gray-100 p-3">
                              <div className="flex-1 mx-auto p-2 drop-shadow-lg ">                    
                                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <div className="pb-2 bg-white dark:bg-gray-900 h-[600px] md:h-full">
                                        <div className="w-full relative flex justify-between items-center">
                                            <label htmlFor="searchValue" className="sr-only">Search</label>
                                            <div className="relative py-3 pl-2">
                                                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-4 pointer-events-none">
                                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                                    </svg>
                                                </div>
                                                <input 
                                                    type="text" 
                                                    id="searchValue"
                                                    name="searchValue"
                                                    className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                    placeholder="Search for student name"
                                                    value={searchValue}
                                                    onChange={handleSearchInputChange}
                                                    />                                
                                            </div>
                                            <div className="relative py-3 pr-2">
                                                <button
                                                    onClick={openModal}
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
                                                            <th scope="col" className="px-6 py-3 border-b border-gray-200 bg-gray-100">Subject Name</th>
                                                            <th scope="col" className="px-6 py-3 border-b border-gray-200 bg-gray-100">Subject Description</th>
                                                            <th scope="col" className="px-6 py-3 border-b border-gray-200 bg-gray-100">Prereq</th>
                                                            <th scope="col" className="px-6 py-3 border-b border-gray-200 bg-gray-100">Lec</th>
                                                            <th scope="col" className="px-6 py-3 border-b border-gray-200 bg-gray-100">Lab</th>
                                                            <th scope="col" className="px-6 py-3 border-b border-gray-200 bg-gray-100">Units</th>
                                                            <th scope="col" className="px-6 py-3 border-b border-gray-200 bg-gray-100">Hrs</th>                                                            
                                                            <th scope="col" className="px-6 py-3 border-b border-gray-200 bg-gray-100">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {subjectList.length > 0 ? (
                                                        subjectList.map(subject => (
                                                            <tr key={subject.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                                <td className="px-4 py-2">{subject.subjectName}</td>                                                                                                            
                                                                <td className="px-4 py-2">{subject.subjectDescription}</td>
                                                                <td className="px-4 py-2">{subject.prereq}</td>
                                                                <td className="px-4 py-2">{subject.lec}</td>
                                                                <td className="px-4 py-2">{subject.lab}</td>
                                                                <td className="px-4 py-2">{subject.units}</td>
                                                                <td className="px-4 py-2">{subject.hrs}</td>                                                                
                                                                <td className="px-4 py-2">
                                                                    <div className="relative">
                                                                        <button 
                                                                            id={`dropdownMenuIconButton-${subject.id}`} 
                                                                            onClick={() => toggleDropdown(subject.id)}                                            
                                                                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                                                            type="button">
                                                                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                                                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                                                                            </svg>

                                                                        </button>

                                                                        {/* Dropdown menu */}
                                                                        <div 
                                                                            id={`dropdownDots-${subject.id}`} 
                                                                            className={`${dropdownOpenRowId === subject.id  ? 'block' : 'hidden'} z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-22 dark:bg-gray-700 dark:divide-gray-600 absolute mt-2`}>
                                                                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                                                                                <li>
                                                                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Update</a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
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
                                        <div className="relative flex flex-col items-end mt-5 mr-5">
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
                {/* Add Subject Modal */}
                {isModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-full bg-gray-800 bg-opacity-50">
                            <div className="relative w-full max-w-lg md:max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700 overflow-auto">
                                {/* Modal header */}
                                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                                    <PiBook  className="w-6 h-6 text-gray-900 dark:text-white"/>
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">ADD SUBJECT</h3>
                                    <button
                                        type="button"
                                        className="text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                                                <label htmlFor="subjectName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject Name</label>
                                                <input 
                                                    type="text" 
                                                    id="subjectName" 
                                                    name="subjectName"
                                                    value={newSubject.subjectName}
                                                    onChange={handleInputChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                    placeholder="Subject Name" 
                                                    required />
                                            </div>
                                            <div>
                                                <label htmlFor="subjectDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject Description</label>
                                                <input 
                                                    type="text" 
                                                    id="subjectDescription" 
                                                    name="subjectDescription"
                                                    value={newSubject.subjectDescription}
                                                    onChange={handleInputChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                    placeholder="Subject Description" 
                                                    required />
                                            </div>    
                                            <div className="col-span-2 grid gap-4 md:grid-cols-5">
                                                <div>
                                                    <label htmlFor="prereq" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PreReq</label>
                                                    <input 
                                                        type="text" 
                                                        id="prereq" 
                                                        name="prereq"
                                                        value={newSubject.prereq}
                                                        onChange={handleInputChange}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="PreReq"  />
                                                </div> 
                                                <div>
                                                    <label htmlFor="lec" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lec</label>
                                                    <input 
                                                        type="number" 
                                                        id="lec" 
                                                        name="lec"
                                                        min="0"
                                                        value={newSubject.lec}
                                                        onChange={handleInputChange}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="lec"  />
                                                </div>
                                                <div>
                                                    <label htmlFor="lab" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lab</label>
                                                    <input 
                                                        type="number" 
                                                        id="lab" 
                                                        name="lab"
                                                        min="0"
                                                        value={newSubject.lab}
                                                        onChange={handleInputChange}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="Lab"  />
                                                </div> 
                                                <div>
                                                    <label htmlFor="units" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Units</label>
                                                    <input 
                                                        type="number" 
                                                        id="units" 
                                                        name="units"
                                                        min="0"
                                                        value={newSubject.units}
                                                        onChange={handleInputChange}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="units"  />
                                                </div> 
                                                <div>
                                                    <label htmlFor="hrs" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hours</label>
                                                    <input 
                                                        type="number" 
                                                        id="hrs" 
                                                        name="hrs"
                                                        min="0"
                                                        value={newSubject.hrs}
                                                        onChange={handleInputChange}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="Hours"  />
                                                </div>      
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
                    
              {/* Toast notification */}
              {showToast && (
              <div
                  className={`fixed bottom-5 right-5 z-50 flex items-center p-4 max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 ${
                      toastType === 'success' ? 'border-green-600' : 'border-red-600'
                  }`}
                  role="alert">
                  <div
                      className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-white ${
                          toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
                      } rounded-lg`}
                  >
                      {toastType === 'success' ? (
                          <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                              <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.293-4.293a1 1 0 111.414-1.414L10 13.414l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-1.293-1.293z"
                                  clipRule="evenodd"
                              />
                          </svg>
                      ) : (
                          <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                              <path
                                  fillRule="evenodd"
                                  d="M18 10c0-4.418-3.582-8-8-8S2 5.582 2 10s3.582 8 8 8 8-3.582 8-8zm-8-4a1 1 0 00-1 1v3.586L7.707 7.293a1 1 0 10-1.414 1.414L9.586 12l-3.293 3.293a1 1 0 101.414 1.414L10 13.414V17a1 1 0 102 0v-3.586l2.293 2.293a1 1 0 001.414-1.414L12.414 12l3.293-3.293a1 1 0 00-1.414-1.414L11 9.586V6a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                              />
                          </svg>
                      )}
                  </div>
                  <div className="ml-3 text-sm font-normal">{toastMessage}</div>
                  <button
                      onClick={() => setShowToast(false)}
                      className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700"
                      aria-label="Close"
                  >
                      <span className="sr-only">Close</span>
                      <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                          <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                          />
                      </svg>
                  </button>
              </div>
              )}
            </div>                     
        </div>        
      );
    };
    
export default Subject;