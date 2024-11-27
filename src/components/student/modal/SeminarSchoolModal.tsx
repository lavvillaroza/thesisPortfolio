import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import CustomToast from '../../common/CustomToast';
import { addStudentSeminar, fetchSeminarsByStudentUserId } from '../../../api/studentApi';
import { FaUserFriends } from 'react-icons/fa';
import { StudentSeminarModel } from '../../../models/StudentSeminarModel';
import { Datepicker } from 'flowbite';
import SearchBarDropdown from '../../common/SearchBarDropdownProps ';

interface SeminarSchoolModalProps {
  userId: number;
  isOpen: boolean;
  onClose: () => void;
  onSeminarAdd: () => void;
}

interface DropdownItem {
  key: string | number;
  value: string;
}

const initialStudentSeminar: StudentSeminarModel = {
  id: 0,
  userId: 0,
  title: '',
  facilitator: '',
  dateAttended: new Date(),
  reflection: '',
  seminarType: 0,
  seminarId: 0,
};

const SeminarSchoolModal: React.FC<SeminarSchoolModalProps> = ({ userId, isOpen, onClose, onSeminarAdd }) => {
  const [newStudentSeminarData, setStudentSeminarData] = useState<StudentSeminarModel>(initialStudentSeminar);
  const [seminarsData, setSeminarsData] = useState<StudentSeminarModel[]>([]);
  const [items, setItems] = useState<DropdownItem[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [dateAttended, setDateAttended] = useState<string>('');
  

  useEffect(() => {
    const $datepickerEl = document.getElementById('datepicker-custom') as HTMLInputElement;
  
    if ($datepickerEl) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const datepicker = new Datepicker($datepickerEl, {
        autohide: true,
        format: 'mm/dd/yyyy',
        orientation: 'bottom',
        buttons: true,
        onHide: () => {
          const selectedDate = $datepickerEl.value;
          setDateAttended(selectedDate || ''); // Ensure it’s never undefined
        },
      });
  
      const today = new Date().toLocaleDateString('en-US');
      $datepickerEl.value = today;
      setDateAttended(today); // Initialize state with today's date
    }
  }, []);
  
  useEffect(() => {
    const getSeminarsByUserId = async () => {
      try {
        const seminarsResult = await fetchSeminarsByStudentUserId(userId);
        setSeminarsData(seminarsResult);
        const seminarItems = seminarsResult.map((seminar) => ({
          key: seminar.id,
          value: seminar.title,
        }));
        setItems(seminarItems);
      } catch (error) {
        console.error('Error fetching seminars data:', error);
      }
    };
    getSeminarsByUserId();
  }, [userId]);

  const handleItemSelected = (item: DropdownItem) => {
    const selectedSeminar = seminarsData.find((seminar) => seminar.id === item.key);
    if (selectedSeminar) {
      setStudentSeminarData((prevData) => ({
        ...prevData,
        title: selectedSeminar.title || '',
        facilitator: 'School', // Ensure this is not undefined
        seminarId: selectedSeminar.seminarId || 0,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(newStudentSeminarData);
    const formData = new FormData();
    formData.append('id', newStudentSeminarData.id.toString());
    formData.append('userId', userId.toString());
    formData.append('title', newStudentSeminarData.title);
    formData.append('facilitator', newStudentSeminarData.facilitator);
    formData.append('dateAttended', dateAttended);
    formData.append('reflection', newStudentSeminarData.reflection);
    formData.append('seminarType', newStudentSeminarData.seminarType.toString());
    formData.append('seminarId', newStudentSeminarData.seminarId.toString());

    try {
      await addStudentSeminar(formData);
      setToast({ message: 'Seminar added successfully!', type: 'success' });
      setTimeout(() => {
        setToast(null);
        onSeminarAdd();
        onClose();
      }, 500);
    } catch (error) {
      setToast({ message: `Error: ${error}`, type: 'error' });
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white p-8 rounded-lg shadow-lg w-[50%] md:w-[40%]">
          <div className="flex items-center justify-between p-1 border-b rounded-t">
            <FaUserFriends className="w-6 h-6 text-yellow-300" />
            <h3 className="text-xl font-medium text-gray-900">Add School Seminar</h3>
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
              <div className="flex gap-4 mb-6 md:flex-col">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Search Seminar Title
                  </label>
                  <SearchBarDropdown
                    items={items}
                    placeholder="Type to search..."
                    onItemSelected={handleItemSelected}
                  />
                </div>
                <div>
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newStudentSeminarData.title}
                    readOnly
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Seminar Title"
                    required
                  />
                  <input type="hidden" id="seminarId" name="seminarId" value={newStudentSeminarData.seminarId} />
                </div>
                <div>
                  <label htmlFor="facilitator" className="block mb-2 text-sm font-medium text-gray-900">
                    Facilitator
                  </label>
                  <input
                    type="text"
                    id="facilitator"
                    name="facilitator"
                    value={newStudentSeminarData.facilitator}
                    readOnly
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Facilitator"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="dateAttended" className="block mb-2 text-sm font-medium text-gray-900">
                    Date Attended
                  </label>
                  <div className="relative max-w-sm">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 0 0-1 1v1H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-.001V3a1 1 0 1 0-2 0v1H7V3a1 1 0 0 0-1-1ZM4 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7Zm5 2.5A1.5 1.5 0 1 0 8.5 11 1.5 1.5 0 0 0 9 9.5ZM11.293 11a.5.5 0 0 0-.5.5.5.5 0 0 0 .146.354l2 2a.5.5 0 0 0 .707 0 .5.5 0 0 0 0-.707l-2-2a.5.5 0 0 0-.354-.147Zm-5 0a.5.5 0 0 0-.5.5.5.5 0 0 0 .146.354l2 2a.5.5 0 0 0 .707 0 .5.5 0 0 0 0-.707l-2-2a.5.5 0 0 0-.354-.147Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="datepicker-custom"
                      className="datepicker-input bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                      placeholder="Select date"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="reflection" className="block mb-2 text-sm font-medium text-gray-900">
                    Reflection
                  </label>
                  <textarea
                      id="reflection"
                      name="reflection"
                      rows={4}
                      value={newStudentSeminarData.reflection || ''} // Default to empty string if undefined
                      onChange={(e) =>
                        setStudentSeminarData({
                          ...newStudentSeminarData,
                          reflection: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Write your reflection..."
                      required>

                  </textarea>
                </div>
              </div>
            </div>
            <div className="flex justify-end px-4 py-3 gap-2">
              <button
                type="submit"
                className="inline-block rounded-md border bg-green-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700">
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-block rounded-md border bg-gray-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700">
                Cancel
              </button>
            </div>
          </form>
          {toast && <CustomToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
      </div>
    </>,
    document.body
  );
};

export default SeminarSchoolModal;
