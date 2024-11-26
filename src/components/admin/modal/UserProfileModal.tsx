import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { checkTokenAndLogout } from '../../../utils/jwtUtil';
import { AdminUserModel } from '../../../models/AdminUserModel';
import { fetchAdminUser, updateAdminUser } from '../../../api/adminApi';
import { FaUserEdit } from 'react-icons/fa';
import CustomToast from '../../common/CustomToast';

interface UserProfileModalProps {    
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

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
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
        if (!isOpen) return; // Only fetch data if modal is open
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
                        <div className="flex items-center justify-center h-[400px]">
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>   
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col p-4 space-x-4">
                                <div className="grid gap-4 mb-6 md:grid-cols-1">
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                            Name
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
                                        Position
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="position"
                                            name="position"
                                            type="text"
                                            value={formData.position}
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
                                            type="text"
                                            value={formData.schoolEmail}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>                                    
                                </div>
                            </div>
                            <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                <button
                                    onClick={onClose}
                                    className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
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

export default UserProfileModal;
