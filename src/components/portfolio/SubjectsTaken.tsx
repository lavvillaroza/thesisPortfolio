import React, { useEffect, useState } from 'react';
import NavHeader from './NavHeader';
import { useParams } from 'react-router-dom';
import { StudentSubjectTakenModel } from '../../models/StudentSubjectTakenModel';
import CustomToast from '../common/CustomToast';
import { fetchStudentSubjectsTaken } from '../../api/portfolioApi';

const SubjectsTaken: React.FC = () => {
    const { userId } = useParams<{ userId: string }>(); // Get `userId` from route parameters  
    const [totalPages, setTotalPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState<number>(10);
    const [studentSubjects, setStudentSubjects] = useState<StudentSubjectTakenModel[]>([]);        
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Handle page changes for pagination
    const handlePrevPage = async () => {
        setPageNumber((prev) => Math.max(prev - 1, 1));        
    };

    const handleNextPage = async () => {
        setPageNumber((prev) => Math.min(prev + 1, totalPages));        
    };

    // Function to fetch student data based on search value
    const fetchStudentSubjectsTakenData = async () => {        
        try {
            if (!userId) return;                     
            const result = await fetchStudentSubjectsTaken({ pageNumber, pageSize }, Number(userId));            
            setStudentSubjects(result.items);
            setTotalPages(result.totalPages);            
        } catch (error) {
            console.error('Error fetching subjects data:', error);
        } 
    };

    useEffect(() => {
        fetchStudentSubjectsTakenData()
    }, [pageNumber, pageSize]);
   
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
                                        <div className="mb-4">
                                            <label className="text-gray-700 text-left mx-2 text-2xl">SUBJECTS TAKEN</label>
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
                                                      <th scope="col" className="px-4 py-2 border-b border-gray-200 bg-gray-100">Status</th>                                                        
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
                {toast && (
                    <CustomToast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}             
            </div>                                          
        </div>
    </div> 
    )
};

export default SubjectsTaken;