import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Information from './components/Information';
import Login from './components/Login';
import Skills from './components/Skills';
import Announcement from './components/Announcement';
import ProfileUpdateForm from './components/ProfileUpdateForm';
import CertificationsAndRecognitions from './components/CertificationsAndRecognitions';
import SubjectTaken from './components/SubjectTaken';
import Seminars from './components/Seminars';
import CareerPath from './components/CareerPath';


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
      </Routes>      
    </Router>
  );
}

export default App
