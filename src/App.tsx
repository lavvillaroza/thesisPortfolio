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
import AnnouncementAdm from './components/admin/AnnouncementAdm';
import '@fontsource/roboto';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <Router>      
      <Routes>        
        {/* Public Routes */}        
        <Route path="/login" element={<Login/>} />

        {/* Student Routes */}
        <Route path="/student/*" element={<ProtectedRoute role="student"/>}>
            <Route path="announcement" element={<Announcement/>} />
            <Route path="update" element={<ProfileUpdateForm/>} />        
            <Route path="information"  element={<Information/>} />
            <Route path="skills"  element={<Skills/>} />
            <Route path="certificationsandrecognitions"  element={<CertificationsAndRecognitions/>} />
            <Route path="subjecttaken"  element={<SubjectTaken/>} />
            <Route path="seminars"  element={<Seminars/>} />
            <Route path="careerpath"  element={<CareerPath/>} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin/*" element={<ProtectedRoute role="admin"/>}>
            <Route path="announcement"  element={<AnnouncementAdm/>} />
        </Route>
        
        
      </Routes>      
    </Router>
  );
}

export default App
