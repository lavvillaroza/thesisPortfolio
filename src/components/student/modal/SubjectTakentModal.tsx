import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import CustomToast from '../../common/CustomToast';
import { addStudentSubjectTaken } from '../../../api/studentApi';
import { FaBookOpen } from 'react-icons/fa';
import { StudentSubjectTakenModel } from '../../../models/StudentSubjectTakenModel';
import SearchBarDropdown from '../../common/SearchBarDropdownProps ';
import { fetchSubjectsAll } from '../../../api/subjectApi';
import { SubjectModel } from '../../../models/SubjectModel';

interface SubjectTakenModalProps {
  userId: number;
  isOpen: boolean;
  onClose: () => void;
  onSubjectAdd: () => void; 
}

interface DropdownItem {
    key: string | number;
    value: string;
}

const initialStudentSubject: StudentSubjectTakenModel = {
    id: 0,
    userId: 0,
    subjectId: 0,
    subjectName: '',
    subjectDescription: '',
    subjectStatus: 0,
    prereq: '',
    lec: 0,
    lab: 0,
    units: 0,
    hrs: 0
  }
  
const SubjectTakenModal: React.FC<SubjectTakenModalProps> = ({ userId, isOpen, onClose, onSubjectAdd}) => {
  const [newStudentSubjectData, setStudentSubjectData] = useState<StudentSubjectTakenModel>(initialStudentSubject);
  const [subjectsData, setSubjectsData] = useState<SubjectModel[]>([]);
  const [items, setItems] = useState<DropdownItem[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();    
    const formData = new FormData();
    formData.append('id', newStudentSubjectData.id.toString());
    formData.append('userId', userId.toString());
    formData.append('subjectId', newStudentSubjectData.subjectId.toString());
    formData.append('subjectName', newStudentSubjectData.subjectName);    
    formData.append('subjectDescription', newStudentSubjectData.subjectDescription);
    formData.append('prereq', newStudentSubjectData.prereq);
    formData.append('lec', newStudentSubjectData.lec.toString());
    formData.append('lab', newStudentSubjectData.lab.toString());
    formData.append('units', newStudentSubjectData.units.toString());
    formData.append('hrs', newStudentSubjectData.hrs.toString());
    formData.append('subjectStatus', newStudentSubjectData.subjectStatus.toString());
      
    for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

    try {
      await addStudentSubjectTaken(formData);
      setToast({ message: 'Subject Added successfully', type: 'success' });      
      setTimeout(() => {
        setToast(null);
        onSubjectAdd();
        onClose();
      }, 500);      
    } catch (error) {
      setToast({ message: '' + error, type: 'error' });
    }
  };
  

  useEffect(() => {
    const getSubjectsAll = async () => {        
        try {
            const subjectsResult = await fetchSubjectsAll();
            setSubjectsData(subjectsResult);            
            const subjectItems = subjectsResult.map((subject) => ({
              key: subject.id,
              value: subject.subjectName,
            }));            
            setItems(subjectItems);
        } catch (error) {
            console.error('Error fetching subjects data:', error);
        }
    };
    getSubjectsAll();
  }, []);
  
  const handleItemSelected = (item: DropdownItem) => {
    const selectedSubject = subjectsData.find((subject) => subject.id == item.key )
    if (selectedSubject) {
        const studentSubjectData: StudentSubjectTakenModel = {
            id: 0,
            userId: userId,
            subjectId: selectedSubject.id,
            subjectName: selectedSubject.subjectName,
            subjectDescription: selectedSubject.subjectDescription,
            subjectStatus: 0,
            prereq: selectedSubject.prereq,
            lec: selectedSubject.lec,
            lab: selectedSubject.lab,
            units: selectedSubject.units,
            hrs: selectedSubject.hrs
          }    
        setStudentSubjectData(studentSubjectData)
    }
   
  };
  const handleStatusChange = (status: number) => {
    setStudentSubjectData({ ...newStudentSubjectData, subjectStatus: status });
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white p-8 rounded-lg shadow-lg w-[50%] md:w-[40%]">
          <div className="flex items-center justify-between p-1 border-b rounded-t">
            <FaBookOpen className="w-6 h-6 text-yellow-300" />
            <h3 className="text-xl font-medium text-gray-900">Add Your Subject</h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              onClick={onClose}>
              <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col p-4 space-x-4">
                {/* Fillup Form Section */}                                
                <div className="flex gap-4 mb-6 md:flex-col">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Search Subject Name</label>
                        <SearchBarDropdown
                            items={items}
                            placeholder="Type to search..."
                            onItemSelected={handleItemSelected}
                        />
                    </div>
                    <div>                        
                        <label htmlFor="subjectName" className="block mb-2 text-sm font-medium text-gray-900">Subject Name</label>
                        <input 
                            type="text" 
                            id="subjectName" 
                            name="subjectName"
                            value={newStudentSubjectData.subjectName}
                            readOnly
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                            placeholder="Subject Name" 
                            required />
                        <input
                            type="hidden"
                            id="subjectId"
                            name="subjectId"
                            value={newStudentSubjectData.subjectId}
                            />
                    </div>
                    <div>
                        <label htmlFor="subjectDescription" className="block mb-2 text-sm font-medium text-gray-900">Subject Description</label>
                        <input 
                            type="text" 
                            id="subjectDescription" 
                            name="subjectDescription"
                            value={newStudentSubjectData.subjectDescription}
                            readOnly
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                            placeholder="Subject Description" 
                            required />
                    </div>    
                    <div className="col-span-2 grid gap-4 md:grid-cols-5">
                        <div>
                            <label htmlFor="prereq" className="block mb-2 text-sm font-medium text-gray-900">PreReq</label>
                            <input 
                                type="text" 
                                id="prereq" 
                                name="prereq"
                                value={newStudentSubjectData.prereq}
                                readOnly
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                                placeholder="PreReq"  />
                        </div> 
                        <div>
                            <label htmlFor="lec" className="block mb-2 text-sm font-medium text-gray-900">Lec</label>
                            <input 
                                type="number" 
                                id="lec" 
                                name="lec"
                                min="0"
                                value={newStudentSubjectData.lec}
                                readOnly
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                                placeholder="lec"  />
                        </div>
                        <div>
                            <label htmlFor="lab" className="block mb-2 text-sm font-medium text-gray-900">Lab</label>
                            <input 
                                type="number" 
                                id="lab" 
                                name="lab"
                                min="0"
                                value={newStudentSubjectData.lab}
                                readOnly
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                                placeholder="Lab"  />
                        </div> 
                        <div>
                            <label htmlFor="units" className="block mb-2 text-sm font-medium text-gray-900">Units</label>
                            <input 
                                type="number" 
                                id="units" 
                                name="units"
                                min="0"
                                value={newStudentSubjectData.units}
                                readOnly
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                                placeholder="units"  />
                        </div> 
                        <div>
                            <label htmlFor="hrs" className="block mb-2 text-sm font-medium text-gray-900">Hours</label>
                            <input 
                                type="number" 
                                id="hrs" 
                                name="hrs"
                                min="0"
                                value={newStudentSubjectData.hrs}
                                readOnly
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                                placeholder="Hours"  />
                        </div>      
                    </div>  
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">Status</label>
                      <div className="flex space-x-4">
                        <button
                          type="button"
                          onClick={() => handleStatusChange(0)}
                          className={`px-4 py-2 rounded ${
                            newStudentSubjectData.subjectStatus === 0 ? 'bg-yellow-300 text-yellow-800' : 'bg-gray-200'
                          }`}
                        >
                          On-Going
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(1)}
                          className={`px-4 py-2 rounded ${
                            newStudentSubjectData.subjectStatus === 1 ? 'bg-green-400 text-green-800' : 'bg-gray-200'
                          }`}
                        >
                          Passed
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(2)}
                          className={`px-4 py-2 rounded ${
                            newStudentSubjectData.subjectStatus === 2 ? 'bg-red-400 text-red-800' : 'bg-gray-200'
                          }`}
                        >
                          Failed
                        </button>
                      </div>
                    </div>                                                                                                                                                                                        
                </div>                                                                                                                                                                            
            </div>
            {/* Modal footer */}
            <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b">
                <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                <button 
                    onClick={onClose} 
                    className="text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Close
                </button>
            </div>
        </form>
        </div>
      </div>
      {toast && <CustomToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>,
    document.body
  );
};
export default SubjectTakenModal;
