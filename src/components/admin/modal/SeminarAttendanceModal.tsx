import React, { useCallback, useEffect, useState } from 'react';
import { AnnouncementModel } from '../../../models/AnnouncementModel';
import { FaUsersBetweenLines } from 'react-icons/fa6';
import { fetchSeminarAttendees, updateSeminarAttendee } from '../../../api/announcementApi';
import { FaEdit } from 'react-icons/fa';
import EditSeminarAttendeeModal from './EditSeminarAttendanceModal';
import { AnnouncementAttendeeModel } from '../../../models/AnnouncementAttendeeModel';

interface SeminarAttendanceModalProps {
    userId: string,
    announcement: AnnouncementModel;
    isOpen: boolean;
    onClose: () => void;
}

const SeminarAttendanceModal: React.FC<SeminarAttendanceModalProps> = ({userId, announcement, isOpen, onClose }) => {        
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [seminarAttendees, setSeminarAttendees] = useState<AnnouncementAttendeeModel[]>([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedAttendee, setSelectedAttendee] = useState<AnnouncementAttendeeModel>();

    const [showToast, setShowToast] = useState<boolean>(false); // For toast visibility
    const [toastMessage, setToastMessage] = useState<string>(''); // Toast message content
    const [toastType, setToastType] = useState<'success' | 'error'>('success'); // Toast type (success or error)    

    const handleEditClick = (attendee: AnnouncementAttendeeModel) => {        
        setSelectedAttendee(attendee);
        setEditModalOpen(true);
     };     

    const handleSaveAttendee = async (updatedData: AnnouncementAttendeeModel) => {        
        try {                  
            updatedData.lastModifiedBy = userId;
            console.log(updatedData);
            const result = await updateSeminarAttendee(updatedData.id, updatedData);
            setToastMessage(result);
            setToastType('success');
        } catch (error) {            
            setToastMessage(`Error updating seminar attendee data: ${error}`);
            setToastType('error');
        } 
        finally {
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 5000);
            fetchSeminarAttendeesData();
        }        
    };
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
        try {
            const result = await fetchSeminarAttendees({ pageNumber, pageSize }, announcement.id);                
            setSeminarAttendees(result.items);
            setTotalPages(result.totalPages);                        
        } catch (error) {
            setToastMessage(`Error fetching seminar attendee data: ${error}`);
            setToastType('error');            
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 5000);          
        }         
    }, [ pageNumber, pageSize, announcement.id]);

    useEffect(() => {
        if (isOpen) {
            fetchSeminarAttendeesData();
        }
    }, [fetchSeminarAttendeesData, pageNumber, isOpen]);

    const getYearString = (year: string): string => {
        switch (year) {
          case '1':
            return '1st Year';
          case '2':
            return '2nd Year';
          case '3':
            return '3rd Year';
          case '4':
            return '4th Year';
          default:
            return `${year}th Year`;
        }
      };

      const getStatusString = (status: number): string => {
        switch (status) {
          case 1:
            return 'Registered';
          case 2:
            return 'Absent';
          case 3:
            return 'Attended';          
          default:
            return `N/A`;
        }
      };
    
    // Return null if modal is not open
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white p-8 rounded-lg shadow-lg w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%]">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 border-b rounded-t">
                    <FaUsersBetweenLines className="w-6 h-6 text-yellow-300"/>
                    <h3 className="text-xl font-medium text-gray-900">{announcement.title} Attendees</h3>
                    <button
                        type="button"
                        className="text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                        onClick={onClose}
                    >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>                
                {/* Modal body */}
                <div className="flex flex-col p-4 space-x-4 w-full h-[430px] px-2 overflow-x-auto scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500  border-gray-200">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
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
                                    <tr key={attendee.id} className="bg-white border-b  hover:bg-gray-50 ">
                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap ">
                                            {attendee.studentName}
                                        </th>                                                                                                                
                                        <td className="px-6 py-4">{attendee.studentCourse}</td>
                                        <td className="px-6 py-4">{getYearString(attendee.studentYearLevel)}</td>
                                        <td className="px-6 py-4">                                            
                                            <span 
                                                className={` ${attendee.studentAttendanceStatus === 1
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : attendee.studentAttendanceStatus === 3
                                                            ? 'bg-emerald-100 text-emerald-800'
                                                            : 'bg-red-100 text-red-800'} text-xs font-medium me-2 px-2.5 py-0.5 rounded-full`}>
                                                {getStatusString(attendee.studentAttendanceStatus)}
                                            </span>                                                    
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleEditClick(attendee)}
                                                className="ml-2 hover:text-emerald-800 text-emerald-700 font-lg text-xl  transition duration-150 ease-in-out">
                                                <FaEdit />
                                            </button>                                            
                                        </td>                                                    
                                    </tr>
                                ))
                            ) : (
                                <tr className="bg-white border-b  hover:bg-gray-50 ">
                                    <td colSpan={5} className="text-center px-6 py-4">No data available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>  
                    {/* Pagination controls */}
                    <div className="flex flex-col items-end mt-5 mr-5">
                        <span className="text-sm text-gray-700  mr-5">
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
                {/* Modal footer */}
                <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b ">
                    <button 
                        onClick={onClose} 
                        className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Close
                    </button>
                </div>
            </div>
            {selectedAttendee && (
                <EditSeminarAttendeeModal
                    isOpen={editModalOpen}
                    attendeeData={selectedAttendee}
                    onClose={() => setEditModalOpen(false)}
                    onSave={handleSaveAttendee}
                />
                )}
            {/* Toast notification */}
            {showToast && (
              <div
                  className={`fixed bottom-5 right-5 z-50 flex items-center p-4 max-w-xs text-gray-500 bg-white rounded-lg shadow  ${
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
                      className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 "
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
    );
};
export default SeminarAttendanceModal;
