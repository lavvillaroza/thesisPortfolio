import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Header from './Header';
import Sidebar from './Sidebar';
import CustomTableStudentList from '../common/CustomTableStudentList';
import SmallModal from '../common/SmallModal'; // Assuming you have a modal component

interface Student {
  name: string;
  course: string;
  yearLevel: string;
  section: string;
}

const initialStudentList: Student[] = [
  { name: "John Doe", course: "BSIT", yearLevel: "1st", section: "A" },
  { name: "Jane Smith", course: "BSCS", yearLevel: "2nd", section: "B" },
  { name: "Michael Johnson", course: "BSIT", yearLevel: "3rd", section: "C" },
  { name: "Emily Davis", course: "BSCS", yearLevel: "4th", section: "D" },
  { name: "Chris Brown", course: "BSIT", yearLevel: "2nd", section: "A" },
  // Add remaining students...
];

const StudentManagement: React.FC = () => {
  const [studentList, setStudentList] = useState<Student[]>(initialStudentList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState<Student>({ name: '', course: '', yearLevel: '', section: '' });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.course && newStudent.yearLevel && newStudent.section) {
      setStudentList([...studentList, newStudent]);
      setNewStudent({ name: '', course: '', yearLevel: '', section: '' });
      closeModal();
    }
  };

  return (
    <div className="flex flex-col bg-gray-300 py-2 min-h-screen w-full ">
      <Header />
      <div className="flex flex-col md:flex-row bg-background text-foreground mx-auto w-9/12 h-[700px]">
        <Sidebar />
        <main className="flex-1 mx-auto w-8/12 h-[700px] bg-green-700 bg-gradient-to-br from-emerald-600 ">
          <div className="h-[60px] p-4">              
          </div> 
          <div className="grid grid-cols-4 gap-4 h-[600px] p-6">
            <div className="col-span-4 bg-gray-100 p-2 overflow-y-scroll scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100">
              <div className="container mx-auto p-4 drop-shadow-lg ">
                <div className="flex justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-700">Student List</h2>
                  <button
                    onClick={openModal}
                    className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                  >
                    Add Student
                  </button>
                </div>
                <CustomTableStudentList data={studentList} />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Student Modal */}
      <SmallModal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={newStudent.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none"
            placeholder="Enter Student Name"
          />
          <select
            name="course"
            value={newStudent.course}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none"
          >
            <option value="">Select Course</option>
            <option value="BSIT">BSIT</option>
            <option value="BSCS">BSCS</option>
          </select>
          <select
            name="yearLevel"
            value={newStudent.yearLevel}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none"
          >
            <option value="">Select Year Level</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
          </select>
          <input
            type="text"
            name="section"
            value={newStudent.section}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none"
            placeholder="Enter Section"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAddStudent}
            className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </SmallModal>
    </div>
  );
};

export default StudentManagement;
