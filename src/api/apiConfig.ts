// const/apiConfig.ts
export const BASE_URL = import.meta.env.VITE_API_URL + `/`;
export const API_BASE_URL = import.meta.env.VITE_API_URL + `/api`;
export const REACT_BASE_URL = import.meta.env.VITE_BASE_URL + `/`;


// Endpoint Announcement && Seminar
export const ANNOUNCEMENTS_URL = `/Announcement/bydate`;
export const SEMINARS_URL = `/Announcement/seminars/byyear`;
export const SEARCH_SEMINARS_URL = `/Announcement/seminars/bysearch`;
export const SEMINAR_ATTENDEES_URL = `/Announcement/seminar/attendees`;
export const ADD_ANNOUNCEMENT_URL = `/Announcement`;
export const ADD_SEMINAR_ATTENDEE_URL = `/Announcement/addseminarattendee`;
export const UPDATE_SEMINAR_ATTENDEE_URL = `/Announcement/seminar/updateseminarattendee/`;

// Endpoint Admin Priv
export const GET_ADMINS_URL = `/Admin/getadmins`;
export const GET_ADMIN_URL = `/Admin/getadmin`;
export const GET_STUDENTS_URL = `/Admin/getstudents`;
export const ADD_STUDENT_URL = `/Admin/addstudent`;
export const UPDATE_ADMIN_URL = `/Admin/updateadmin`;
export const SEARCH_STUDENT_URL = `/Admin/searchstudents`;
export const CHANGE_ADMIN_PWD_URL = `/ChangePassword/change-admin-user-password/`

// Endpoints Course
export const COURSES_URL = `/Course`;

// Endpoints Subjects
export const GET_SUBJECTS_URL = `/Subject/getsubjects`;
export const GET_SUBJECTS_ALL_URL = `/Subject/getsubjects/all`;
export const SEARCH_SUBJECTS_URL = `/Subject/searchsubjects`;
export const ADD_SUBJECT_URL = `/Subject`;
export const UPDATE_SUBJECT_URL = `/Subject/`;

//Endpoints Student
export const GET_STUDENT_DETAIL_URL = `/Student/detail`;
export const UPDATE_STUDENT_DETAIL_URL = `/Student/detail/`;
export const GET_STUDENT_INFO_URL = `/Student/information`;
export const ADDUP_STUDENT_INFO_URL = `/Student/information/addorupdate`;
export const GET_STUDENT_SUBJECTS_TAKEN_URL = `/Student/subjectstaken`;
export const ADD_STUDENT_SUBJECTS_TAKEN_URL = `/Student/subjecttaken/add`;
export const UPDATE_STUDENT_SUBJECTS_TAKEN_URL = `/Student/subjecttaken/update`;
export const DELETE_STUDENT_SUBJECTS_TAKEN_URL = `/Student/subjecttaken/delete/`;
export const GET_STUDENT_SKILLS_URL = `/Student/skills`;
export const ADD_STUDENT_SKILLS_URL = `/Student/skill/add`;
export const DELETE_STUDENT_SKILLS_URL = `/Student/skill/delete/`;
export const GET_STUDENT_CERTIFICATES_URL = `/Student/certificates`;
export const ADD_STUDENT_CERTIFICATE_URL = `/Student/certificate/add`;
export const DELETE_STUDENT_CERTIFICATE_URL = `/Student/certificate/delete/`;
export const GET_STUDENT_RECOGNITIONS_URL = `/Student/recognitions`;
export const ADD_STUDENT_RECOGNITION_URL = `/Student/recognition/add`;
export const DELETE_STUDENT_RECOGNITION_URL = `/Student/recognition/delete/`;
export const GET_STUDENT_SEMINARS_URL = `/Student/seminars`;
export const ADD_STUDENT_SEMINAR_URL = `/Student/seminar/add`;
export const UPDATE_STUDENT_SEMINAR_URL = `/Student/seminar/update`;
export const DELETE_STUDENT_SEMINAR_URL = `/Student/seminar/delete/`;
export const GET_STUDENT_SCHOOL_SEMINARS_URL = `/Announcement/seminars/attendee`;
export const GET_STUDENT_COURSE_PROGRESS_URL = `/Student/courseprogress`;
export const CHANGE_STUDENT_PWD_URL = `/ChangePassword/change-student-user-password/`

//Endpoints AI or Machine Learning Future Career Prediction based on skills
export const GET_STUDENT_FUTURE_CAREER_URL = `/Student/futurecareers`;

//Endpoints Portfolio GuestView
export const P_GET_STUDENT_DETAIL_URL = `/Portfolio/detail`;
export const P_GET_STUDENT_INFO_URL = `/Portfolio/information`;
export const P_GET_STUDENT_SUBJECTS_TAKEN_URL = `/Portfolio/subjectstaken`;
export const P_GET_STUDENT_SKILLS_URL = `/Portfolio/skills`;
export const P_GET_STUDENT_CERTIFICATES_URL = `/Portfolio/certificates`;
export const P_GET_STUDENT_RECOGNITIONS_URL = `/Portfolio/recognitions`;
export const P_GET_STUDENT_SEMINARS_URL = `/Portfolio/seminars`;
export const P_GET_STUDENT_COURSE_PROGRESS_URL = `/Portfolio/courseprogress`;

//Endpoints AI or Machine Learning Future Career Prediction based on skills
export const P_GET_STUDENT_FUTURE_CAREER_URL = `/Portfolio/futurecareers`;

