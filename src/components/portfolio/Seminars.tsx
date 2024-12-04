import React, { useEffect, useState } from 'react';
import NavHeader from './NavHeader';
import { StudentSeminarModel } from '../../models/StudentSeminarModel';
import { useParams } from 'react-router-dom';
import { fetchStudentSeminars } from '../../api/portfolioApi';

const Seminars: React.FC = () => {    
    const { userId } = useParams<{ userId: string }>(); // Get `userId` from route parameters     
    const [studentSeminars, setStudentSeminars]  = useState<StudentSeminarModel[]>([]);        
    const [isReflectionModalOpen, setIsReflectionModalOpen] = useState(false);
    const [selectedReflection, setSelectedReflection] = useState<string | null>(null);              
    const closeReflectionModal = () => {
        setSelectedReflection(null);
        setIsReflectionModalOpen(false);
    };   
    const fetchSeminars = async () => {
        try {
            if (!userId) return;              
            const seminars = await fetchStudentSeminars(Number(userId));
            setStudentSeminars(seminars);            
        } catch (error) {
            console.error('Error fetching data:', error);
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
        <div className="font-roboto flex p-4 md:flex md:flex-col bg-gray-100 py-2 min-h-screen min-w-screen w-full bg-custom-bg bg-cover bg-center">
            <div className="flex-1 m-auto">
                <NavHeader />                
                <div className="flex flex-col md:flex-col bg-background text-foreground mx-auto w-full h-full md:h-[750px]">
                    <main className="flex-1 w-full md:w-[1100px] md:h-full mx-auto h-full bg-emerald-600 bg-opacity-50 bg-gradient-to-br from-emerald-600 rounded">
                        <div className="flex flex-col-reverse md:flex-row gap-4 min-h-[720px] px-6 pt-10">
                            <div className="flex-auto w-full md:w-72 bg-gray-100 p-1 rounded">
                                <div className="p-4">                                          
                                    <div className="p-4 w-12/12 m-auto mx-2 my-2 h-[620px] bg-white drop-shadow-md rounded-lg overflow-auto">
                                        <div className="pb-2 bg-white">
                                            <div className="w-full relative flex justify-between items-center">                                  
                                                <div className="mb-4">
                                                    <label className="text-gray-700 text-left mx-2 text-2xl">SEMINARS ATTENDED</label>
                                                </div>                                                                         
                                            </div>
                                            <div className="relative w-full max-w-full">
                                                <div className="w-full h-[450px] px-2">
                                                    <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded">
                                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                                            <tr>                                                
                                                                <th className="px-4 py-2">Title</th>
                                                                <th className="px-4 py-2">Facilitator</th>
                                                                <th className="px-4 py-2">Date Attended</th>                                                                                                                                                                                                            
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {studentSeminars.length > 0 ? (
                                                                studentSeminars.map(seminar => (
                                                                    <tr key={seminar.id} className="bg-white border-b hover:bg-gray-50">
                                                                        <td className="px-6 py-4">{seminar.title}</td>
                                                                        <td className="px-6 py-4">{seminar.facilitator}</td>
                                                                        <td className="px-6 py-4">{formatDate(seminar.dateAttended)}</td>                                                                        
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
                <footer className="text-white text-center p-4">
                    © 2024 Student Portfolio
                </footer>
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
        </div>
    );
};

export default Seminars;
