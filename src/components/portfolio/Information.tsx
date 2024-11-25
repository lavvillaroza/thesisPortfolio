import React, { useEffect, useState } from 'react';
import { FaFilePdf } from 'react-icons/fa';
import NavHeader from './NavHeader';
import InfoCarousel from './carousel/CoverPhotosCarousel';
import { StudentDetailModel } from '../../models/StudentDetailModel';
import { useParams } from 'react-router-dom';
import { fetchStudentDetail, fetchStudentInformation } from '../../api/portfolioApi';
import { BASE_URL, REACT_BASE_URL } from '../../api/apiConfig';
import { StudentInformationModel } from '../../models/StudentInformationModel';


const initialStudentDetail: StudentDetailModel = {
  id: 0,
  userId: 0,
  studentId: '',
  studentName: '',
  courseId: 0,
  courseName: '',
  yearLevel: 0,
  yearStart: 0,
  yearEnd: null,
  section: '',
  schoolEmail: '',
  personalEmail: '',
  portfolioURL: '',
  attachedResume: '',
  attachedResumeFile: null,
  createdBy: '',
  createdDate: null,
  lastModifiedBy: '',
  lastModifiedDate: null,
};

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
  coverPhotoFourFile: null
};

const Information: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); // Get `userId` from route parameters  
  const [studentDetail, setStudentDetail] = useState<StudentDetailModel>(initialStudentDetail);
  const [studentInfo, setStudentInfo] = useState<StudentInformationModel>(iniStudentInformation);
  const [loading, setLoading] = useState<boolean>(true);  

  useEffect(() => {    
    const fetchData = async () => {
        setLoading(true);
        try {
            if (!userId) return;
            const [studentDetailData, studentInfoData] = await Promise.all([
              fetchStudentDetail(Number(userId)),
              fetchStudentInformation(Number(userId)),
            ]);

            setStudentDetail(studentDetailData);
            setStudentInfo(studentInfoData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Ensure loading is set to false after both fetches
        }
    };
    fetchData();
  }, []);

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const url =  REACT_BASE_URL + 'portfolio/' + studentDetail.userId.toString() + '/information';
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (error) {
      console.error("Failed to copy the URL:", error);
    }
  };

  const handleOpenResume = () => {
      window.open(BASE_URL + encodeURI(studentDetail.attachedResume), '_blank'); // Opens in a new tab
  };

  const getYearString = (year: number): string => {
    switch (year) {
      case 1:
        return '1st Year';
      case 2:
        return '2nd Year';
      case 3:
        return '3rd Year';
      case 4:
        return '4th Year';
      default:
        return `${year}th Year`;
    }
  };

    return (
        <div className="font-roboto flex p-4 md:flex md:flex-col bg-gray-100 py-2 min-h-screen min-w-screen w-full">
            <div className="flex-1 m-auto">
                <NavHeader />                
                <div className="flex flex-col md:flex-col bg-background text-foreground mx-auto w-full h-full md:h-[750px] overflow-y-auto scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100">                     
                    <main className="flex-1 w-full md:w-[1100px] md:h-full mx-auto h-full bg-green-700 bg-gradient-to-br from-emerald-600 rounded transition-all duration-200">                        
                        <div className="flex flex-col-reverse md:flex-row gap-4 min-h-[700px] px-6 pt-5">
                            <div className="flex-auto w-full md:w-72 bg-gray-100 overflow-y-auto scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100 rounded transition-all duration-200 p-5 mt-5">
                                {loading ? (
                                        <div className="flex items-center justify-center h-[400px]">
                                            <div role="status">
                                                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                </svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>                            
                                  ) : (
                                    <>
                                      <div className="mb-2"> 
                                          <div className="grid grid-cols-2 gap-4">                                              
                                            <div>
                                                <div className="mb-2">
                                                  <p className="text-gray-900 text-3xl dark:text-white">{studentDetail.studentName || 'N/A'}</p>                                      
                                                  <p className="text-gray-900 text-xl dark:text-white">{studentDetail.courseName || 'N/A'}</p>
                                                  <p className="text-gray-900 text-xl dark:text-white">{(studentDetail.studentId + ' - ' + getYearString(studentDetail.yearLevel)) || 'N/A'}</p>                                                  
                                                </div>                                                                                                 
                                            </div>
                                            <div className=""> 
                                                <div className="mb-2">
                                                  <button
                                                      onClick={handleOpenResume}
                                                      className="flex items-center gap-2 py-1 text-emerald-700 hover:text-red-500">
                                                      <FaFilePdf size={20} /> {/* Resume icon */}
                                                      <span>My Resume</span>
                                                  </button>
                                                </div>  
                                                <div className="w-full max-w-sm relative">
                                                    <div className="flex items-center">
                                                        <span className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg dark:bg-gray-600 dark:text-white dark:border-gray-600">
                                                          PORTFOLIO URL
                                                        </span> 
                                                        <div className="relative w-full">
                                                            <input
                                                              id="website-url"
                                                              type="text"
                                                              aria-describedby="helper-text-explanation"
                                                              className="bg-gray-50 border border-e-0 border-gray-300 text-gray-500 text-sm border-s-0 focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 "
                                                              value={REACT_BASE_URL + 'portfolio/' + studentDetail.userId.toString() + '/information'}
                                                              readOnly
                                                              disabled
                                                            />
                                                          </div>                                                                                                                         
                                                        <button
                                                          onClick={handleCopy}
                                                          className="relative flex-shrink-0 z-30 inline-flex items-center py-3 px-4 text-sm font-medium text-center text-white bg-emerald-700 rounded-e-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 border-emerald-700 hover:border-emerald-800"
                                                          type="button">
                                                          {isCopied ? (
                                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                                            </svg>
                                                          ) : (
                                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                                              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                                                            </svg>
                                                          )}
                                                        </button>                                                          
                                                        <div
                                                          className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-3 py-2 text-sm font-medium text-white bg-emerald-900 rounded-lg shadow-md transition-opacity duration-300 ${isCopied ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                                                          style={{ zIndex: 30 }}
                                                          role="tooltip">
                                                          {isCopied ? "Copied!" : "Copy link"}
                                                        </div>
                                                    </div>                                                    
                                                  </div>                                                                                                                                                              
                                              </div>                                                                                        
                                          </div>                                                                           
                                      </div>
                                      <div className="mb-2">
                                        <label className="text-gray-900 text-left hover:text-green-700 text-2xl">About Me</label>                                         
                                      </div>  
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <InfoCarousel studentInformation={studentInfo}/>
                                        </div>  
                                        <div>                                      
                                          <blockquote className="text-lg italic font-semibold text-justify text-gray-600 dark:text-white">
                                              <p>"{studentInfo.aboutMe || 'To be provided...'}"</p>
                                          </blockquote>                                         
                                        </div>                                                                  
                                      </div> 
                                  </>                                          
                                )}  
                            </div>                            
                        </div>
                    </main>                                          
                </div>
            </div>
      </div>        
    )
};

export default  Information;