import React, { useEffect, useState } from 'react';
import { fetchStudentSkills, fetchStudentFutureCareers, fetchCourseProgressByStudentUserId } from '../../api/portfolioApi'; // Import your API function
import NavHeader from './NavHeader';
import { StudentSkillModel } from '../../models/StudentSkill';
import { PredictedCareerModel } from '../../models/PredictedCareerModel';
import { StudentCourseWithSubjectsModel } from '../../models/StudentCourseWithSubjectsModel';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useParams } from 'react-router-dom';

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
  const { userId } = useParams<{ userId: string }>(); // Get `userId` from route parameters  
  const [studentCourseProgress, setStudentCourseProgress] = useState<StudentCourseWithSubjectsModel>(initialStudentCourseProgress);
  const [studentSkills, setStudentSkills] = useState<StudentSkillModel[]>([]);
  const [futureCareers, setFutureCareers] = useState<PredictedCareerModel[]>([]);  

  const fetchData = async () => {            
      try {
          if (!userId) return;          
            // Run both data fetching functions concurrently
            const [studentSkillsData, studentFutureCareersData, studentCourseProgData] = await Promise.all([
              fetchStudentSkills(Number(userId)),
              fetchStudentFutureCareers(Number(userId)),
              fetchCourseProgressByStudentUserId(Number(userId))
          ]);                
          setStudentSkills(studentSkillsData);
          setFutureCareers(studentFutureCareersData);   
          setStudentCourseProgress(studentCourseProgData);              
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };
  
  useEffect(() => {        
    fetchData();    
  }, []);

  const computeCourseProgress = () => {
    if (!studentCourseProgress || !studentCourseProgress.subjectsTaken) {
      return { completedUnits: 0, ongoingUnits: 0, remainingUnits: 0 };
    }

    console.log(studentCourseProgress.subjectsTaken);
  
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
        </div>
      </div>
    </div>
  );
};

export default Skills;
