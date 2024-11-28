import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { checkTokenAndLogout } from '../../../utils/jwtUtil';
import { FaUserEdit } from 'react-icons/fa';
import CustomToast from '../../common/CustomToast';
import { StudentDetailModel } from '../../../models/StudentDetailModel';
import { fetchStudentDetail, updateStudentDetail } from '../../../api/studentApi';

interface UserProfileModalProps {    
    isOpen: boolean;
    onClose: () => void;
}

const initialStudentDetail: StudentDetailModel = {
    id: 0,
    userId: 0,
    studentId: '',
    studentName: '',
    courseId: 0,
    courseName: '',
    yearLevel: 0,
    yearStart: 0,
    yearEnd: null,
    section: '',
    schoolEmail: '',
    personalEmail: '',
    portfolioURL: '',
    attachedResume: '',
    attachedResumeFile: null,
    createdBy: '',
    createdDate: null,
    lastModifiedBy: '',
    lastModifiedDate: null,
};

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<StudentDetailModel>(initialStudentDetail);
    const [loading, setLoading] = useState<boolean>(true);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [attachedResumeFile, setAttachedResumeFile] = useState<File>(); // Array to handle multiple images

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (!isOpen) return; // Only fetch data if modal is open
        const getStudentDetailData = async () => {
            setLoading(true);
            try {
                const user = localStorage.getItem('userDetails');
                if (user) {
                    const userParse = JSON.parse(user);
                    const userData = await fetchStudentDetail(userParse.userid);
                    setFormData(userData);    
                } else {
                    navigate("/");
                }                    
            } catch (error) {
                console.error('Error fetching admin user data:', error);
            } finally {
                setLoading(false);
            }
        };
        getStudentDetailData();
    }, [isOpen, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData) {
            try {
                if (checkTokenAndLogout()) {
                    navigate("/");
                    return;
                }
                const user = localStorage.getItem('userDetails');
                if (user) {
                    const userParse = JSON.parse(user);

                    const fromFormData = new FormData();                
                    fromFormData.append('id', formData.id.toString());
                    fromFormData.append('userId', formData.userId.toString());
                    fromFormData.append('studentId', formData.studentId);
                    fromFormData.append('studentName', formData.studentName);
                    fromFormData.append('courseId', formData.courseId.toString());                
                    fromFormData.append('courseName', formData.courseName);                
                    fromFormData.append('yearLevel', formData.yearLevel.toString());
                    fromFormData.append('yearStart', formData.yearStart.toString());
                    fromFormData.append('yearEnd', formData.yearEnd?.toString() || '');
                    fromFormData.append('section', formData.section);
                    fromFormData.append('schoolEmail', formData.schoolEmail || '');
                    fromFormData.append('personalEmail', formData.personalEmail || '');
                    fromFormData.append('portfolioURL', formData.personalEmail || '');                    
                    fromFormData.append('lastModifiedBy', userParse.username || '');                    
                    
                    if (attachedResumeFile) {
                        console.log(attachedResumeFile.name);
                        fromFormData.append('attachedResume', attachedResumeFile.name);
                        fromFormData.append('attachedResumeFile', attachedResumeFile);
                        
                    } 
                    else {
                        fromFormData.append('attachedResume', formData.attachedResume || '');
                    }

                    // Print FormData contents
                        for (const [key, value] of fromFormData.entries()) {
                            console.log(`${key}:`, value);
                        }
                    await updateStudentDetail(userParse.userid, fromFormData);                
                    setToast({ message: 'Student detail updated successfully', type: 'success' });
                    setTimeout(() => {
                        setToast(null);
                        onClose();
                    }, 3000);                     
                } else {
                    navigate("/");
                }                                                                    
            } catch (error) {                
                setToast({ message: 'Failed to update student detail', type: 'error' });
            }
        }
    };

    const handleAttachResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setAttachedResumeFile(file);
    };


    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative bg-white p-8 rounded-lg shadow-lg w-[50%] md:w-[30%]">
                    <div className="flex items-center justify-between p-1 border-b rounded-t">
                        <FaUserEdit className="w-6 h-6 text-gray-900" />
                        <h3 className="text-xl font-medium text-gray-900">Update My Profile</h3>
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
                    {loading ? (
                        <div className="flex items-center justify-center h-[400px]">
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>                            
                    ) : (
                        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>                            
                            <div className="grid gap-4 md:grid-cols-4 mt-4">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentId">
                                        Student Id
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="studentId"
                                        name="studentId"
                                        type="text"
                                        value={formData.studentId}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="yearLevel">
                                        Year Level
                                    </label>
                                    <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="yearLevel"
                                    name="yearLevel"
                                    type="text"
                                    value={formData.yearLevel}
                                    onChange={handleChange}
                                    required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="yearStart">
                                        Year Start
                                    </label>
                                    <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="yearStart"
                                    name="yearStart"
                                    type="number"
                                    value={formData.yearStart}
                                    onChange={handleChange}
                                    required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="yearEnd">
                                        Year End
                                    </label>
                                    <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="yearEnd"
                                    name="yearEnd"
                                    type="number"
                                    value={formData.yearEnd || ''}
                                    onChange={handleChange}                                    
                                    />
                                </div>
                            </div>                             
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentName">
                                    Student Name
                                </label>
                                <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="studentName"
                                name="studentName"
                                type="text"
                                value={formData.studentName}
                                onChange={handleChange}
                                required
                                />
                            </div>
                                                                   
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="schoolEmail">
                                    School Email
                                </label>
                                <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="schoolEmail"
                                name="schoolEmail"
                                type="email"
                                value={formData.schoolEmail}
                                onChange={handleChange}
                                required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="personalEmail">
                                    Personal Email
                                </label>
                                <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="personalEmail"
                                name="personalEmail"
                                type="email"
                                value={formData.personalEmail || ''}
                                onChange={handleChange}                                    
                                />
                            </div>
                            <div className="my-4">                
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="attachedResumeFile">
                                        Attach Resume
                                </label>                                                              
                                <input
                                    className="shadow block w-full mb-5 text-sm text-gray-900 appearance-none border rounded cursor-pointer "
                                    id="attachedResumeFile"
                                    name="attachedResumeFile"
                                    type="file"                                        
                                    accept=".jpeg,.jpg,.pdf"
                                    onChange={handleAttachResumeChange}/> 
                            </div>
                            <div className="flex items-center justify-end space-x-4 ...">
                                <button
                                    className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit">
                                    Save
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-200 text-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={onClose}>
                                    Back
                                </button>
                            </div>                                        
                        </form>
                    )}
                </div>
            </div>
            {toast && (
                <CustomToast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </>,
        document.body
    );
};

export default UserProfileModal;
