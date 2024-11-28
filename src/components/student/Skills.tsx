import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
import { fetchStudentSkills, deleteStudentSkill, fetchStudentFutureCareers, fetchCourseProgressByStudentUserId } from '../../api/studentApi'; // Import your API function
import NavHeader from './NavHeader';
import StudentSkillsModal from './modal/StudentSkillsModal';
import ConfirmationModal from '../common/ConfirmationModal'; // Add the Confirmation Modal Component
import { useNavigate } from 'react-router-dom';
import { StudentSkillModel } from '../../models/StudentSkill';
import CustomToast from '../common/CustomToast';
import { PredictedCareerModel } from '../../models/PredictedCareerModel';
import { StudentCourseWithSubjectsModel } from '../../models/StudentCourseWithSubjectsModel';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { checkTokenAndLogout } from '../../utils/jwtUtil';

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const initialStudentCourseProgress: StudentCourseWithSubjectsModel = {
  id: 0,
  courseName: '',
  courseCode: '',
  totalUnitsRequired: 0,
  subjectsTaken: [],  
};

const Skills: React.FC = () => {
  const [studentCourseProgress, setStudentCourseProgress] = useState<StudentCourseWithSubjectsModel>(initialStudentCourseProgress);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [studentSkills, setStudentSkills] = useState<StudentSkillModel[]>([]);
  const [futureCareers, setFutureCareers] = useState<PredictedCareerModel[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<StudentSkillModel | null>(null);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleEditMode = () => setIsEditMode((prev) => !prev);

  const fetchData = async () => {        
    const user = localStorage.getItem('userDetails');
      if (checkTokenAndLogout()) {
        navigate("/");
        return;
      }  
      try {
          if (user) {
              const userParse = JSON.parse(user);
              // Run both data fetching functions concurrently
              const [studentSkillsData, studentFutureCareersData, studentCourseProgData] = await Promise.all([
                fetchStudentSkills(userParse.userid),
                fetchStudentFutureCareers(userParse.userid),
                fetchCourseProgressByStudentUserId(userParse.userid)
            ]);                
              setStudentSkills(studentSkillsData);
              setFutureCareers(studentFutureCareersData);   
              setStudentCourseProgress(studentCourseProgData);
              setUserId(userParse.userid);
          } else {
              navigate("/");
          }
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };

  const confirmDeleteSkill = (skill: StudentSkillModel) => {
    setSelectedSkill(skill);
    setIsConfirmModalOpen(true);
  };

  const handleDeleteSkill = async () => {
    if (selectedSkill) {
      try {
        await deleteStudentSkill(selectedSkill.id); // Call API to delete skill
        setIsConfirmModalOpen(false);
        setSelectedSkill(null);
        fetchData(); // Refresh skill list
        setToast({ message: 'Skill ' + selectedSkill.skillName +  ' deleted sucessfully', type: 'success' });
      } catch (error) {
        setToast({ message: 'Error deleting skills: ' + error, type: 'error' });        
      }
    }
  };

  useEffect(() => {        
    fetchData();    
  }, []);

  const computeCourseProgress = () => {
    if (!studentCourseProgress || !studentCourseProgress.subjectsTaken) {
      return { completedUnits: 0, ongoingUnits: 0, remainingUnits: 0 };
    }    
  
    const completedUnits = studentCourseProgress.subjectsTaken
      .filter((subject) => subject.subjectStatus === 1)
      .reduce((sum, subject) => sum + subject.units, 0);
  
    const ongoingUnits = studentCourseProgress.subjectsTaken
      .filter((subject) => subject.subjectStatus === 0)
      .reduce((sum, subject) => sum + subject.units, 0);
  
    const remainingUnits = studentCourseProgress.totalUnitsRequired - completedUnits - ongoingUnits;    
    return { completedUnits, ongoingUnits, remainingUnits };
  };

  const { completedUnits, ongoingUnits, remainingUnits } = computeCourseProgress();
  const pieData = {
    labels: ['Completed', 'Ongoing', 'Remaining'],
    datasets: [
      {
        label: 'Units Progress',
        data: [completedUnits, ongoingUnits, remainingUnits],
        backgroundColor: ['#10B981', '#F59E0B', '#EF4444'], // Green, Yellow, Red
        hoverOffset: 4,
      },
    ],
  };

  
  return (
    <div className="font-roboto flex p-4 md:flex md:flex-col bg-gray-100 py-2 min-h-screen min-w-screen w-full">
      <div className="flex-1 m-auto">
        <NavHeader />
        <div className="flex flex-col md:flex-col bg-background text-foreground mx-auto w-full h-full md:h-[750px] overflow-y-auto scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100">
          <main className="flex-1 w-full md:w-[1100px] md:h-full mx-auto h-full bg-green-700 bg-gradient-to-br from-emerald-600 rounded transition-all duration-200">
            <div className="flex flex-col-reverse md:flex-row gap-4 min-h-[700px] px-6 pt-10">
              <div className="flex-auto w-full md:w-72 bg-gray-100 p-1 overflow-y-auto scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100 rounded transition-all duration-200">
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="mb-4 flex items-center">
                        <label className="text-gray-700 text-left mx-2 text-2xl">SKILLS</label>
                        <button
                          onClick={openModal}
                          className="hover:text-emerald-800 text-emerald-700 font-lg text-xl  transition duration-150 ease-in-out">
                          <FaPlusCircle />
                        </button>
                        <button
                          onClick={toggleEditMode}
                          className="ml-2 hover:text-emerald-800 text-emerald-700 font-lg text-xl  transition duration-150 ease-in-out">
                          <FaEdit />
                        </button>
                      </div>
                      <div className="p-4 w-full m-auto h-[570px] bg-white drop-shadow-md rounded-lg overflow-auto">
                        <div className="flex justify-end">
                          <span className="flex items-center text-sm font-medium text-gray-900 me-3">
                            <span className="flex w-2.5 h-2.5 bg-yellow-300 rounded-full me-1.5 flex-shrink-0"></span>
                            Well
                          </span>
                          <span className="flex items-center text-sm font-medium text-gray-900 me-3">
                            <span className="flex w-2.5 h-2.5 bg-blue-600 rounded-full me-1.5 flex-shrink-0"></span>
                            Better
                          </span>
                          <span className="flex items-center text-sm font-medium text-gray-900 me-3">
                            <span className="flex w-2.5 h-2.5 bg-green-600 rounded-full me-1.5 flex-shrink-0"></span>
                            Best
                          </span>
                        </div>
                        <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" />
                          <div className="grid grid-cols-2">
                            {studentSkills.map((item) => (
                              <div key={item.id} className="py-2 flex justify-between items-center">
                                <span className="flex items-center text-sm font-medium text-gray-900">
                                  <span
                                    className={`flex w-2.5 h-2.5 ${
                                      item.skillRating === 0
                                        ? 'bg-yellow-300'
                                        : item.skillRating === 1
                                        ? 'bg-blue-600'
                                        : 'bg-green-600'
                                    } rounded-full me-1.5 flex-shrink-0`}
                                  ></span>
                                  {item.skillName}
                                </span>
                                {isEditMode && (
                                  <button
                                    onClick={() => confirmDeleteSkill(item)}
                                    className="text-red-700 hover:text-red-700 mr-2">
                                    <FaTrashAlt />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>                            
                      </div>                      
                    </div>
                    <div>
                      <div className="mb-4">
                        <label className="text-gray-700 text-left mx-2 text-2xl">FUTURE CAREERS <span className="italic text-sm text-emerald-700">powered by AI</span></label>                                      
                      </div>
                      <div className="p-4 w-full m-auto h-[250px] bg-white drop-shadow-md rounded-lg overflow-auto">
                        <div className="grid grid-cols-2">
                          {futureCareers.map((item) => (
                              <div key={item.predictedCareer} className="py-2 flex justify-between items-center">
                                <span className="flex items-center text-sm font-medium text-gray-900">
                                  <span
                                    className={`flex w-2.5 h-2.5 bg-green-600 rounded-full me-1.5 flex-shrink-0`}
                                  ></span>
                                  {item.predictedCareer}
                                </span>                               
                              </div>
                            ))}
                        </div>                        
                      </div>
                      <div className="mt-4 mb-2">
                        <label className="text-gray-700 text-left mx-2 text-2xl">{studentCourseProgress.courseCode} Progress</label>
                      </div>
                      <div className="p-4 w-full m-auto h-[260px] bg-white drop-shadow-md rounded-lg overflow-auto">
                        <div className="grid grid-cols-2 items-center">
                          {/* Pie Chart Section */}
                          <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow">
                            <Pie data={pieData} />
                          </div>

                          {/* Labels Section */}
                          <div className="ml-4">
                            <p className="text-sm flex items-center"><span className="text-green-500 mr-2">●</span> Completed: {completedUnits} units</p>
                            <p className="text-sm flex items-center"><span className="text-yellow-500 mr-2">●</span> Ongoing: {ongoingUnits} units</p>
                            <p className="text-sm flex items-center"><span className="text-red-500 mr-2">●</span> Remaining: {remainingUnits} units</p>
                          </div>
                        </div>
                      </div>
                    </div> 
                  </div>
                </div>
              </div>
            </div>
          </main>
          {/* Modal for Adding/Editing Skills */}
          {isModalOpen && (
            <StudentSkillsModal
              userId={userId}
              isOpen={isModalOpen}
              onClose={closeModal}
              onSkillAdded={fetchData}
            />
          )}
          {/* Confirmation Modal */}
          {isConfirmModalOpen && selectedSkill && (
            <ConfirmationModal
              isOpen={isConfirmModalOpen}
              message={`Are you sure you want to delete the skill "${selectedSkill.skillName}"?`}
              onClose={() => setIsConfirmModalOpen(false)}
              onConfirm={handleDeleteSkill}
            />
          )}
          {toast && (
                <CustomToast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
      </div>
    </div>
  );
};

export default Skills;
