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


function App() {

  return (
    <Router>      
      <Routes>        
        <Route path="/" element={<Announcement/>} />                
        <Route path="/profile/update" element={<ProfileUpdateForm/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/portfolio/information"  element={<Information/>} />
        <Route path="/portfolio/skills"  element={<Skills/>} />
        <Route path="/portfolio/certificationsandrecognitions"  element={<CertificationsAndRecognitions/>} />
        <Route path="/portfolio/subjecttaken"  element={<SubjectTaken/>} />
        <Route path="/portfolio/seminars"  element={<Seminars/>} />
        <Route path="/portfolio/careerpath"  element={<CareerPath/>} />
        <Route path="/announcementadm"  element={<AnnouncementAdm/>} />
      </Routes>      
    </Router>
  );
}

export default App
