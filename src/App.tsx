// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Information from './components/student/Information';
import Login from './components/auth/Login';
import Skills from './components/student/Skills';
import Announcement from './components/student/Announcement';
import Certifications from './components/student/Certifications';
import SubjectsTaken from './components/student/SubjectsTaken';
import Seminars from './components/student/Seminars';
import AnnouncementAdm from './components/admin/Announcement';
import '@fontsource/roboto';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/ProtectedRoute'; // Ensure this import is correct
import Student from './components/admin/Student';
import CreateAnouncement from './components/admin/CreateAnouncement';
import SeminarAttendance from './components/admin/Seminar';
import Subject from './components/admin/Subject';
import NotFound from './components/common/NotFound';
import 'flowbite';
import Course from './components/admin/Course';
import InformationView from './components/portfolio/Information';
import SkillsView from './components/portfolio/Skills';
import CertificationsView from './components/portfolio/Certifications';
import SubjectsTakenView from './components/portfolio/SubjectsTaken';
import SeminarsView from './components/portfolio/Seminars';

const App = () => {
  return (
    <Router>
        <AuthProvider>
          <Routes>
              {/* Public Routes */}              
              <Route path="/" element={<Login />} />              

              {/* Portfolio Routes */}
              <Route path="/portfolio/:userId/information" element={<InformationView />} />
              <Route path="/portfolio/:userId/skills" element={<SkillsView />} />
              <Route path="/portfolio/:userId/certifications" element={<CertificationsView />} />
              <Route path="/portfolio/:userId/subjectstaken" element={<SubjectsTakenView />} />
              <Route path="/portfolio/:userId/seminars" element={<SeminarsView />} />

              {/* Protected Routes */}
              {/* Admin Routes */}
              <Route path="/admin/announcement" element={
                  <PrivateRoute>
                    <AnnouncementAdm />
                  </PrivateRoute>
                }/>
              <Route path="/admin/student" element={
                  <PrivateRoute>
                    <Student />
                  </PrivateRoute>
                }/>
              <Route path="/admin/seminar" element={
                  <PrivateRoute>
                    <SeminarAttendance />
                  </PrivateRoute>
                }/>
              <Route path="/admin/addanouncement" element={<PrivateRoute>
                    <CreateAnouncement />
                  </PrivateRoute>
                }/>
              <Route path="/admin/subject" element={<PrivateRoute>
                    <Subject />
                  </PrivateRoute>
                }/>
              <Route path="/admin/course" element={<PrivateRoute>
                    <Course />
                  </PrivateRoute>
                }/>
              
              {/* Student Routes */}
              <Route path="/student/announcement" element={ 
                <PrivateRoute> 
                  <Announcement />
                </PrivateRoute>}/>
              <Route path="/student/information" element={ 
                <PrivateRoute> 
                  <Information />
                </PrivateRoute>}/>              
              <Route path="/student/skills" element={<PrivateRoute> 
                <Skills />
              </PrivateRoute>} />
              <Route path="/student/certifications" element={<PrivateRoute> 
                <Certifications />
              </PrivateRoute>} />
              <Route path="/student/subjectstaken" element={<PrivateRoute> 
                <SubjectsTaken />
              </PrivateRoute>} />
              <Route path="/student/seminars" element={<PrivateRoute> 
                <Seminars />
              </PrivateRoute>} />
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />             
            </Routes>
        </AuthProvider>

         {/* Not Protected Routes */}
        {/* Portfolio Routes */}
    </Router>
    
  );
};

export default App;