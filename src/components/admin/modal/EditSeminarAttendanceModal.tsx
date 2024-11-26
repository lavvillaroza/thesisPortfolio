import { useState } from "react";
import ReactDOM from "react-dom";
import { AnnouncementAttendeeModel } from "../../../models/AnnouncementAttendeeModel";


interface EditSeminarAttendeeModalProps {
  isOpen: boolean;
  attendeeData: AnnouncementAttendeeModel;
  onClose: () => void;
  onSave: (updatedData: AnnouncementAttendeeModel) => void;
}

const EditSeminarAttendeeModal: React.FC<EditSeminarAttendeeModalProps> = ({
  isOpen,
  attendeeData,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState(attendeeData);
  const [status, setStatus] = useState<number>(attendeeData.studentAttendanceStatus);

  if (!isOpen) return null;

  const handleStatusChange = (newStatus: number) => {
    setStatus(newStatus);
    setFormData({ ...formData, studentAttendanceStatus: newStatus });
  };

  const handleSave = () => {
    onSave({ ...formData, studentAttendanceStatus: status });
    onClose();
  };
  const getYearString = (year: string): string => {
    switch (year) {
      case '1':
        return '1st Year';
      case '2':
        return '2nd Year';
      case '3':
        return '3rd Year';
      case '4':
        return '4th Year';
      default:
        return `${year}th Year`;
    }
  };
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[40%]">
        <h3 className="text-xl font-medium text-gray-900 mb-4">Edit Attendee</h3>
        {/* Readonly Fields */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Student Name</label>
          <input
            type="text"
            value={formData.studentName}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Course</label>
          <input
            type="text"
            value={formData.studentCourse}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Year Level</label>
          <input
            type="text"
            value={getYearString(formData.studentYearLevel)}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 sm:text-sm"
          />
        </div>

        {/* Status Buttons */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Attendance Status</label>
          <div className="mt-2 flex space-x-2">
            <button
              onClick={() => handleStatusChange(1)}
              className={`px-4 py-2 rounded-lg ${
                status === 1 ? "bg-yellow-100 text-yellow-800" : "bg-gray-200"
              }`}
            >
              Registered
            </button>
            <button
              onClick={() => handleStatusChange(3)}
              className={`px-4 py-2 rounded-lg ${
                status === 3 ? "bg-emerald-100 text-emerald-800" : "bg-gray-200"
              }`}
            >
              Attended
            </button>
            <button
              onClick={() => handleStatusChange(2)}
              className={`px-4 py-2 rounded-lg ${
                status === 2 ? "bg-red-100 text-red-800" : "bg-gray-200"
              }`}
            >
              Absent
            </button>
            
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-6 space-x-3">\
          <button onClick={handleSave} className="px-4 py-2 bg-emerald-600 text-white rounded-lg">
            Save
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">
            Cancel
          </button>          
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EditSeminarAttendeeModal;
