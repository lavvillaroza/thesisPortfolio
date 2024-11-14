import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Header from './Header';
import SideNavbar from './SideNavbar';
import { CourseModel } from '../../models/CourseModel';
import { FaPlus, FaUserPlus } from 'react-icons/fa';
import { addCourse, fetchCourses } from '../../api/courseApi';
import { checkTokenAndLogout } from '../../utils/jwtUtil';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../api/apiConfig';
import CustomToast from '../common/CustomToast';

const Course: React.FC = () => {
    const initialCourseState: CourseModel = {
        id: 0,
        courseName: "",
        courseCode: "",
        totalUnits: 0,
        courseLogo: "",
        courseLogoUrl: "",
        createdBy: "",
        createdDate: "",
        lastModifiedBy: "",
        lastModifiedDate: ""
    };
    
    const [courseList, setCourseList] = useState<CourseModel[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCourse, setNewCourse] = useState<CourseModel>(initialCourseState);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [showToast, setShowToast] = useState<boolean>(false); // For toast visibility
    const [toastMessage, setToastMessage] = useState<string>(''); // Toast message content
    const [toastType, setToastType] = useState<'success' | 'error'>('success'); // Toast type (success or error)
    const navigate = useNavigate();

    const loadCourses = async () => {
        try {  
            
            if (checkTokenAndLogout()) {
                navigate("/");
                return;
              }
            try {
                const result = await fetchCourses();
                setCourseList(result); // Store the fetched data in state
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        } catch (error) {
            console.error('Error fetching course data:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = localStorage.getItem('userDetails');
        const formData = new FormData(e.currentTarget);
        formData.append('courseName', newCourse.courseName);
        formData.append('courseCode', newCourse.courseCode);
        formData.append('totalUnits', newCourse.totalUnits.toString());
        if (newCourse.courseLogo) {
            formData.append('courseLogo', newCourse.courseLogo); // Include the logo file
        }

        if (user) {
            const userParse = JSON.parse(user);
            formData.append('createdBy', userParse.username);
            formData.append('lastModifiedBy', userParse.username);
        } else {
            formData.append('createdBy', '');
            formData.append('lastModifiedBy', '');
        }

        try {
            
            await addCourse(formData);                
            setToastMessage('Course added successfully!');
            setToastType('success');
            setShowToast(true);

            // Reset the form
            setNewCourse(initialCourseState);
            closeModal(); // Close the modal after submission
            loadCourses(); // Call the fetch function
        } catch (error) {
            setToastMessage('Error adding course.');
            setToastType('error');
            setShowToast(true);
            console.error('Error adding course:', error);
        } finally {
            setTimeout(() => {
                setShowToast(false);
            }, 8000);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewCourse(prevCourse => ({ ...prevCourse, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.value ? e.target.value : '';
        if (file) {
            setNewCourse(prevCourse => ({ ...prevCourse, courseLogo: file })); // Set the file directly in the state
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredCourses = courseList.filter(course =>
        course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Fetch announcements whenever pageNumber or selectedDate changes
    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <div className="flex p-4 md:flex md:flex-col bg-gray-100 py-2 min-h-screen min-w-screen w-full">
            <div className="flex-1 m-auto">
                <Header />
                <div className="flex flex-col md:flex-row bg-background text-foreground mx-auto w-full h-full md:h-[750px] overflow-y-auto scrollbar scrollbar-thumb-emerald-700 scrollbar-track-gray-100">
                    <SideNavbar />
                    <main className="font-roboto flex-1 w-full md:w-[1100px] md:h-full mx-auto h-full bg-emerald-700 bg-gradient-to-br from-emerald-600 rounded transition-all duration-200">
                        <div className="h-[60px] p-4">
                            <h5 className="mb-2 text-center text-3xl font-bold tracking-tight text-white dark:text-gray-900">COURSES</h5>
                        </div>
                        <div className="flex flex-col-reverse md:flex-row gap-4 min-h-[660px] px-6">
                            <div className="flex-auto w-full md:w-72 bg-gray-100 p-3 overflow-y-auto scrollbar scrollbar-thumb-emerald-700 scrollbar-track-gray-100 rounded transition-all duration-200">
                                <div className="flex-1 mx-auto p-2 drop-shadow-lg "> 
                                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto scrollbar scrollbar-thumb-emerald-700 scrollbar-track-gray-100">
                                        <div className="pb-2 bg-white dark:bg-gray-900 h-[600px]">
                                            <label htmlFor="table-search" className="sr-only">Search</label>                                    
                                            <div className="w-full relative p-4 mt-1 flex justify-between items-center">
                                                <div className="relative pt-2">
                                                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                                        </svg>
                                                    </div>
                                                    <input 
                                                        type="text" 
                                                        id="searchValue"
                                                        name="searchValue"
                                                        className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="Search for student name"
                                                        value={searchTerm}
                                                        onChange={handleSearch}
                                                        />                                
                                                </div>
                                                <div className="relative pt-2">
                                                    <button
                                                        onClick={openModal}
                                                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-normal p-3 rounded-full transition duration-150 ease-in-out flex items-center justify-center">
                                                        <FaPlus className="w-3 h-3" />
                                                    </button>
                                                </div>                                        
                                            </div>
                                            <div className="w-full relative max-w-full overflow-x-auto">
                                                {courseList.length === 0 ? (
                                                    <p className="text-center justify-center italic m-auto">No available course found!</p>
                                                ) : (
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full m-auto ">
                                                        
                                                        {filteredCourses.map((course) => (
                                                            <div className="ml-4 w-full hover:scale-95">
                                                                <div key={course.id} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                                                    <div>
                                                                        <img
                                                                            className="object-fill w-32 h-32 rounded-t-lg md:h-32 md:w-32 md:rounded-none md:rounded-s-lg"
                                                                            src= {BASE_URL + encodeURI(course.courseLogoUrl)}
                                                                            alt="Course logo" />
                                                                    </div>
                                                                    <div className="flex flex-col justify-between p-4 leading-normal w-full">
                                                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{course.courseCode}</h5>
                                                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{course.courseName}</p>
                                                                    </div>
                                                                </div>
                                                            </div>                                                            
                                                        ))}
                                                        
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>                        
                        </div>
                    </main>
                </div>

                {/* Add Course Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-full bg-gray-800 bg-opacity-50">
                        <div className="relative w-full max-w-lg md:max-w-xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700 overflow-auto">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <FaUserPlus className="w-6 h-6 text-gray-900 dark:text-white" />
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">ADD COURSE</h3>
                                <button
                                    type="button"
                                    className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                    onClick={closeModal}
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 17 14"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M1 1l15 12M1 13L16 1"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                    <div>
                                        <label htmlFor="course_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Name</label>
                                        <input
                                            type="text"
                                            id="course_name"
                                            name="courseName"
                                            value={newCourse.courseName}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Course Name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="course_code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Code</label>
                                        <input
                                            type="text"
                                            id="course_code"
                                            name="courseCode"
                                            value={newCourse.courseCode}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Course Code"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="total_units" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Units</label>
                                        <input
                                            type="number"
                                            id="total_units"
                                            name="totalUnits"
                                            value={newCourse.totalUnits}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Total Units"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="course_logo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Logo</label>
                                        <input
                                            type="file"
                                            id="course_logo"
                                            name="courseLogo"
                                            accept="image/*" // Restrict to image files
                                            onChange={handleFileChange} // Call file change handler
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            required
                                        />
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG or JPG.</p>

                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Toast notification */}
                {showToast && (
                <CustomToast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                    />
                )}                
            </div>
        </div>
    );
};

export default Course;
