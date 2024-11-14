import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { checkTokenAndLogout } from '../../../utils/jwtUtil';
import { AdminUserModel } from '../../../models/AdminUserModel';
import { fetchAdminUser, updateAdminUser } from '../../../api/adminApi';
import { FaUserEdit } from 'react-icons/fa';
import CustomToast from '../../common/CustomToast';

interface ChangePasswordModalProps {
    userId: number;
    isOpen: boolean;
    onClose: () => void;
}

const initialAdminUser: AdminUserModel = {
    userId: 0,
    name: '',
    position: '',
    userName: '',
    schoolEmail: '',
    version: 0,
    createdBy: '',
    createdDate: '',
    lastModifiedBy: '',
    lastModifiedDate: ''
};

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ userId, isOpen, onClose }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<AdminUserModel>(initialAdminUser);
    const [loading, setLoading] = useState<boolean>(true);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (!isOpen || !userId) return; // Only fetch data if modal is open and userId is valid
        const getAdminUserData = async () => {
            setLoading(true);
            try {
                const user = localStorage.getItem('userDetails');
                if (user) {
                    const userParse = JSON.parse(user);
                    const userData = await fetchAdminUser(userParse.userid);
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
        getAdminUserData();
    }, [isOpen, navigate, userId]);

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
                    fromFormData.append('userId', formData.userId.toString());
                    fromFormData.append('name', formData.name);
                    fromFormData.append('position', formData.position);                
                    fromFormData.append('schoolEmail', formData.schoolEmail);                
                    fromFormData.append('lastModifiedBy', userParse.userid);                
                    await updateAdminUser(fromFormData);                
                    setToast({ message: 'Admin user updated successfully', type: 'success' });
                     // Delay the modal closing slightly to allow the toast to display
                    setTimeout(() => {
                        onClose();
                    }, 3000); // Adjust the delay as needed                    
                } else {
                    navigate("/");
                }                                                                    
            } catch (error) {
                console.error('Error updating admin user:', error);
                setToast({ message: 'Failed to update admin user', type: 'error' });
            }
        }
    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative bg-white p-8 rounded-lg shadow-lg w-[50%] md:w-[30%]">
                    <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <FaUserEdit className="w-6 h-6 text-gray-900 dark:text-white" />
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">My Profile</h3>
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
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col p-4 space-x-4">
                                <div className="grid gap-4 mb-6 md:grid-cols-1">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                                        <input
                                            type="text"
                                            id="position"
                                            name="position"
                                            value={formData.position}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="schoolEmail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input
                                            id="email"
                                            name="schoolEmail"
                                            type="email"
                                            value={formData.schoolEmail}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                <button
                                    onClick={onClose}
                                    className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Close
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

export default ChangePasswordModal;
