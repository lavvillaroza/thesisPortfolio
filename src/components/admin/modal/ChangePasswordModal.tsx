import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { checkTokenAndLogout } from '../../../utils/jwtUtil';
import { FaLockOpen } from 'react-icons/fa';
import CustomToast from '../../common/CustomToast';
import { ChangeUserPasswordModel } from '../../../models/ChanceUserPasswordModel';
import { updateAdminPassword } from '../../../api/adminApi';

interface ChangePasswordModalProps {
    userId: number;
    isOpen: boolean;
    onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ userId, isOpen, onClose }) => {
    const navigate = useNavigate();
    const [changePasswordData, setChangePasswordData] = useState<ChangeUserPasswordModel>({
        userId: userId,
        currentPassword: '',
        newPassword: '',
    });
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Password visibility states
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showRepeatNewPassword, setShowRepeatNewPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Handle "repeat new password" separately
        if (name === 'repeatNewPassword') {
            setRepeatNewPassword(value);
        } else {
            setChangePasswordData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSave = async () => {    
        if (changePasswordData.currentPassword == null) {
            setToast({ message: 'Please enter current password!', type: 'error' });
            return;
        }
        if (changePasswordData.newPassword == null) {
            setToast({ message: 'Please enter new password!', type: 'error' });
            return;
        }
        if (repeatNewPassword == null) {
            setToast({ message: 'Please enter repeat new password!', type: 'error' });
            return;
        }
        // Validation: Ensure new password matches repeat password
        if (changePasswordData.newPassword !== repeatNewPassword) {
            setToast({ message: 'Passwords do not match', type: 'error' });
            return;
        }            
        console.log(changePasswordData);
        try {
            if (checkTokenAndLogout()) {
                navigate('/');
                return;
            }
            const result = await updateAdminPassword(userId, changePasswordData);
            // Handle success
            setToast({ message: result.message, type: 'success' });
            setTimeout(() => {
                onClose();
            }, 3000); // Adjust delay as needed
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // Display error message
            const errorMessage = error.response?.data?.message || 'An error occurred while updating the password';
            setToast({ message: errorMessage, type: 'error' });
        }
    };
    
    if (!isOpen) return null;
    return ReactDOM.createPortal(
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative bg-white p-8 rounded-lg shadow-lg w-[50%] md:w-[30%]">
                    <div className="flex items-center justify-between p-4 border-b rounded-t ">
                        <FaLockOpen className="w-6 h-6 text-yellow-300 " />
                        <h3 className="text-xl font-medium text-gray-900 ">Change My Password</h3>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center "
                            onClick={onClose}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="flex flex-col p-4 space-x-4">
                        <div className="grid gap-4 mb-6 md:grid-cols-1">                                                            
                            <div>
                                <div className="relative">
                                    <label
                                        htmlFor="currentPassword"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Current Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="currentPassword"
                                            name="currentPassword"
                                            type={showCurrentPassword ? 'text' : 'password'}
                                            value={changePasswordData.currentPassword}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"                                            
                                            placeholder="Enter current password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
                                            onClick={() => setShowCurrentPassword((prev) => !prev)}
                                        >
                                            {showCurrentPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                </div>

                                {/* New Password */}
                                <div className="relative mt-4">
                                    <label
                                        htmlFor="newPassword"
                                        className="block mb-2 text-sm font-medium text-gray-900">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="newPassword"
                                            name="newPassword"
                                            type={showNewPassword ? 'text' : 'password'}
                                            value={changePasswordData.newPassword}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"                                            
                                            placeholder="Enter new password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
                                            onClick={() => setShowNewPassword((prev) => !prev)}>
                                            {showNewPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                </div>

                                {/* Repeat New Password */}
                                <div className="relative mt-4">
                                    <label
                                        htmlFor="repeatNewPassword"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Repeat New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="repeatNewPassword"
                                            name="repeatNewPassword"
                                            type={showRepeatNewPassword ? 'text' : 'password'}
                                            value={repeatNewPassword}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"                                            
                                            placeholder="Repeat new password"
                                            required/>
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
                                            onClick={() => setShowRepeatNewPassword((prev) => !prev)}>
                                            {showRepeatNewPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Modal footer */}
                    <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b ">
                        <button 
                            onClick={handleSave} 
                            className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                            Submit</button>
                        <button 
                            onClick={onClose} 
                            className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Close
                        </button>
                    </div>
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
