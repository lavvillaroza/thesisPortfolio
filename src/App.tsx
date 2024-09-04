// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Information from './components/student/Information';
import Login from './components/Auth/Login';
import Skills from './components/student/Skills';
import Announcement from './components/student/Announcement';
import ProfileUpdateForm from './components/student/ProfileUpdateForm';
import CertificationsAndRecognitions from './components/student/CertificationsAndRecognitions';
import SubjectTaken from './components/student/SubjectTaken';
import Seminars from './components/student/Seminars';
import CareerPath from './components/student/CareerPath';
import AnnouncementAdm from './components/admin/Announcement';
import '@fontsource/roboto';
import { AuthProvider } from './components/context/AuthContext';
import PrivateRoute from './components/ProtectedRoute'; // Ensure this import is correct
import StudentManagement from './components/admin/StudentManagement';
import CreateSeminarAndAnouncement from './components/admin/CreateSeminarAndAnouncement';
import SeminarAttendedList from './components/admin/SeminarAttendedList';
import Curriculum from './components/admin/Curriculum';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
        <AuthProvider>
          <Routes>
              {/* Public Routes */}              
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />

              {/* Protected Routes */}
              {/* Admin Routes */}
              <Route
                path="/admin/*"
                element={
                  <PrivateRoute>
                    <AnnouncementAdm />
                  </PrivateRoute>
                }/>
              <Route path="/admin/studentlist" element={<PrivateRoute>
                    <StudentManagement />
                  </PrivateRoute>
                }/>
              <Route path="/admin/seminarattendedlist" element={<PrivateRoute>
                    <SeminarAttendedList />
                  </PrivateRoute>
                }/>
              <Route path="/admin/createseminarandanouncement" element={<PrivateRoute>
                    <CreateSeminarAndAnouncement />
                  </PrivateRoute>
                }/>
              <Route path="/admin/curriculum" element={<PrivateRoute>
                    <Curriculum />
                  </PrivateRoute>
                }/>
              
              {/* Student Routes */}
              <Route path="/student/*" element={ 
                <PrivateRoute> 
                  <Announcement />
                </PrivateRoute>}/>
              <Route path="/student/information" element={ 
                <PrivateRoute> 
                  <Information />
                </PrivateRoute>}/>
              <Route path="/student/update" element={ 
                <PrivateRoute> 
                  <ProfileUpdateForm />
                </PrivateRoute>}/>
                <Route path="/student/skills" element={<PrivateRoute> 
                  <Skills />
                </PrivateRoute>} />
                <Route path="/student/certificationsandrecognitions" element={<PrivateRoute> 
                  <CertificationsAndRecognitions />
                </PrivateRoute>} />
                <Route path="/student/subjecttaken" element={<PrivateRoute> 
                  <SubjectTaken />
                </PrivateRoute>} />
                <Route path="/student/seminars" element={<PrivateRoute> 
                  <Seminars />
                </PrivateRoute>} />
                <Route path="/student/careerpath" element={<PrivateRoute> 
                  <CareerPath />
                </PrivateRoute>} />              
            </Routes>
        </AuthProvider>
    </Router>
    
  );
};

export default App;