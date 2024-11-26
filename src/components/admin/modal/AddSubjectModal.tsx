import { useState } from "react";
import ReactDOM from "react-dom";
import { SubjectModel } from "../../../models/SubjectModel";
import { PiBook } from "react-icons/pi";
import { checkTokenAndLogout } from "../../../utils/jwtUtil";
import { addSubject} from "../../../api/subjectApi";
import { useNavigate } from "react-router-dom";


interface AddSubjectModalProps {
    userId: string,    
    isOpen: boolean;
    onClose: () => void;
    onSave: (message: string, type: 'success' | 'error') => void;
}

const initialSubject: SubjectModel = {
    id: 0,
    subjectName: '',
    subjectDescription: '',
    prereq: '',
    lec: 0,
    lab: 0,
    units: 0,
    hrs: 0,    
    createdBy:  '',
    createdDate:  '',
    lastModifiedBy:  '',
    lastModifiedDate:  ''
}

const AddSubjectModal: React.FC<AddSubjectModalProps> = ({ userId, isOpen, onClose, onSave}) => {
    const [newSubjectData, setNewSubjectData] = useState(initialSubject);  
    const navigate = useNavigate();
    
    if (!isOpen) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
        setNewSubjectData(prevSubject => ({ ...prevSubject, [name]: value}));
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (checkTokenAndLogout()) {
            navigate("/");
            return;
        }  
        const formData = new FormData();
        formData.append('subjectName', newSubjectData.subjectName);
        formData.append('subjectDescription', newSubjectData.subjectDescription);
        formData.append('prereq', newSubjectData.prereq);
        formData.append('lec', newSubjectData.lec.toString());
        formData.append('lab', newSubjectData.lab.toString());
        formData.append('units', newSubjectData.units.toString());
        formData.append('hrs', newSubjectData.hrs.toString());
        formData.append('createdBy', userId);
        formData.append('lastModifiedBy', userId);        
        
        try {
            const result = await addSubject(formData); // Call the new API function            
            onSave(result, 'success');
        } catch (error) {           
            console.error('Error adding Subject:', error);
            onSave(`Error adding subject: ${error}`, 'error');
        } finally {
            onClose();
        }
    };

  return ReactDOM.createPortal(
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-full bg-gray-800 bg-opacity-50">
                <div className="relative w-full max-w-lg md:max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700 overflow-auto">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <PiBook  className="w-6 h-6 text-gray-900 dark:text-white"/>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">ADD SUBJECT</h3>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                                    <label htmlFor="subjectName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject Name</label>
                                    <input 
                                        type="text" 
                                        id="subjectName" 
                                        name="subjectName"
                                        value={newSubjectData.subjectName}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Subject Name" 
                                        required />
                                </div>
                                <div>
                                    <label htmlFor="subjectDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject Description</label>
                                    <input 
                                        type="text" 
                                        id="subjectDescription" 
                                        name="subjectDescription"
                                        value={newSubjectData.subjectDescription}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Subject Description" 
                                        required />
                                </div>    
                                <div className="col-span-2 grid gap-4 md:grid-cols-5">
                                    <div>
                                        <label htmlFor="prereq" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PreReq</label>
                                        <input 
                                            type="text" 
                                            id="prereq" 
                                            name="prereq"
                                            value={newSubjectData.prereq}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder="PreReq"  />
                                    </div> 
                                    <div>
                                        <label htmlFor="lec" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lec</label>
                                        <input 
                                            type="number" 
                                            id="lec" 
                                            name="lec"
                                            min="0"
                                            value={newSubjectData.lec}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder="lec"  />
                                    </div>
                                    <div>
                                        <label htmlFor="lab" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lab</label>
                                        <input 
                                            type="number" 
                                            id="lab" 
                                            name="lab"
                                            min="0"
                                            value={newSubjectData.lab}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder="Lab"  />
                                    </div> 
                                    <div>
                                        <label htmlFor="units" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Units</label>
                                        <input 
                                            type="number" 
                                            id="units" 
                                            name="units"
                                            min="0"
                                            value={newSubjectData.units}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder="units"  />
                                    </div> 
                                    <div>
                                        <label htmlFor="hrs" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hours</label>
                                        <input 
                                            type="number" 
                                            id="hrs" 
                                            name="hrs"
                                            min="0"
                                            value={newSubjectData.hrs}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder="Hours"  />
                                    </div>      
                                </div>                                                                                                                                                                                          
                            </div>                                                                                                                                                                            
                        </div>
                        {/* Modal footer */}
                        <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            <button 
                                onClick={onClose} 
                                className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Close
                            </button>
                        </div>
                    </form> 
                </div>
                </div>,
    document.body
  );
};
export default AddSubjectModal;


