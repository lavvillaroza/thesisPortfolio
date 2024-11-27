import React, { useState } from 'react';
import { AnnouncementModel } from '../../../models/AnnouncementModel';
import { RiMegaphoneFill } from "react-icons/ri";
import { BASE_URL } from '../../../api/apiConfig';
import { checkTokenAndLogout } from '../../../utils/jwtUtil';
import { useNavigate } from 'react-router-dom';
import CustomToast from '../../common/CustomToast';
import { addSeminarAttendee } from '../../../api/announcementApi';

const AnnouncementDetailModal: React.FC<{ announcement: AnnouncementModel }> = ({ announcement }) => {    
    const navigate = useNavigate();
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);        

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);    

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % announcement.announcementDetails.length);
        console.log(announcement.announcementDetails.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + announcement.announcementDetails.length) % announcement.announcementDetails.length);
    };     

    const handleSubmit = async () => {        
        try {
            if (checkTokenAndLogout()) {
                navigate("/");
                return;
            }
            const user = localStorage.getItem('userDetails');
            if (user) {
                const userParse = JSON.parse(user);
                console.log(userParse.userid)                
                const result = await addSeminarAttendee(announcement.id, userParse.userid);

                if (result === "Success") {
                    setToast({ message: "Attendee successfully added.", type: 'success' });
                } else if (result === "AlreadyRegistered") {
                    setToast({ message: "Attendee is already registered.", type: 'error' });                    
                }                
                 // Delay the modal closing slightly to allow the toast to display                             
            } else {
                navigate("/");
            }                                                                    
        } catch (error) {            
            setToast({ message: 'Failed to register: ' + error, type: 'error' });
        }
    };
        
    return (
        <> 
            <button onClick={openModal} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800">Read More...</button>           
            {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-full bg-gray-800 bg-opacity-50">
                <div className="relative w-full max-w-2xl my-5 md:max-w-3xl max-h-full bg-white rounded-lg shadow">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 border-b rounded-t">
                        <RiMegaphoneFill className="w-6 h-6 text-gray-900"/>
                        <h3 className="text-xl font-medium text-gray-900">ANNOUNCEMENT</h3>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                            onClick={closeModal}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* Modal body */}
                    <div className="flex flex-col p-4 space-x-4">
                        {/* Description Section */}
                        <div className="w-full px-4">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">{announcement.title}</h2>
                            <div className="h-full my-4">
                                <div className="text-base font-normal text-gray-700">
                                    <p className="mb-4 text-justify">
                                        {announcement.description}
                                    </p>
                                </div>
                            </div>                                                                
                        </div>
                        {/* Carousel Section */}
                        <div className="w-full h-full m-auto">
                            {announcement.announcementDetails.length > 0 ? (
                                <>
                                    <div className="relative h-56 w-[95%] overflow-hidden rounded-lg md:h-96 flex justify-center items-center">
                                        {/* Display the current image */}
                                        {announcement.announcementDetails.map((detail, index) => (
                                            <div
                                                key={index}
                                                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                                                <img src={BASE_URL + encodeURI(detail.attachedPath)} alt={`Announcement Image ${index + 1}`} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-[95%] flex justify-center items-center pt-4">
                                        <button
                                            type="button"
                                            className="flex justify-center items-center me-4 cursor-pointer"
                                            onClick={prevImage}
                                        >
                                            <svg className="w-5 h-5 text-gray-500 hover:text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5H1m0 0 4 4M1 5l4-4" />
                                            </svg>
                                            <span className="sr-only">Previous</span>
                                        </button>
                                        <button
                                            type="button"
                                            className="flex justify-center items-center cursor-pointer"
                                            onClick={nextImage}
                                        >
                                            <svg className="w-5 h-5 text-gray-500 hover:text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
                                            </svg>
                                            <span className="sr-only">Next</span>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-56 md:h-96">
                                    <p className="text-gray-500">Not Available</p>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Modal footer */}
                    <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b">
                        {announcement.announcementType == 1 && (
                            <button 
                                onClick={handleSubmit} 
                                className="text-white bg-emerald-700 hover:bg-emerald-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Register
                            </button>
                        )}
                        <button 
                            onClick={closeModal} 
                            className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Close
                        </button>
                        
                    </div>
                </div>
            </div>
            )}
            {toast && (
                <CustomToast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </>
    );    
};

export default AnnouncementDetailModal;
