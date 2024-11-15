// const/apiConfig.ts
export const BASE_URL = 'https://localhost:5050/';
export const API_BASE_URL = 'https://localhost:5050/api';

// Endpoint Announcement && Seminar
export const ANNOUNCEMENTS_URL = `/Announcement/bydate`;
export const SEMINARS_URL = `/Announcement/seminars/byyear`;
export const SEARCH_SEMINARS_URL = `/Announcement/seminars/bysearch`;
export const SEMINAR_ATTENDEES_URL = `/Announcement/seminar/attendees`;
export const ADD_ANNOUNCEMENT_URL = `/Announcement`;
export const ADD_SEMINAR_ATTENDEE_URL = `/Announcement/addseminarattendee`;

// Endpoint Admin Priv
export const GET_ADMINS_URL = `/Admin/getadmins`;
export const GET_ADMIN_URL = `/Admin/getadmin`;
export const GET_STUDENTS_URL = `/Admin/getstudents`;
export const ADD_STUDENT_URL = `/Admin/addstudent`;
export const UPDATE_ADMIN_URL = `/Admin/updateadmin`;
export const SEARCH_STUDENT_URL = `/Admin/searchstudents`;

// Endpoints Course
export const COURSES_URL = `/Course`;

// Endpoints Subjects
export const GET_SUBJECTS_URL = `/Subject/getsubjects`;
export const SEARCH_SUBJECTS_URL = `/Subject/searchsubjects`;
export const ADD_SUBJECT_URL = `/Subject`;

//Endpoints Student
export const GET_STUDENT_DETAIL_URL = `/Student/detail`;
export const UPDATE_STUDENT_DETAIL_URL = `/Student/detail/update`;
export const GET_STUDENT_INFO_URL = `/Student/information`;
export const ADDUP_STUDENT_INFO_URL = `/Student/information/addorupdate`;
export const GET_STUDENT_SUBJECTS_TAKEN_URL = `/Student/subjectstaken`;
export const ADD_STUDENT_SUBJECTS_TAKEN_URL = `/Student/subjectstaken/add`;
export const DELETE_STUDENT_SUBJECTS_TAKEN_URL = `/Student/subjectstaken/delete`;
export const GET_STUDENT_SKILLS_URL = `/Student/skills`;
export const ADD_STUDENT_SKILLS_URL = `/Student/skill/add`;
export const DELETE_STUDENT_SKILLS_URL = `/Student/skill/delete`;


//Endpoints AI or Machine Learning Future Career Prediction based on skills
export const GET_STUDENT_FUTURE_CAREER_URL = `/Student/futurecareers`;

