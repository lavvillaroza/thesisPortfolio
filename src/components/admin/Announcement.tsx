import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import 'flowbite/dist/flowbite.css';
import 'flowbite/dist/flowbite.js';
import SideNavbar from './SideNavbar';
import Header from './Header';
import { AnnouncementModel } from '../../models/AnnouncementModel';
import AnnouncementDetailModal from './modal/AnnouncementDetailModal';
import {fetchAnnouncementsWithDetails} from '../../api/announcementApi';
import { useNavigate } from 'react-router-dom';
import { checkTokenAndLogout } from '../../utils/jwtUtil';

const Announcement: React.FC = () => {
    const [announcements, setAnnouncements] = useState<AnnouncementModel[]>([]);    
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(0);
    const navigate = useNavigate();

    // Truncate description to a specific length
    const truncateDescription = (description: string, maxLength: number) => {
        return description.length > maxLength
            ? `${description.substring(0, maxLength)}...`
            : description;
    };

    // Initialize the selected date to today when the component mounts
    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
        setSelectedDate(formattedDate);
    }, []);

    // Fetch announcements with pagination and optional date filter
    const loadAnnouncements = async () => {
        if (checkTokenAndLogout()) {
            navigate("/");
            return;
          }
        try {
            const result = await fetchAnnouncementsWithDetails({ pageNumber, pageSize }, selectedDate);
            setAnnouncements(result.items);
            setTotalPages(result.totalPages);
        } catch (error) {
            console.error('Error fetching announcements:', error);
        }
    };

    // Fetch announcements whenever pageNumber or selectedDate changes
    useEffect(() => {
        if (selectedDate) {
            loadAnnouncements();
        }
    }, [selectedDate, pageNumber]);


    // Initialize the Flowbite datepicker and handle the date change event
    useEffect(() => {
        const datepickerElement = document.getElementById('inline-calendar');
        if (datepickerElement) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const datepicker = new (window as any).Datepicker(datepickerElement, {
                autohide: false,
                todayBtn: true,
                clearBtn: true,
                autoselect: true,
                format: 'yyyy-mm-dd',
                defaultDate: new Date(),
            });

            datepicker.setDate(new Date()); // Visually select the current date

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            datepickerElement.addEventListener('changeDate', (event: any) => {
                const selectedDate = event.detail.date;
                const formattedDate =
                    selectedDate.getFullYear() +
                    '-' +
                    String(selectedDate.getMonth() + 1).padStart(2, '0') +
                    '-' +
                    String(selectedDate.getDate()).padStart(2, '0');

                setSelectedDate(formattedDate);                
            });
        }
    }, []);    
    // Handle page changes for pagination
    const handlePrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setPageNumber((prev) => Math.min(prev + 1, totalPages));

    return (
        <div className="flex flex-col md:flex-row min-h-screen min-w-screen w-full bg-custom-bg bg-cover bg-center">
            <div className="basis-3/4 mx-auto">
                <Header />                
                <div className="flex flex-col md:flex md:flex-row">
                    <SideNavbar />
                    <main className="basis-3/4 p-5 bg-emerald-600 bg-gradient-to-br from-emerald-600 bg-opacity-50 rounded">
                        <h5 className="mb-2 text-center text-2xl font-bold text-white ">WELCOME</h5>                        
                        <div className="flex flex-col-reverse md:flex-row gap-4">
                            <div className="basis-4/5 bg-gray-100 p-3 rounded">                                
                                <div className="h-[650px]">
                                    {announcements.length === 0 ? (
                                        <div className="grid grid-cols-1 gap-2 content-center h-[550px]">
                                            <h1 className="text-center font-bold italic text-gray-700">No announcement found</h1>
                                        </div>                                    
                                    ) : (
                                        <>
                                        <div className="grid grid-cols-2 gap-4 h-[550px] overflow-y-auto scrollbar scrollbar-thumb-emerald-600 scrollbar-track-gray-100 ">
                                            {
                                                announcements.map((announcement) => (
                                                    <div
                                                        key={announcement.id}
                                                        className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow h-[250px]">
                                                        <h1 className="mb-2 text-md lg:text-2xl md:text-xl font-bold tracking-tight text-gray-900 ">
                                                            {announcement.title.length >= 10 ? truncateDescription(announcement.title, 10) : announcement.title}
                                                        </h1>
                                                        <div className="overflow-hidden h-[100px]">
                                                            <p className="mb-3 font-normal text-gray-700">
                                                                {truncateDescription(announcement.description, 60)}
                                                            </p>
                                                        </div>
                                                        <div className="relative p-4">
                                                            <div className="absolute top-0 right-0">
                                                                <AnnouncementDetailModal announcement={announcement} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        {/* Pagination controls */}
                                        {announcements.length > 0 && (                                    
                                            <div className="flex flex-col items-end mt-5">
                                                <span className="text-sm text-gray-700 mr-5">
                                                    Page {pageNumber} of {totalPages}
                                                </span>
                                                <div className="inline-flex mt-2 xs:mt-0">
                                                    <button
                                                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                                                        onClick={handlePrevPage}
                                                        disabled={pageNumber === 1}
                                                    >
                                                        Prev
                                                    </button>
                                                    <button
                                                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
                                                        onClick={handleNextPage}
                                                        disabled={pageNumber === totalPages}
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                            </div>
                                        )}          
                                        </>
                                    )}
                                </div>                                                                                                                        
                            </div>
                            <div className="basis-1/5 bg-gray-100 px-5 justify-center items-start rounded transition-all duration-200">
                                <div className="p-5 flex items-center justify-center">
                                    <div id="inline-calendar"></div>
                                    {/* Hidden input field to hold the selected date */}
                                    <input
                                        type="hidden"
                                        id="hidden-date-input"
                                        name="selectedDate"
                                        value={selectedDate || ''}/>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <footer className="text-white text-center p-4">
                    © 2024 Student Portfolio
                </footer>
            </div>
        </div>
    );
};
export default Announcement;
