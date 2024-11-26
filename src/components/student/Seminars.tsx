import React, { useEffect, useState } from 'react';
import NavHeader from './NavHeader';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import SeminarSchoolModal from './modal/SeminarSchoolModal';
import { StudentSeminarModel } from '../../models/StudentSeminarModel';
import { deleteStudentSeminar, fetchStudentSeminars } from '../../api/studentApi';
import { useNavigate } from 'react-router-dom';
import SeminarOthersModal from './modal/SeminarOthersModal';
import CustomToast from '../common/CustomToast';
import ConfirmationModal from '../common/ConfirmationModal';
import { checkTokenAndLogout } from '../../utils/jwtUtil';

const initialStudentSeminar: StudentSeminarModel = {
    id: 0,
    userId: 0,
    title: '',
    facilitator: '',
    dateAttended: new Date(),
    reflection: '',
    seminarType: 0,
    seminarId: 0,
  };

const Seminars: React.FC = () => {    
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [studentSeminars, setStudentSeminars]  = useState<StudentSeminarModel[]>([]);
    const [isSeminarSchoolModalOpen, setIsSeminarSchoolModalOpen] = useState(false);
    const [isSeminarOthersModalOpen, setIsSeminarOthersModalOpen] = useState(false);    
    const [isReflectionModalOpen, setIsReflectionModalOpen] = useState(false);
    const [selectedReflection, setSelectedReflection] = useState<string | null>(null);
    const [userId, setUserId] = useState<number>(0);
    const [selectedSeminar, setSelectedSeminar] = useState<StudentSeminarModel>(initialStudentSeminar);    
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const navigate = useNavigate();
        
    const openModalForSchool = async () => setIsSeminarSchoolModalOpen(true);
    const openModalForOthers = async () => setIsSeminarOthersModalOpen(true);
    const closeModalForShool = async () => setIsSeminarSchoolModalOpen(false);
    const closeModalForOthers = async () => setIsSeminarOthersModalOpen(false);    

    const openReflectionModal = (reflection: string) => {
        setSelectedReflection(reflection);
        setIsReflectionModalOpen(true);
    };
    const closeReflectionModal = () => {
        setSelectedReflection(null);
        setIsReflectionModalOpen(false);
    };

    const truncateDescription = (description: string, maxLength: number) => {
        return description.length > maxLength ? (
            <span>                
                <button
                    onClick={() => openReflectionModal(description)}
                    className="text-emerald-700 hover:text-emerald-800 underline"
                >
                    {description.substring(0, maxLength)}...
                </button>
            </span>
        ) : (
            description
        );
    };  
    const confirmDeleteSkill = (seminar: StudentSeminarModel) => {
        setSelectedSeminar(seminar);
        setIsConfirmModalOpen(true);
      };


      const handleDeleteSeminar = async () => {
        if (selectedSeminar) {
          try {
            await deleteStudentSeminar(selectedSeminar.id); // Call API to delete skill
            setIsConfirmModalOpen(false);
            setSelectedSeminar(initialStudentSeminar);
            fetchSeminars(); // Refresh skill list
            setToast({ message: 'Title ' + selectedSeminar.title +  ' deleted sucessfully', type: 'success' });
          } catch (error) {
            setToast({ message: 'Error deleting skills: ' + error, type: 'error' });        
          }
        }
      };

    const fetchSeminars = async () => {
        if (checkTokenAndLogout()) {
            navigate("/");
            return;
          }  
        try {
            const user = localStorage.getItem('userDetails');
            if (user) {
                const userParse = JSON.parse(user);
                const seminars = await fetchStudentSeminars(userParse.userid);
                setStudentSeminars(seminars);
                setUserId(userParse.userid);
            } else {
                navigate('/');
            }
        } catch (error) {
            setToast({ message: 'Error fetching seminars: ' + error, type: 'error' });      
        }
    };

    useEffect(() => {
        fetchSeminars();
    }, []);

    const formatDate = (date: string | Date): string => {
        const d = new Date(date);
        return new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
      };

    return (
        <div className="font-roboto flex p-4 md:flex md:flex-col bg-gray-100 py-2 min-h-screen min-w-screen w-full">
            <div className="flex-1 m-auto">
                <NavHeader />                
                <div className="flex flex-col md:flex-col bg-background text-foreground mx-auto w-full h-full md:h-[750px] overflow-y-auto">
                    <main className="flex-1 w-full md:w-[1100px] md:h-full mx-auto h-full bg-green-700 bg-gradient-to-br from-emerald-600 rounded">
                        <div className="flex flex-col-reverse md:flex-row gap-4 min-h-[720px] px-6 pt-10">
                            <div className="flex-auto w-full md:w-72 bg-gray-100 p-1 overflow-y-auto rounded">
                                <div className="p-4">                                          
                                    <div className="p-4 w-12/12 m-auto mx-2 my-2 h-[620px] bg-white drop-shadow-md rounded-lg overflow-auto">
                                        <div className="pb-2 bg-white">
                                            <div className="w-full relative flex justify-between items-center">                                  
                                                <div className="mb-4">
                                                    <label className="text-gray-700 text-left mx-2 text-2xl">SEMINARS ATTENDED</label>
                                                </div>
                                                <div className="flex space-x-4">
                                                    <button
                                                        onClick={openModalForSchool}
                                                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-normal p-2 rounded flex items-center justify-center">
                                                        <FaPlus className="w-3 h-3" />
                                                        <span className="ml-2">School</span>
                                                    </button>
                                                    <button
                                                        onClick={openModalForOthers}
                                                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-normal p-2 rounded flex items-center justify-center">
                                                        <FaPlus className="w-3 h-3" />
                                                        <span className="ml-2">Others</span>
                                                    </button>
                                                </div>                            
                                            </div>
                                            <div className="relative w-full max-w-full">
                                                <div className="w-full h-[450px] px-2">
                                                    <table className="w-full text-sm text-left text-gray-500 border border-gray-200 overflow-y-auto rounded">
                                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                                            <tr>                                                
                                                                <th className="px-4 py-2">Title</th>
                                                                <th className="px-4 py-2">Facilitator</th>
                                                                <th className="px-4 py-2">Date Time</th>                                                      
                                                                <th className="px-4 py-2">Reflection</th>                                                      
                                                                <th className="px-4 py-2">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {studentSeminars.length > 0 ? (
                                                                studentSeminars.map(seminar => (
                                                                    <tr key={seminar.id} className="bg-white border-b hover:bg-gray-50">
                                                                        <td className="px-6 py-4">{seminar.title}</td>
                                                                        <td className="px-6 py-4">{seminar.facilitator}</td>
                                                                        <td className="px-6 py-4">{formatDate(seminar.dateAttended)}</td>
                                                                        <td className="px-6 py-4">{truncateDescription(seminar.reflection, 30)}</td>
                                                                        <td className="px-6 py-4">                                                                            
                                                                            <button className="text-red-700 hover:text-red-800"
                                                                                  onClick={() => confirmDeleteSkill(seminar)}
                                                                                >
                                                                                <FaTrashAlt />
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            ) : (
                                                                <tr>
                                                                    <td colSpan={5} className="text-center text-gray-600 py-4">
                                                                        No seminars attended.
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
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

            {/* Reflection Modal */}
            {isReflectionModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2">
                        <h2 className="text-xl font-bold mb-4">Reflection</h2>
                        <p className="text-gray-700 text-justify">{selectedReflection}</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={closeReflectionModal}
                                className="bg-emerald-700 hover:bg-emerald-800 text-white font-normal px-4 py-2 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {isSeminarSchoolModalOpen &&  (
                    <SeminarSchoolModal
                        userId={userId}
                        isOpen={isSeminarSchoolModalOpen}                        
                        onClose={closeModalForShool}
                        onSeminarAdd={fetchSeminars}                        
                    />
                )}                           
             {isSeminarOthersModalOpen &&  (
                    <SeminarOthersModal
                        userId={userId}
                        isOpen={isSeminarOthersModalOpen}                        
                        onClose={closeModalForOthers}
                        onSeminarAdd={fetchSeminars}                        
                    />
                )}      

            {toast && (
                <CustomToast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            {/* Confirmation Modal */}
          {isConfirmModalOpen && selectedSeminar && (
            <ConfirmationModal
              isOpen={isConfirmModalOpen}
              message={`Are you sure you want to delete the Seminar: "${selectedSeminar.title}"?`}
              onClose={() => setIsConfirmModalOpen(false)}
              onConfirm={handleDeleteSeminar}
            />
          )}
        </div>
    );
};

export default Seminars;
