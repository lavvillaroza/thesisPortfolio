import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { PiStudent } from "react-icons/pi";
import { checkTokenAndLogout } from "../../../utils/jwtUtil";
import { useNavigate } from "react-router-dom";
import { StudentDetailModel } from "../../../models/StudentDetailModel";
import { fetchCourses } from "../../../api/courseApi";
import { CourseModel } from "../../../models/CourseModel";
import { addStudent } from "../../../api/adminApi";


interface AddStudentModalProps {
    userId: string,    
    isOpen: boolean;
    onClose: () => void;
    onSave: (message: string, type: 'success' | 'error') => void;
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
    lastModifiedDate: null
};


const AddStudentModal: React.FC<AddStudentModalProps> = ({ userId, isOpen, onClose, onSave}) => {
    const [newStudentDetail, setNewStudentDetail] = useState(initialStudentDetail);  
    const navigate = useNavigate();
    const [courses, setCourses] = useState<CourseModel[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>('');    
    
    const fetchCoursesData = async () => {
        try {
            const result = await fetchCourses();
            setCourses(result);
        } catch (error) {
            console.error('Error fetching courses data:', error);
        }
    };                    

    useEffect(() => {    
        fetchCoursesData();
    }, []); // Empty dependency array

    // Reset the form when the modal opens
    useEffect(() => {
        if (isOpen) {
            setSelectedOption(''); // Reset selected option
            setNewStudentDetail(initialStudentDetail); // Reset form details
        }
    }, [isOpen]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
        setNewStudentDetail(prevStudent => ({ ...prevStudent, [name]: value}));
    };
    
    // Handler for the onChange event
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {        
        const { name, value } = e.target;
        setSelectedOption(value); // Update selected option state
        setNewStudentDetail(prevStudent => ({ ...prevStudent, [name]: value}));
    };  

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (checkTokenAndLogout()) {
            navigate("/");
            return;
        }  

        const user = localStorage.getItem('userDetails');        
        if (user) {
            const userParse = JSON.parse(user);
            newStudentDetail.createdBy = userParse.username;
            newStudentDetail.lastModifiedBy = userParse.username;            
        } 
        const formData = new FormData();
        formData.append('studentId', newStudentDetail.studentId);
        formData.append('studentName', newStudentDetail.studentName);
        formData.append('courseId', newStudentDetail.courseId.toString());
        formData.append('yearLevel', newStudentDetail.yearLevel.toString());
        formData.append('yearStart', newStudentDetail.yearStart.toString());
        formData.append('yearEnded', '');
        formData.append('section', newStudentDetail.section);
        formData.append('schoolEmail', newStudentDetail.schoolEmail);
        formData.append('personalEmail', '');
        formData.append('portfolioURL', '');
        formData.append('createdBy', userId);
        formData.append('lastModifiedBy', userId);
        
        try {
            const result = await addStudent(formData); // Call the new API function
            onSave(result, 'success');
            setNewStudentDetail(initialStudentDetail);
             // Close the modal                        
        } catch (error) {            
            console.error('Error adding Subject:', error);
            onSave(`Error adding subject: ${error}`, 'error');
        } finally {
            onClose();
        }
    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-full bg-gray-800 bg-opacity-50">
                <div className="relative w-full max-w-lg md:max-w-2xl max-h-full bg-white rounded-lg shadow overflow-auto">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 border-b rounded-t ">
                        <PiStudent  className="w-6 h-6 text-gray-900"/>
                        <h3 className="text-xl font-medium text-gray-900">ADD STUDENT</h3>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center "
                            onClick={onClose}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* Modal body */}
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col p-4 space-x-4">
                            {/* Fillup Form Section */}                                
                            <div className="grid gap-4 mb-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="studentId" className="block mb-2 text-sm font-medium text-gray-900">Student id</label>
                                    <input 
                                        type="text" 
                                        id="studentId" 
                                        name="studentId"
                                        value={newStudentDetail.studentId}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                                        placeholder="Student id" 
                                        required />
                                </div>  
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="courseId" className="block mb-2 text-sm font-medium text-gray-900">Course</label>
                                        <input 
                                            hidden
                                            type="text"
                                            id="courseId"
                                            name="courseId"
                                            value={newStudentDetail.courseId}>
                                        </input>
                                        <select                                                 
                                            value={selectedOption}                                                
                                            onChange={handleSelectChange}
                                            name="courseId"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                            required>
                                            <option selected>Course</option>
                                            {courses.map((course) => (
                                                    <option key={course.id} value={course.id}>{course.courseCode}</option>                                                        
                                            ))}                                                
                                        </select>                                            
                                    </div> 
                                    <div>
                                        <label htmlFor="section" className="block mb-2 text-sm font-medium text-gray-900">Section</label>
                                        <input 
                                            type="text" 
                                            id="section" 
                                            name="section"
                                            value={newStudentDetail.section}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                                            placeholder="Section"  />
                                    </div>   
                                </div>                                                                        
                                <div>
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Student Name</label>
                                    <input 
                                        type="text" 
                                        id="studentName" 
                                        name="studentName"
                                        value={newStudentDetail.studentName}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                                        placeholder="Student Name" 
                                        required />
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="yearStart" className="block mb-2 text-sm font-medium text-gray-900">Year Started</label>
                                        <input 
                                            type="text" 
                                            id="yearStart" 
                                            name="yearStart"
                                            value={newStudentDetail.yearStart}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                                            placeholder="Year Start" 
                                            required />
                                    </div> 
                                    <div>
                                        <label htmlFor="yearLevel" className="block mb-2 text-sm font-medium text-gray-900">Year Level</label>
                                        <input 
                                            type="number" 
                                            id="yearLevel" 
                                            name="yearLevel"
                                            value={newStudentDetail.yearLevel}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                                            placeholder="Year Level"  
                                            required/>
                                    </div>   
                                </div>                                                                             
                                <div className="mb-6">
                                    <label htmlFor="school_email" className="block mb-2 text-sm font-medium text-gray-900">School email</label>
                                    <input 
                                        type="email" 
                                        id="schoolEmail" 
                                        name="schoolEmail"
                                        value={newStudentDetail.schoolEmail}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                                        placeholder="juan.delacruz@school.com" 
                                        required />
                                </div>                                
                            </div>                                                                                                                                                                            
                        </div>
                        {/* Modal footer */}
                        <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b ">
                            <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                            <button 
                                onClick={onClose} 
                                className="text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Close
                            </button>
                        </div>
                    </form> 
                </div>
            </div>,
    document.body
  );
};
export default AddStudentModal;


