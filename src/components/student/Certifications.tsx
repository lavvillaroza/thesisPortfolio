import React, { useEffect, useState } from 'react';
import { FaEdit, FaFilePdf, FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import NavHeader from './NavHeader';
import { StudentCertAndRecogModel } from '../../models/StudentCertiAndRecogModel';
import { useNavigate } from 'react-router-dom';
import { deleteStudentCertificate, deleteStudentRecognition, fetchStudentCertificates, fetchStudentRecognitions } from '../../api/studentApi';
import AddCertificateModal from './modal/CertificateModal';
import AddRecognitionModal from './modal/RecognitionModal';
import ConfirmationModal from '../common/ConfirmationModal';
import CustomToast from '../common/CustomToast';
import { BASE_URL } from '../../api/apiConfig';
import { checkTokenAndLogout } from '../../utils/jwtUtil';

const Certifications: React.FC = () => {
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [studentCertificates, setStudentCertificates] = useState<StudentCertAndRecogModel[]>([]);
    const [studentRecognitions, setStudentRecognitions] = useState<StudentCertAndRecogModel[]>([]);
    const [userId, setUserId] = useState<number>(0);
    const [isModalOpenCert, setIsModalOpenCert] = useState(false);
    const [isModalOpenRecog, setIsModalOpenRecog] = useState(false);  
    const [isEditModeCert, setIsEditModeCert] = useState(false);
    const [isEditModeRecog, setIsEditModeRecog] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [selectedCert, setselectedCert] = useState<StudentCertAndRecogModel | null>(null);
    const [selectedRecog, setselectedRecog] = useState<StudentCertAndRecogModel | null>(null);
    const navigate = useNavigate();

    const toggleEditModeCert = () => setIsEditModeCert((prev) => !prev);
    const toggleEditModeRecog = () => setIsEditModeRecog((prev) => !prev);  

    const openModalCert = () => setIsModalOpenCert(true);
    const openModalRecog = () => setIsModalOpenRecog(true);
    const closeModalCert = () => setIsModalOpenCert(false);
    const closeModalRecog = () => setIsModalOpenRecog(false);

    const fetchData = async () => {        
      if (checkTokenAndLogout()) {
        navigate("/");
        return;
      }        
      const user = localStorage.getItem('userDetails');
        try {
            if (user) {
                const userParse = JSON.parse(user);
                // Run both data fetching functions concurrently
                const [certificatesData, recognitionsData] = await Promise.all([
                  fetchStudentCertificates(userParse.userid),
                  fetchStudentRecognitions(userParse.userid),                
              ]);                
                setStudentCertificates(certificatesData);
                setStudentRecognitions(recognitionsData);                 
                setUserId(userParse.userid);
                
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };  

    useEffect(() => {
      fetchData();
    }, []);

    const handleDeleteCert = async () => {
      if (selectedCert) {
        try {
          await deleteStudentCertificate(selectedCert.id); // Call API to delete skill
          setIsConfirmModalOpen(false);
          setselectedCert(null);
          fetchData(); // Refresh skill list
          setToast({ message: 'Name: ' + selectedCert.name +  ' deleted sucessfully', type: 'success' });
        } catch (error) {
          setToast({ message: 'Error deleting certificate: ' + error, type: 'error' });        
        }
      }
    };

    const handleDeleteRecog = async () => {
      if (selectedRecog) {
        try {
          await deleteStudentRecognition(selectedRecog.id); // Call API to delete skill
          setIsConfirmModalOpen(false);
          setselectedRecog(null);
          fetchData(); // Refresh skill list
          setToast({ message: 'Name: ' + selectedRecog.name +  ' deleted sucessfully', type: 'success' });
        } catch (error) {
          setToast({ message: 'Error deleting recognition: ' + error, type: 'error' });        
        }
      }
    };

    const handleOpenCertOrRecog = (attachement: string) => {
      window.open(BASE_URL + encodeURI(attachement), '_blank'); // Opens in a new tab
    };

    const confirmDeleteSkill = (deleteItem: StudentCertAndRecogModel) => {
      setselectedCert(deleteItem);
      setIsConfirmModalOpen(true);
    };

  return (
    <div className="font-roboto flex p-4 md:flex md:flex-col bg-gray-100 py-2 min-h-screen min-w-screen w-full">
    <div className="flex-1 m-auto">
        <NavHeader />                
        <div className="flex flex-col md:flex-col bg-background text-foreground mx-auto w-full h-full md:h-[750px] overflow-y-auto scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100">                     
            <main className="flex-1 w-full md:w-[1100px] md:h-full mx-auto h-full bg-green-700 bg-gradient-to-br from-emerald-600 rounded transition-all duration-200">                        
                <div className="flex flex-col-reverse md:flex-row gap-4 min-h-[700px] px-6 pt-10">
                    <div className="flex-auto w-full md:w-72 bg-gray-100 p-1 overflow-y-auto scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100 rounded transition-all duration-200">
                      <div className="p-4">                                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="mb-4 ">
                                <label className="text-gray-700 text-left mx-2 text-2xl">CERTIFICATES</label>
                                <button
                                  onClick={openModalCert}
                                  className="hover:text-emerald-800 text-emerald-700 font-lg text-xl  transition duration-150 ease-in-out">
                                  <FaPlusCircle />
                                </button>
                                <button
                                  onClick={toggleEditModeCert}
                                  className="ml-2 hover:text-emerald-800 text-emerald-700 font-lg text-xl  transition duration-150 ease-in-out">
                                  <FaEdit />
                                </button>
                              </div>
                              <div className="p-4 w-full m-auto h-[570px] bg-white drop-shadow-md rounded-lg overflow-auto">                                
                                <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" />
                                  <div className="grid grid-cols-1 ">
                                    {studentCertificates.map(item => (
                                          <div key={item.id} className="py-2 flex items-start">
                                            <span className="flex items-center text-sm font-medium text-blue-700 dark:text-white">
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
                                            {isEditModeCert && (
                                              <button
                                                onClick={() => confirmDeleteSkill(item)}
                                                className="text-red-700 hover:text-red-800 mr-2">
                                                <FaTrashAlt />
                                              </button>
                                            )}
                                          </div>                                           
                                        ))}      
                                  </div>                                       
                              </div>
                            </div>
                            <div>
                              <div className="mb-4">
                                <label className="text-gray-700 text-left mx-2 text-2xl">RECOGNITIONS</label>                                      
                                <button
                                  onClick={openModalRecog}
                                  className="hover:text-emerald-800 text-emerald-700 font-lg text-xl  transition duration-150 ease-in-out">
                                  <FaPlusCircle />
                                </button>
                                <button
                                  onClick={toggleEditModeRecog}
                                  className="ml-2 hover:text-emerald-800 text-emerald-700 font-lg text-xl  transition duration-150 ease-in-out">
                                  <FaEdit />
                                </button>
                              </div>
                              <div className="p-4 w-full m-auto h-[570px] bg-white drop-shadow-md rounded-lg overflow-auto">
                                <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" />
                                <div className="grid grid-cols-1">
                                    {studentRecognitions.map(item => (
                                      <div key={item.id} className="py-2 flex items-start">
                                      <span className="flex items-center text-sm font-medium text-blue-700 dark:text-white">
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
                                      {isEditModeRecog && (
                                        <button
                                          onClick={() => confirmDeleteSkill(item)}
                                          className="text-red-700 hover:text-red-700 mr-2">
                                          <FaTrashAlt />
                                        </button>
                                      )}
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
              {/* Modal for Adding/Editing Skills */}
              {isModalOpenCert && (
                <AddCertificateModal
                  userId={userId}
                  isOpen={isModalOpenCert}
                  onClose={closeModalCert}
                  onCertAdded={fetchData}
                />
              )}
              {isModalOpenRecog && (
                <AddRecognitionModal
                  userId={userId}
                  isOpen={isModalOpenRecog}
                  onClose={closeModalRecog}
                  onRecogAdded={fetchData}
                />
              )}

              {/* Confirmation Modal For Certificate*/}
              {isConfirmModalOpen && selectedCert && (
                <ConfirmationModal
                  isOpen={isConfirmModalOpen}
                  message={`Are you sure you want to delete the skill "${selectedCert.name}"?`}
                  onClose={() => setIsConfirmModalOpen(false)}
                  onConfirm={handleDeleteCert}
                />
              )}

              {/* Confirmation Modal For Recognition*/}
              {isConfirmModalOpen && selectedRecog && (
                <ConfirmationModal
                  isOpen={isConfirmModalOpen}
                  message={`Are you sure you want to delete the skill "${selectedRecog.name}"?`}
                  onClose={() => setIsConfirmModalOpen(false)}
                  onConfirm={handleDeleteRecog}
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
    </div>
  </div> 

  )};

export default Certifications;