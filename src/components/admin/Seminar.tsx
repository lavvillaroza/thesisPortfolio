import React, { useCallback, useEffect, useState } from 'react';

import 'react-calendar/dist/Calendar.css';
import Header from './Header';
import SideNavbar from './SideNavbar';
import { AnnouncementModel } from '../../models/AnnouncementModel';
import { useNavigate } from 'react-router-dom';
import { checkTokenAndLogout } from '../../utils/jwtUtil';
import { fetchSearchSeminars, fetchSeminars } from '../../api/announcementApi';
import YearSelectDropDown from '../common/YearSelectDropDown';
import { FaFolder } from 'react-icons/fa';
import SeminarAttendanceModal from './modal/SeminarAttendanceModal';


const Seminar: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const [announcements, setAnnouncements] = useState<AnnouncementModel[]>([]);            
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(0);    
    const [selectedYear, setSelectedYear] = useState<number | undefined>(currentYear);
    const [searchValue, setSearchValue] = useState('');    
    const [selectedSeminar, setSelectedSeminar] = useState<AnnouncementModel | null>(null);
    const [userId, setUserId] = useState();
    const navigate = useNavigate();

    // Handle page changes for pagination
    const handlePrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setPageNumber((prev) => Math.min(prev + 1, totalPages));

    // Fetch seminars based on pagination, selected year, and search value
    const fetchSeminarsData = useCallback(async (searchTerm: string, year: number | undefined) => {        
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
                result = await fetchSearchSeminars({ pageNumber, pageSize }, searchTerm);                
            } else {                
                result = await fetchSeminars({ pageNumber, pageSize }, year);                
            }
            setAnnouncements(result.items);
            setTotalPages(result.totalPages);
            
        } catch (error) {
            console.error('Error fetching seminar data:', error);
        } 
    }, [navigate, pageNumber, pageSize]);
    

    // Trigger search whenever `searchValue`, `selectedYear`, or `pageNumber` changes
    useEffect(() => {
        fetchSeminarsData(searchValue, selectedYear);
    }, [fetchSeminarsData, pageNumber, searchValue, selectedYear]);

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(Number(event.target.value));
        setPageNumber(1); // Reset to first page when year changes
    };

    const handleSearchButtonClick = () => {
        fetchSeminarsData(searchValue, selectedYear);
    };

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);        
    };

    const openModal = (announcement: AnnouncementModel) => {
        setSelectedSeminar(announcement);
    };

    const closeModal = () => {
        setSelectedSeminar(null);
    };

      return (
        <div className="flex p-4 md:flex md:flex-col bg-gray-100 py-2 min-h-screen min-w-screen w-full">
            <div className="flex-1 m-auto">
                <Header />  
                <div className="flex flex-col md:flex-row bg-background text-foreground mx-auto w-full h-full md:h-[750px] overflow-y-auto scrollbar scrollbar-thumb-emerald-700 scrollbar-track-gray-100">                
                    <SideNavbar/>
                    <main className="font-roboto flex-1 w-full md:w-[1100px] md:h-full mx-auto h-full bg-emerald-700 bg-gradient-to-br from-emerald-600 rounded transition-all duration-200">
                        <div className="h-[60px] p-4">
                            <h5 className="mb-2 text-center text-3xl font-bold tracking-tight text-white  hover:scale-75">SCHOOL SEMINARS</h5>                            
                        </div> 
                        <div className="flex flex-col-reverse md:flex-row gap-4 min-h-[660px] px-6">
                            <div className="flex-auto w-full md:w-72 bg-gray-100 p-3 overflow-y-auto scrollbar scrollbar-thumb-emerald-700 scrollbar-track-gray-100 rounded transition-all duration-200">
                                <div className="flex-1 mx-auto p-2 drop-shadow-lg "> 
                                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto scrollbar scrollbar-thumb-emerald-700 scrollbar-track-gray-100">
                                        <div className="pb-2 bg-white h-[600px]">
                                            <div className="w-full relative flex justify-between items-center">
                                                <label htmlFor="searchValue" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                                                <div className="relative ml-2 my-2 w-[400px]">
                                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                        <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                                        </svg>
                                                    </div>
                                                    <input type="search" 
                                                        id="searchValue"
                                                        name="searchValue"
                                                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500 " 
                                                        placeholder="Search for seminar"
                                                        value={searchValue}
                                                        onChange={handleSearchInputChange}
                                                        required />
                                                    <button 
                                                        onClick={handleSearchButtonClick} 
                                                        className="text-white absolute end-2.5 bottom-2.5 bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-4 py-2 hover:scale-110">
                                                            Search
                                                    </button>
                                                </div>                                
                                                <div className="relative py-3 pr-2">
                                                    <YearSelectDropDown selectedYear={selectedYear} onChange={handleYearChange} />                                                    
                                                </div>                                
                                            </div>    
                                            {/* <p className="text-black text-left my-2 hover:text-green-500 text-lg">ANNOUNCEMENTS:</p>  */}
                                            <div className="mx-auto px-2 h-[430px]">
                                                {announcements.length === 0 ? (
                                                    <div className="flex items-center justify-center h-[500px] w-full">
                                                        <h1 className="text-center font-bold italic justify-center text-gray-700">No seminar found</h1>
                                                    </div>                                    
                                                ) : (
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                                        {
                                                        announcements.map((announcement) => (
                                                        <div
                                                            key={announcement.id}
                                                            className="w-full mx-auto my-5 p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition duration-150 ease-in-out">                                                            
                                                            <div className="flex flex-col items-center justify-center text-center">
                                                                <FaFolder className="h-36 w-36 text-yellow-300 hover:text-yellow-400" aria-hidden="true" /> 
                                                                <p className="mb-2 text-sm font-bold tracking-tight text-gray-900">
                                                                    {announcement.title}
                                                                </p>
                                                            </div>                                                            
                                                            <div className="relative p-4">
                                                                <div className="absolute top-0 right-0">
                                                                    <button onClick={() =>openModal(announcement)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800">Attendees</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        ))}                                                        
                                                    </div>
                                                    
                                                )}
                                            </div>     
                                            {/* Pagination controls */}
                                            <div className="flex flex-col items-end mt-5 mr-5">
                                                <span className="text-sm text-gray-700 mr-5">
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
                            {/* <div className="flex-1 w-full md:w-8 md:flex-1 bg-gray-200 p-1 flex justify-center items-start rounded transition-all duration-200">
                                <div className="container mx-auto p-4 drop-shadow-lg ">                
                                    <CustomTableSeminarList data={Attendees} />
                                </div>
                            </div>*/}
                        </div>                           
                    </main>
                </div>            
            </div>
            {selectedSeminar &&  userId && (
                <SeminarAttendanceModal
                    userId={userId}
                    announcement={selectedSeminar}
                    isOpen={!!selectedSeminar}
                    onClose={closeModal}
                />
            )}
        </div>        
      );
    };
    
export default Seminar;
