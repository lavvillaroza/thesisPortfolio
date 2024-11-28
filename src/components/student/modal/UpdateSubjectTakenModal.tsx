import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import CustomToast from '../../common/CustomToast';
import { updateStudentSubjectTaken } from '../../../api/studentApi';
import { FaBookOpen } from 'react-icons/fa';
import { StudentSubjectTakenModel } from '../../../models/StudentSubjectTakenModel';

interface SubjectTakenModalProps {
  subjectTaken: StudentSubjectTakenModel;
  isOpen: boolean;
  onClose: () => void;
  onSubjectUpdate: () => void;
}

const UpdateSubjectTakenModal: React.FC<SubjectTakenModalProps> = ({
  subjectTaken,
  isOpen,
  onClose,
  onSubjectUpdate,
}) => {
  const [updatedStudentSubjectData, setUpdatedStudentSubjectData] = useState<StudentSubjectTakenModel | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (isOpen && subjectTaken) {
      setUpdatedStudentSubjectData(subjectTaken);
    }
  }, [isOpen, subjectTaken]);

  const handleStatusChange = (status: number) => {
    if (updatedStudentSubjectData) {
      setUpdatedStudentSubjectData({ ...updatedStudentSubjectData, subjectStatus: status });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updatedStudentSubjectData) return;
    
    const formData = new FormData();
    formData.append('id', updatedStudentSubjectData.id.toString());
    formData.append('userId', updatedStudentSubjectData.userId.toString());
    formData.append('subjectId', updatedStudentSubjectData.subjectId.toString());
    formData.append('subjectName', updatedStudentSubjectData.subjectName);
    formData.append('subjectDescription', updatedStudentSubjectData.subjectDescription);
    formData.append('subjectStatus', updatedStudentSubjectData.subjectStatus.toString());
    try {
      await updateStudentSubjectTaken(formData);
      setToast({ message: 'Subject updated successfully', type: 'success' });
      onSubjectUpdate();
      setTimeout(() => {
        setToast(null);
        onClose();
      }, 500);
    } catch (error) {
      setToast({ message: `Error: ${error}`, type: 'error' });
    }
  };

  if (!isOpen || !updatedStudentSubjectData) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white p-8 rounded-lg shadow-lg w-[50%] md:w-[40%]">
          <div className="flex items-center justify-between p-1 border-b rounded-t">
            <FaBookOpen className="w-6 h-6 text-yellow-300" />
            <h3 className="text-xl font-medium text-gray-900">Update Subject Status</h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              onClick={onClose}
            >
              <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col p-4 space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Subject Name</label>
                <input
                  type="text"
                  value={updatedStudentSubjectData.subjectName}
                  readOnly
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Subject Description</label>
                <input
                  type="text"
                  value={updatedStudentSubjectData.subjectDescription}
                  readOnly
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Status</label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => handleStatusChange(0)}
                    className={`px-4 py-2 rounded ${
                      updatedStudentSubjectData.subjectStatus === 0 ? 'bg-yellow-300 text-yellow-800' : 'bg-gray-200'
                    }`}
                  >
                    On-Going
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(1)}
                    className={`px-4 py-2 rounded ${
                      updatedStudentSubjectData.subjectStatus === 1 ? 'bg-green-400 text-green-800' : 'bg-gray-200'
                    }`}
                  >
                    Passed
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(2)}
                    className={`px-4 py-2 rounded ${
                      updatedStudentSubjectData.subjectStatus === 2 ? 'bg-red-400 text-red-800' : 'bg-gray-200'
                    }`}
                  >
                    Failed
                  </button>
                </div>
              </div>
            </div>
           {/* Modal footer */}
           <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b">
                <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                <button 
                    onClick={onClose} 
                    className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
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

export default UpdateSubjectTakenModal;
