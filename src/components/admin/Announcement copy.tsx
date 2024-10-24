import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import 'flowbite/dist/flowbite.css';
import 'flowbite/dist/flowbite.js';
import SideNavbar from './SideNavbar';
import Header from './Header';
import { AnnouncementModel } from '../../models/AnnouncementModel';
import { PagedResultType } from '../../models/PagedResultType';
import axios from 'axios'; // Ensure Axios is installed
import Cookies from 'js-cookie';
import AnnouncementDetailModal from './modal/AnnouncementDetailModal';

const API_URL = "https://localhost:5050/api/Announcement"; // Adjust the URL as needed

const Announcement: React.FC = () => {
    const [announcements, setAnnouncements] = useState<AnnouncementModel[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

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
    const fetchAnnouncements = async (pageNumber: number, date?: string | null) => {
        try {
            let url = `${API_URL}?PageNumber=${pageNumber}&PageSize=3&PageSizeLimit=3`;
            if (date) {
                url = `${API_URL}/ByDate/${date}?PageNumber=${pageNumber}&PageSize=3&PageSizeLimit=3`;
            }

            const jwtToken = Cookies.get('jwtToken');
            const headers = {
                Authorization: jwtToken ? `Bearer ${jwtToken}` : '',
            };

            const response = await axios.get<PagedResultType<AnnouncementModel>>(url, { headers });
            setAnnouncements(response.data.items);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching announcements', error);
        }
    };

    // Fetch announcements whenever pageNumber or selectedDate changes
    useEffect(() => {
        if (selectedDate) {
            fetchAnnouncements(pageNumber, selectedDate);
        }
    }, [pageNumber, selectedDate]);

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
                setPageNumber(1); // Reset to page 1 when date changes
            });
        }
    }, []);

    // Handle page changes for pagination
    const handlePrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setPageNumber((prev) => Math.min(prev + 1, totalPages));

    return (
        <div className="flex p-4 md:flex md:flex-col bg-gray-100 py-2 min-h-screen min-w-screen w-full">
            <div className="flex-1 m-auto">
                <Header />
                <div className="flex flex-col md:flex-row bg-background text-foreground mx-auto w-full h-full md:h-[750px] overflow-y-auto scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100">
                    <SideNavbar />
                    <main className="font-roboto flex-1 w-full md:w-[1100px] md:h-full mx-auto h-full bg-green-700 bg-gradient-to-br from-emerald-600 rounded transition-all duration-200">
                        <div className="h-[60px] p-4">
                            <h5 className="mb-2 text-center text-3xl font-bold tracking-tight text-white dark:text-gray-900">WELCOME</h5>
                        </div>
                        <div className="flex flex-col-reverse md:flex-row gap-4 min-h-[660px] px-6">
                            <div className="flex-auto w-full md:w-72 bg-gray-100 p-3 overflow-y-auto scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100 rounded transition-all duration-200">
                                {/* <p className="text-black text-left my-2 hover:text-green-500 text-lg">ANNOUNCEMENTS:</p>  */}
                                <div className="overflow-y-auto scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100 h-[550px]">
                                    {announcements.length === 0 ? (
                                        <p className="text-center justify-center m-auto">No announcements found</p>
                                    ) : (
                                        announcements.map((announcement) => (
                                            <div
                                                key={announcement.id}
                                                className="w-11/12 mx-auto my-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                    {announcement.title}
                                                </h5>
                                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                                    {truncateDescription(announcement.description, 120)}
                                                </p>
                                                <div className="relative p-4">
                                                    <div className="absolute top-0 right-0">
                                                        <AnnouncementDetailModal announcement={announcement} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                {/* Pagination controls */}
                                <div className="flex flex-col items-end mt-5">
                                    <span className="text-sm text-gray-700 dark:text-gray-400 mr-5">
                                        Page {pageNumber} of {totalPages}
                                    </span>
                                    <div className="inline-flex mt-2 xs:mt-0">
                                        <button
                                            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            onClick={handlePrevPage}
                                            disabled={pageNumber === 1}
                                        >
                                            Prev
                                        </button>
                                        <button
                                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            onClick={handleNextPage}
                                            disabled={pageNumber === totalPages}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 w-full md:w-8 md:flex-1 bg-gray-200 p-1 flex justify-center items-start rounded transition-all duration-200">
                                <div className="relative w-full max-w-xs h-80 overflow-hidden bg-white shadow-md rounded-md mt-10">
                                    <div className="w-full h-full" id="inline-calendar"></div>
                                    {/* Hidden input field to hold the selected date */}
                                    <input
                                        type="hidden"
                                        id="hidden-date-input"
                                        name="selectedDate"
                                        value={selectedDate || ''}
                                    />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Announcement;
