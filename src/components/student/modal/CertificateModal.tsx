import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import CustomToast from '../../common/CustomToast';
import { addStudentCertificate } from '../../../api/studentApi';
import { FaCertificate } from 'react-icons/fa';
import { StudentCertAndRecogModel } from '../../../models/StudentCertiAndRecogModel';

interface StudentCertModalProps {
  userId: number;
  isOpen: boolean;
  onClose: () => void;
  onCertAdded: () => void; 
}

const iniStudentCertAndRecog: StudentCertAndRecogModel = {
  id: 0,
  userId: 0,
  name: '',
  attachment: '',
  attachmentFile: null,
  certRecogType: 1,
};

const CertificateModal: React.FC<StudentCertModalProps> = ({ userId, isOpen, onClose, onCertAdded}) => {
  const [newCertData, setNewCertData] = useState<StudentCertAndRecogModel>(iniStudentCertAndRecog);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [attachedFile, setAttachedFile] = useState<File>(); // Array to handle multiple images
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();    
    const formData = new FormData();
    formData.append('id', newCertData.id.toString());
    formData.append('userId', userId.toString());
    formData.append('name', newCertData.name);
    formData.append('certRecogType', '1');    

    if (attachedFile) {
        formData.append('attachment', attachedFile.name);
        formData.append('attachmentFile', attachedFile);
    }    
    for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
    try {
      await addStudentCertificate(formData);
      setToast({ message: 'Certificate Added successfully', type: 'success' });      
      setTimeout(() => {
        setToast(null);
        onCertAdded();
        onClose();
      }, 500);      
    } catch (error) {
      setToast({ message: '' + error, type: 'error' });
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCertData({ ...newCertData, name: e.target.value });
  };
  const handleAttachementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];    
    if (file) {
        setAttachedFile(file);
    }   
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white p-8 rounded-lg shadow-lg w-[50%] md:w-[25%]">
          <div className="flex items-center justify-between p-1 border-b rounded-t">
            <FaCertificate className="w-6 h-6 text-yellow-300" />
            <h3 className="text-xl font-medium text-gray-900">Add Your Certificate</h3>
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
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={newCertData.name}
                onChange={handleNameChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Certificate Name"
                maxLength={50}
                required
              />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="attachementFile">
                        Attach Certificate
                </label>                                                              
                <input
                    className="shadow block w-full mb-5 text-sm text-gray-900 appearance-none border rounded cursor-pointer "
                    id="attachementFile"
                    name="attachementFile"
                    type="file"                                        
                    accept=".jpeg,.jpg,.pdf"
                    onChange={handleAttachementChange}/> 
            </div>
            <div className="flex items-center justify-end space-x-4">
              <button className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded" type="submit">
                Save
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-200 text-gray-100 font-bold py-2 px-4 rounded"
                type="button"
                onClick={onClose}>
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
export default CertificateModal;
