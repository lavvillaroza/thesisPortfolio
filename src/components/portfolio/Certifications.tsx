import React, { useEffect, useState } from 'react';
import { FaFilePdf } from 'react-icons/fa';
import NavHeader from './NavHeader';
import { StudentCertAndRecogModel } from '../../models/StudentCertiAndRecogModel';

import { fetchStudentCertificates, fetchStudentRecognitions } from '../../api/portfolioApi';
import { BASE_URL } from '../../api/apiConfig';
import CustomToast from '../common/CustomToast';
import { useParams } from 'react-router-dom';

const Certifications: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); // Get `userId` from route parameters  
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [studentCertificates, setStudentCertificates] = useState<StudentCertAndRecogModel[]>([]);
  const [studentRecognitions, setStudentRecognitions] = useState<StudentCertAndRecogModel[]>([]);  

  useEffect(() => {
    const fetchCertificatesAndRecognitions = async () => {
      try {    
        if (!userId) return;          
          // Run both data fetching functions concurrently
          const [certificatesData, recognitionsData] = await Promise.all([
            fetchStudentCertificates(Number(userId)),
            fetchStudentRecognitions(Number(userId)),          
        ]);          
        setStudentCertificates(certificatesData);
        setStudentRecognitions(recognitionsData);
      } catch (error) {
        setToast({ message: '' + error, type: 'error' });      
      }
    };
    fetchCertificatesAndRecognitions();
  }, []);

  const handleOpenCertOrRecog = (attachement: string) => {
    window.open(BASE_URL + encodeURI(attachement), '_blank'); // Opens in a new tab
  };

  return (
    <div className="font-roboto flex p-4 md:flex md:flex-col bg-gray-100 py-2 min-h-screen min-w-screen w-full bg-custom-bg bg-cover bg-center">
    <div className="flex-1 m-auto">
        <NavHeader />                
        <div className="flex flex-col md:flex-col bg-background text-foreground mx-auto w-full h-full md:h-[750px]">
            <main className="flex-1 w-full md:w-[1100px] md:h-full mx-auto h-full bg-emerald-600 bg-opacity-50 bg-gradient-to-br from-emerald-600 rounded">
                <div className="flex flex-col-reverse md:flex-row gap-4 min-h-[700px] px-6 pt-10">
                    <div className="flex-auto w-full md:w-72 bg-gray-100 p-1 overflow-y-auto scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100 rounded">
                      <div className="p-4">                                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="mb-4 ">
                                <label className="text-gray-700 text-left mx-2 text-2xl">CERTIFICATES</label>                                
                              </div>
                              <div className="p-4 w-full m-auto h-[570px] bg-white drop-shadow-md rounded-lg overflow-auto">                                
                                <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" />
                                  <div className="grid grid-cols-1 ">
                                    {studentCertificates.map(item => (
                                          <div key={item.id} className="py-2 flex items-start">
                                            <span className="flex items-center text-sm font-medium text-blue-700">
                                              <span
                                                className="flex w-2.5 h-2.5 bg-emerald-600 '} rounded-full me-1.5 flex-shrink-0">
                                              </span>
                                              {item.name}
                                            </span>
                                            <button
                                                onClick={() =>handleOpenCertOrRecog(item.attachment)}
                                                className="text-emerald-700 hover:text-emerald-800 mx-2">
                                                <FaFilePdf size={20} /> {/* Resume icon */}                                            
                                            </button>                                            
                                          </div>                                           
                                        ))}      
                                  </div>                                       
                              </div>
                            </div>
                            <div>
                              <div className="mb-4">
                                <label className="text-gray-700 text-left mx-2 text-2xl">RECOGNITIONS</label>                                                                      
                              </div>
                              <div className="p-4 w-full m-auto h-[570px] bg-white drop-shadow-md rounded-lg overflow-auto">
                                <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" />
                                <div className="grid grid-cols-1">
                                    {studentRecognitions.map(item => (
                                      <div key={item.id} className="py-2 flex items-start">
                                      <span className="flex items-center text-sm font-medium text-blue-700">
                                        <span
                                          className="flex w-2.5 h-2.5 bg-emerald-600 '} rounded-full me-1.5 flex-shrink-0">
                                        </span>
                                        {item.name}
                                      </span>
                                      <button
                                          onClick={() =>handleOpenCertOrRecog(item.attachment)}
                                          className="text-emerald-700 hover:text-emerald-800 mx-2">
                                          <FaFilePdf size={20} /> {/* Resume icon */}                                            
                                      </button>                                      
                                    </div>        
                                    ))}      
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
        <footer className="text-white text-center p-4">
            © 2024 Student Portfolio
        </footer>
    </div>
  </div> 

  )};

export default Certifications;