import React, { useEffect, useState } from 'react';
import NavHeader from './NavHeader';
import { checkTokenAndLogout } from '../../utils/jwtUtil';
import { FaEdit, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { StudentSubjectTakenModel } from '../../models/StudentSubjectTakenModel';
import { deleteStudentSubjectTaken, fetchStudentSubjectsTaken } from '../../api/studentApi';
import CustomToast from '../common/CustomToast';
import SubjectTakenModal from './modal/SubjectTakentModal';
import ConfirmationModal from '../common/ConfirmationModal';
import UpdateSubjectTakenModal from './modal/UpdateSubjectTakenModal';

const initialStudentSubject: StudentSubjectTakenModel = {
    id: 0,
    userId: 0,
    subjectId: 0,
    subjectName: '',
    subjectDescription: '',
    subjectStatus: 0,
    prereq: '',
    lec: 0,
    lab: 0,
    units: 0,
    hrs: 0
  }


const SubjectsTaken: React.FC = () => {
    const [totalPages, setTotalPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState<number>(10);
    const [studentSubjects, setStudentSubjects] = useState<StudentSubjectTakenModel[]>([]);    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [userId, setUserId] = useState<number>(0);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);
    const closeEditModal = () => setIsEditModalOpen(false);
    const navigate = useNavigate();        
    const [selectedStudentSubject, setSelectedStudentSubject] = useState<StudentSubjectTakenModel | null>(null);
    const [updateStudentSubject, setUpdateStudentSubject] = useState<StudentSubjectTakenModel>(initialStudentSubject);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

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
                setUserId(userParse.userid);
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
    }, [pageNumber, pageSize]);

    const confirmDeleteSubject = (subject: StudentSubjectTakenModel) => {
        setSelectedStudentSubject(subject);
        setIsConfirmModalOpen(true);
      };
    
    const handleDeleteSubject = async () => {
        if (selectedStudentSubject) {
            try {
            await deleteStudentSubjectTaken(selectedStudentSubject.id); // Call API to delete
            setIsConfirmModalOpen(false);
            setSelectedStudentSubject(null);
            fetchStudentSubjectsTakenData(); // Refresh list
            setToast({ message: 'Subject ' + selectedStudentSubject.subjectName +  ' deleted sucessfully', type: 'success' });
            } catch (error) {
            setToast({ message: 'Error deleting subject: ' + error, type: 'error' });        
            }
        }
    };      
    const handleUpdateSubject = async (subject: StudentSubjectTakenModel) => {
        try {                        
            setUpdateStudentSubject(subject);
            setIsEditModalOpen(true);                        
        } catch (error) {
            setToast({ message: 'Error deleting subject: ' + error, type: 'error' });        
        }
    };    
  return (
      <div className="font-roboto flex p-4 md:flex md:flex-col bg-gray-100 py-2 min-h-screen min-w-screen w-full bg-custom-bg bg-cover bg-center">
        <div className="flex-1 m-auto">
            <NavHeader />                
            <div className="flex flex-col md:flex-col bg-background text-foreground mx-auto w-full h-full md:h-[750px]">
                <main className="flex-1 w-full md:w-[1100px] md:h-full mx-auto h-full bg-emerald-600 bg-opacity-50 bg-gradient-to-br from-emerald-600 rounded">
                    <div className="flex flex-col-reverse md:flex-row gap-4 min-h-[720px] px-6 pt-10">
                        <div className="flex-auto w-full md:w-72 bg-gray-100 p-1 overflow-y-auto scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100 rounded">
                          <div className="p-4">                                          
                            <div className="p-4 w-12/12 m-auto mx-2 my-2 h-[620px] bg-white drop-shadow-md rounded-lg overflow-auto">
                              <div className="pb-2 bg-white h-[600px] md:h-full">
                                  <div className="w-full relative flex justify-between items-center">                                      
                                      <div className="relative py-3 pr-2">
                                          <button
                                              onClick={openAddModal}
                                              className="bg-emerald-700 hover:bg-emerald-800 text-white font-normal p-3 rounded-full transition duration-150 ease-in-out flex items-center justify-center">
                                              <FaPlus className="w-3 h-3" />
                                          </button>   
                                      </div>                                
                                  </div>                            
                                  <div className="relative w-full max-w-full">
                                      <div className="w-full h-[450px] px-2 md:h-full">
                                          <table className="w-full text-sm text-left rtl:text-right text-gray-500 border border-gray-200 overflow-y-auto scrollbar scrollbar-thumb-emerald-700 scrollbar-track-gray-100 rounded transition-all duration-200">
                                              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                                  <tr>                                                
                                                      <th scope="col" className="px-4 py-2 border-b border-gray-200 bg-gray-100">Subject Name</th>
                                                      <th scope="col" className="px-4 py-2 border-b border-gray-200 bg-gray-100">Subject Description</th>
                                                      <th scope="col" className="px-4 py-2 border-b border-gray-200 bg-gray-100">Prereq</th>
                                                      <th scope="col" className="px-4 py-2 border-b border-gray-200 bg-gray-100">Lec</th>
                                                      <th scope="col" className="px-4 py-2 border-b border-gray-200 bg-gray-100">Lab</th>
                                                      <th scope="col" className="px-4 py-2 border-b border-gray-200 bg-gray-100">Units</th>
                                                      <th scope="col" className="px-4 py-2 border-b border-gray-200 bg-gray-100">Hrs</th>
                                                      <th scope="col" className="px-4 py-2 border-b border-gray-200 bg-gray-100">Status</th>  
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
                                                            <span className={` ${subjectTaken.subjectStatus === 0
                                                                            ? 'bg-yellow-100 text-yellow-800'
                                                                            : subjectTaken.subjectStatus === 1
                                                                            ? 'bg-emerald-100 text-emerald-800'
                                                                            : 'bg-red-100 text-red-800'} text-xs font-medium me-2 px-2.5 py-0.5 rounded-full`}>
                                                                {subjectTaken.subjectStatus == 0 ? 'On-Going' : subjectTaken.subjectStatus == 1 ? 'Passed' : 'Failed'}
                                                            </span>                                                            
                                                          </td>  
                                                          <td className="px-4 py-1.5">
                                                            <div className="relative">
                                                                <button
                                                                    onClick={() => handleUpdateSubject(subjectTaken)}
                                                                    className="text-emerald-500 hover:text-emerald-900 mr-2">
                                                                    <FaEdit />
                                                                </button>
                                                                <button
                                                                    onClick={() => confirmDeleteSubject(subjectTaken)}
                                                                    className="text-red-500 hover:text-red-900 mr-2">
                                                                    <FaTrashAlt />
                                                                </button>
                                                              </div>                                                                                                                                  
                                                          </td>                                                    
                                                      </tr>
                                                  ))
                                              ) : (
                                                  <tr className="bg-white border-b">
                                                      <td colSpan={7} className="text-center px-6 py-4">No data available.</td>
                                                  </tr>
                                              )}
                                              </tbody>
                                          </table>  
                                      </div>                               
                                  </div>      
                                  {/* Pagination controls */}
                                  <div className="relative flex flex-col items-end my-5 mr-2 pb-5">
                                      <span className="text-sm text-gray-700">
                                          Page {pageNumber} of {totalPages}
                                      </span>
                                      <div className="inline-flex mt-2 xs:mt-0">                                        
                                        <button
                                            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                                            onClick={handlePrevPage}
                                            disabled={pageNumber === 1}>
                                            Prev
                                        </button>
                                          <button
                                              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
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
                {/* Modal for Adding/Editing Subject */}
                {isEditModalOpen && (
                    <UpdateSubjectTakenModal
                        subjectTaken={updateStudentSubject}                        
                        isOpen={isEditModalOpen}
                        onClose={closeEditModal}
                        onSubjectUpdate={fetchStudentSubjectsTakenData}
                    />
                )}

                {isAddModalOpen && (
                    <SubjectTakenModal
                        userId={userId}
                        isOpen={isAddModalOpen}
                        onClose={closeAddModal}
                        onSubjectAdd={fetchStudentSubjectsTakenData}
                    />
                )}
                {/* Confirmation Modal */}
                {isConfirmModalOpen && selectedStudentSubject && (
                    <ConfirmationModal
                    isOpen={isConfirmModalOpen}
                    message={`Are you sure you want to delete the Subject: "${selectedStudentSubject.subjectName}"?`}
                    onClose={() => setIsConfirmModalOpen(false)}
                    onConfirm={handleDeleteSubject}
                    />
                )}            
                {toast && (
                    <CustomToast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}             
            </div> 
            <footer className="text-white text-center p-4">
                © 2024 Student Portfolio
            </footer>                                         
        </div>
    </div> 
    )
};

export default SubjectsTaken;