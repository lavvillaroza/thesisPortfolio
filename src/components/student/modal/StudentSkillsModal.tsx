import React, { useState } from 'react';
import { StudentSkillModel } from '../../../models/StudentSkill';
import ReactDOM from 'react-dom';
import CustomToast from '../../common/CustomToast';
import { addStudentSkill } from '../../../api/studentApi';
import { FaStar } from 'react-icons/fa';

interface StudentSkillsModalProps {
  userId: number;
  isOpen: boolean;
  onClose: () => void;
  onSkillAdded: () => void; 
}

const iniStudentSkill: StudentSkillModel = {
  id: 0,
  userId: 0,
  skillName: '',
  skillRating: 0,
};

const StudentSkillsModal: React.FC<StudentSkillsModalProps> = ({ userId, isOpen, onClose, onSkillAdded}) => {
  const [newSkillData, setNewSkillData] = useState<StudentSkillModel>(iniStudentSkill);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formInfoData = new FormData();
    formInfoData.append('id', newSkillData.id.toString());
    formInfoData.append('userId', userId.toString());
    formInfoData.append('skillName', newSkillData.skillName);
    formInfoData.append('skillRating', newSkillData.skillRating.toString());

    try {
      await addStudentSkill(formInfoData);
      setToast({ message: 'Information updated successfully', type: 'success' });      
      setTimeout(() => {
        setToast(null);
        onSkillAdded();
        onClose();
      }, 500);      
    } catch (error) {
      setToast({ message: 'Error updating information: ' + error, type: 'error' });
    }
  };

  const handleSkillNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSkillData({ ...newSkillData, skillName: e.target.value });
  };

  const handleSkillRatingChange = (rating: number) => {
    setNewSkillData({ ...newSkillData, skillRating: rating });
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white p-8 rounded-lg shadow-lg w-[50%] md:w-[30%]">
          <div className="flex items-center justify-between p-1 border-b rounded-t dark:border-gray-600">
            <FaStar className="w-6 h-6 text-yellow-300" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add Your Skill</h3>
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
            <div className="mb-4">
              <label htmlFor="skillName" className="block text-gray-700 text-sm font-bold mb-2">
                Skill Name
              </label>
              <input
                type="text"
                id="skillName"
                value={newSkillData.skillName}
                onChange={handleSkillNameChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Skill"
                maxLength={20}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Rating</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleSkillRatingChange(0)}
                  className={`px-4 py-2 rounded ${
                    newSkillData.skillRating === 0 ? 'bg-yellow-400 text-yellow-800' : 'bg-gray-200'
                  }`}
                >
                  Well
                </button>
                <button
                  type="button"
                  onClick={() => handleSkillRatingChange(1)}
                  className={`px-4 py-2 rounded ${
                    newSkillData.skillRating === 1 ? 'bg-blue-400 text-blue-800' : 'bg-gray-200'
                  }`}
                >
                  Better
                </button>
                <button
                  type="button"
                  onClick={() => handleSkillRatingChange(2)}
                  className={`px-4 py-2 rounded ${
                    newSkillData.skillRating === 2 ? 'bg-green-400 text-green-800' : 'bg-gray-200'
                  }`}
                >
                  Best
                </button>
              </div>
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

export default StudentSkillsModal;
