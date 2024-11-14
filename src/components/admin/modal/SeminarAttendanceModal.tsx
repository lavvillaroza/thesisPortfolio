import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { AnnouncementModel } from '../../../models/AnnouncementModel';
import { FaUsersBetweenLines } from 'react-icons/fa6';
import { SeminarAttendeesModel } from '../../../models/SeminarAttendeesModel';
import { checkTokenAndLogout } from '../../../utils/jwtUtil';
import { fetchSeminarAttendees } from '../../../api/announcementApi';

interface SeminarAttendanceModalProps {
    announcement: AnnouncementModel;
    isOpen: boolean;
    onClose: () => void;
}

const SeminarAttendanceModal: React.FC<SeminarAttendanceModalProps> = ({ announcement, isOpen, onClose }) => {    
    const navigate = useNavigate();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [seminarAttendees, setSeminarAttendees] = useState<SeminarAttendeesModel[]>([]);

    // Reset pageNumber to 1 when the modal is opened
    useEffect(() => {
        if (isOpen) {
            setPageNumber(1);
        }
    }, [isOpen]);

    // Handle page changes for pagination
    const handlePrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setPageNumber((prev) => Math.min(prev + 1, totalPages));

    // Fetch seminar attendees data based on pagination and announcement ID
    const fetchSeminarAttendeesData = useCallback(async () => {        
        if (checkTokenAndLogout()) {
            navigate("/");
            return;
        }        
        try {
            const result = await fetchSeminarAttendees({ pageNumber, pageSize }, announcement.id);                
            setSeminarAttendees(result.items);
            setTotalPages(result.totalPages);            
        } catch (error) {
            console.error('Error fetching seminar data:', error);
        } 
    }, [navigate, pageNumber, pageSize, announcement.id]);

    useEffect(() => {
        if (isOpen) {
            fetchSeminarAttendeesData();
        }
    }, [fetchSeminarAttendeesData, pageNumber, isOpen]);
    
    // Return null if modal is not open
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white p-8 rounded-lg shadow-lg w-[90%] md:w-[50%]">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <FaUsersBetweenLines className="w-6 h-6 text-gray-900 dark:text-white"/>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">{announcement.title} Attendees</h3>
                    <button
                        type="button"
                        className="text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={onClose}
                    >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>                
                {/* Modal body */}
                <div className="flex flex-col p-4 space-x-4 w-full h-[430px] px-2">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-200">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>                                                
                                <th scope="col" className="px-6 py-3 border-b border-gray-200 bg-gray-100">Student Name</th>                                
                                <th scope="col" className="px-6 py-3 border-b border-gray-200 bg-gray-100">Course</th>
                                <th scope="col" className="px-6 py-3 border-b border-gray-200 bg-gray-100">Year Level</th>
                                <th scope="col" className="px-6 py-3 border-b border-gray-200 bg-gray-100">Status</th>
                                <th scope="col" className="px-6 py-3 border-b border-gray-200 bg-gray-100">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {seminarAttendees.length > 0 ? (
                                seminarAttendees.map(attendee => (
                                    <tr key={attendee.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                            {attendee.studentName}
                                        </th>                                                                                                                
                                        <td className="px-6 py-4">{attendee.studentCourse}</td>
                                        <td className="px-6 py-4">{attendee.studentYearLevel}</td>
                                        <td className="px-6 py-4">{attendee.studentAttendanceStatus}</td>                                        
                                        <td className="px-6 py-4">
                                            <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-500 hover:underline">Update</a>                                            
                                        </td>                                                    
                                    </tr>
                                ))
                            ) : (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td colSpan={5} className="text-center px-6 py-4">No data available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>  
                    {/* Pagination controls */}
                    <div className="flex flex-col items-end mt-5 mr-5">
                        <span className="text-sm text-gray-700 dark:text-gray-400 mr-5">
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
                {/* Modal footer */}
                <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button 
                        onClick={onClose} 
                        className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default SeminarAttendanceModal;
