// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Information from './components/student/Information';
import Login from './components/auth/Login';
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
import Student from './components/admin/Student';
import CreateAnouncement from './components/admin/CreateAnouncement';
import SeminarAttendance from './components/admin/SeminarAttendance';
import Curriculum from './components/admin/Curriculum';
import NotFound from './components/common/NotFound';
import 'flowbite';
import Course from './components/admin/Course';

const App = () => {
  return (
    <Router>
        <AuthProvider>
          <Routes>
              {/* Public Routes */}              
              <Route path="/" element={<Login />} />              

              {/* Protected Routes */}
              {/* Admin Routes */}
              <Route path="/admin" element={
                  <PrivateRoute>
                    <AnnouncementAdm />
                  </PrivateRoute>
                }/>
              <Route path="/admin/student" element={
                  <PrivateRoute>
                    <Student />
                  </PrivateRoute>
                }/>
              <Route path="/admin/seminarattendance" element={
                  <PrivateRoute>
                    <SeminarAttendance />
                  </PrivateRoute>
                }/>
              <Route path="/admin/addanouncement" element={<PrivateRoute>
                    <CreateAnouncement />
                  </PrivateRoute>
                }/>
              <Route path="/admin/curriculum" element={<PrivateRoute>
                    <Curriculum />
                  </PrivateRoute>
                }/>
              <Route path="/admin/course" element={<PrivateRoute>
                    <Course />
                  </PrivateRoute>
                }/>
              
              {/* Student Routes */}
              <Route path="/student" element={ 
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

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
             
            </Routes>
        </AuthProvider>
    </Router>
    
  );
};

export default App;