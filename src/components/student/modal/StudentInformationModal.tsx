import React, { useState, useEffect } from 'react';
import { StudentInformationModel } from '../../../models/StudentInformationModel';
import { addOrUpdateStudentInformation } from '../../../api/studentApi';
import ReactDOM from 'react-dom';
import { FaInfo } from 'react-icons/fa6';
import CustomToast from '../../common/CustomToast';

interface StudentInformationModalProps {   
  userId: number; 
  isOpen: boolean;
  onClose: () => void;
  studentInformation: StudentInformationModel | null;  // New prop for student information
}

const iniStudentInformation: StudentInformationModel = {
  id: 0,
  aboutMe: '',
  userId: 0,
  coverPhotoOne: '',
  coverPhotoTwo: '',
  coverPhotoThree: '',
  coverPhotoFour: '',
  coverPhotoOneFile: null,
  coverPhotoTwoFile: null,
  coverPhotoThreeFile: null,
  coverPhotoFourFile: null,
};

const StudentInformationModal: React.FC<StudentInformationModalProps> = ({ userId, isOpen, onClose, studentInformation }) => {  
  const [formData, setFormData] = useState<StudentInformationModel>(iniStudentInformation);  
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Use the passed studentInformation prop instead of fetching
    if (studentInformation) {
      setFormData(studentInformation);
    }
  }, [isOpen, studentInformation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>, 
    coverPhotoField: 'coverPhotoOne' | 'coverPhotoTwo' | 'coverPhotoThree' | 'coverPhotoFour'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
  
      setFormData(prev => ({
        ...prev,
        [coverPhotoField]: blobUrl,  // Set the display URL for the image
        [`${coverPhotoField}File` as keyof StudentInformationModel]: file, // Store the actual file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formInfoData = new FormData();    
    // Append text fields
    formInfoData.append('id', formData.id.toString());
    formInfoData.append('aboutMe', formData.aboutMe);
    formInfoData.append('userId', userId.toString());

    formInfoData.append('coverPhotoOne', formData.coverPhotoOne)
    formInfoData.append('coverPhotoTwo', formData.coverPhotoTwo)
    formInfoData.append('coverPhotoOne', formData.coverPhotoThree)
    formInfoData.append('coverPhotoThree', formData.coverPhotoFour)

    // Append file fields if they exist
    formData.coverPhotoOneFile && formInfoData.append('coverPhotoOneFile', formData.coverPhotoOneFile);
    formData.coverPhotoTwoFile && formInfoData.append('coverPhotoTwoFile', formData.coverPhotoTwoFile);
    formData.coverPhotoThreeFile && formInfoData.append('coverPhotoThreeFile', formData.coverPhotoThreeFile);
    formData.coverPhotoFourFile && formInfoData.append('coverPhotoFourFile', formData.coverPhotoFourFile);

    try {
      await addOrUpdateStudentInformation(formInfoData);
      setToast({ message: 'Information updated successfully', type: 'success' });
      setTimeout(() => {
        setToast(null);
        onClose();
      }, 3000);
    } catch (error) {
      setToast({ message: 'Error updating information: ' + error, type: 'error' });
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white p-8 rounded-lg shadow-lg w-[50%] md:w-[30%]">
          <div className="flex items-center justify-between p-1 border-b rounded-t dark:border-gray-600">
            <FaInfo className="w-6 h-6 text-gray-900 dark:text-white" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update Information</h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="my-4">
                <label htmlFor="aboutMe" className="block text-gray-700 text-sm font-bold mb-2">About Me</label>
                <textarea
                  id="aboutMe"
                  name="aboutMe"
                  value={formData.aboutMe}
                  onChange={handleChange}
                  className="max-h-48 overflow-y-auto shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
                  placeholder="Enter About Me"
                  rows={4}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="coverPhotoOne" className="block text-gray-700 text-sm font-bold mb-2">
                  Cover Photo One
                </label>                
                <input
                  type="file"
                  id="coverPhotoOne"
                  name="coverPhotoOne"                   
                  className="shadow block w-full mb-5 text-sm text-gray-900 appearance-none border rounded cursor-pointer "
                  onChange={(e) => handleFileChange(e, 'coverPhotoOne')}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="coverPhotoTwo" className="block text-gray-700 text-sm font-bold mb-2">
                  Cover Photo Two
                </label>                
                <input
                  type="file"
                  id="coverPhotoTwo"
                  name="coverPhotoTwo"                  
                  className="shadow block w-full mb-5 text-sm text-gray-900 appearance-none border rounded cursor-pointer "
                  onChange={(e) => handleFileChange(e, 'coverPhotoTwo')}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="coverPhotoThree" className="block text-gray-700 text-sm font-bold mb-2">
                  Cover Photo Three
                </label>               
                <input
                  id="coverPhotoThree"
                  name="coverPhotoThree"
                  type="file"                  
                  className="shadow block w-full mb-5 text-sm text-gray-900 appearance-none border rounded cursor-pointer "
                  onChange={(e) => handleFileChange(e, 'coverPhotoThree')}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="coverPhotoFour" className="block text-gray-700 text-sm font-bold mb-2">
                  Cover Photo Four
                </label>                
                <input
                  id="coverPhotoFour"
                  name="coverPhotoFour"
                  type="file"                  
                  className="shadow block w-full mb-5 text-sm text-gray-900 appearance-none border rounded cursor-pointer "
                  onChange={(e) => handleFileChange(e, 'coverPhotoFour')}
                />
              </div>
              <div className="flex items-center justify-end space-x-4">
                <button className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded" type="submit">
                  Save
                </button>
                <button
                  className="bg-red-500 hover:bg-red-200 text-gray-100 font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={onClose}
                >
                  Back
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

export default StudentInformationModal;
