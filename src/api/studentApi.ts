import { ChangeUserPasswordModel } from "../models/ChanceUserPasswordModel";
import { PagedResultModel } from "../models/PagedResultModel";
import { PaginationParamsModel } from "../models/PaginationParamsModel";
import { PredictedCareerModel } from "../models/PredictedCareerModel";
import { StudentCertAndRecogModel } from "../models/StudentCertiAndRecogModel";
import { StudentCourseWithSubjectsModel } from "../models/StudentCourseWithSubjectsModel";
import { StudentDetailModel } from "../models/StudentDetailModel";
import { StudentInformationModel } from "../models/StudentInformationModel";
import { StudentSeminarModel } from "../models/StudentSeminarModel";
import { StudentSkillModel } from "../models/StudentSkill";
import { StudentSubjectTakenModel } from "../models/StudentSubjectTakenModel";
import apiClient from "./apiClient";
import { ADD_STUDENT_CERTIFICATE_URL, ADD_STUDENT_RECOGNITION_URL, ADD_STUDENT_SEMINAR_URL, ADD_STUDENT_SKILLS_URL, ADD_STUDENT_SUBJECTS_TAKEN_URL, ADDUP_STUDENT_INFO_URL, CHANGE_STUDENT_PWD_URL, DELETE_STUDENT_CERTIFICATE_URL, DELETE_STUDENT_RECOGNITION_URL, DELETE_STUDENT_SEMINAR_URL, DELETE_STUDENT_SKILLS_URL, DELETE_STUDENT_SUBJECTS_TAKEN_URL, GET_STUDENT_CERTIFICATES_URL, GET_STUDENT_COURSE_PROGRESS_URL, GET_STUDENT_DETAIL_URL, GET_STUDENT_FUTURE_CAREER_URL, GET_STUDENT_INFO_URL, GET_STUDENT_RECOGNITIONS_URL, GET_STUDENT_SCHOOL_SEMINARS_URL, GET_STUDENT_SEMINARS_URL, GET_STUDENT_SKILLS_URL, GET_STUDENT_SUBJECTS_TAKEN_URL, UPDATE_STUDENT_DETAIL_URL, UPDATE_STUDENT_SEMINAR_URL, UPDATE_STUDENT_SUBJECTS_TAKEN_URL } from "./apiConfig";
import Cookies from 'js-cookie';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchStudentDetail(
    userId: number | null
): Promise<StudentDetailModel> {
    try {
        const token = Cookies.get('jwtToken');
        const response = await apiClient.get<StudentDetailModel>(`${GET_STUDENT_DETAIL_URL}`, {
            params: {
                userId: userId                
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching detail:", error);
        throw error; // Handle this in your component
    }
}

// Update Student Detail
export const updateStudentDetail = async (userId: number, formData: FormData) => {
    try {        
        const token = Cookies.get('jwtToken');
        const response = await apiClient.put(`${UPDATE_STUDENT_DETAIL_URL}${userId}`, formData, {           
            headers: {                
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {        
        throw new Error(`Error updating student detail: ${error}`);
    }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchStudentInformation(
    userId: number | null
): Promise<StudentInformationModel> {
    try {
        const token = Cookies.get('jwtToken');
        const response = await apiClient.get<StudentInformationModel>(`${GET_STUDENT_INFO_URL}`, {
            params: {
                userId: userId                
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching detail:", error);
        throw error; // Handle this in your component
    }
}

//Add or Update Student Info Detail
export const addOrUpdateStudentInformation = async (formData: FormData) => {
    try {     
        const token = Cookies.get('jwtToken');   
        const response = await apiClient.post(`${ADDUP_STUDENT_INFO_URL}`, formData, {           
            headers: {                
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {        
        throw new Error(`Error updating student detail: ${error}`);
    }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchStudentSubjectsTaken(
    paginationParams: PaginationParamsModel,    
    userId: number | null
): Promise<PagedResultModel<StudentSubjectTakenModel>> {
    try {
        const token = Cookies.get('jwtToken');
        const response = await apiClient.get<PagedResultModel<StudentSubjectTakenModel>>(`${GET_STUDENT_SUBJECTS_TAKEN_URL}`, {
            params: {
                pageNumber: paginationParams.pageNumber,
                pageSize: paginationParams.pageSize,
                userId: userId                
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching subjects taken:", error);
        throw error; // Handle this in your component
    }
}

//Add Student Subject Taken
export const addStudentSubjectTaken = async (formData: FormData) => {
    try {   
        const token = Cookies.get('jwtToken');    
        const response = await apiClient.post(`${ADD_STUDENT_SUBJECTS_TAKEN_URL}`, formData, {           
            headers: {                
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {        
        throw new Error(`Error add student subject: ${error}`);
    }
};

//Update Student Subject Taken
export const updateStudentSubjectTaken = async (formData: FormData) => {
    try {        
        const token = Cookies.get('jwtToken');
        const response = await apiClient.post(`${UPDATE_STUDENT_SUBJECTS_TAKEN_URL}`, formData, {           
            headers: {                
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {        
        throw new Error(`Error add student subject: ${error}`);
    }
};

//deelete Student Skill
export const deleteStudentSubjectTaken = async (studentSubjectId: number) => {
    try {   
        const token = Cookies.get('jwtToken');
        console.log("DELETE " + studentSubjectId);
        const response = await apiClient.put(`${DELETE_STUDENT_SUBJECTS_TAKEN_URL}` + studentSubjectId, {           
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {        
        throw new Error(`Error deleting student subject: ${error}`);
    }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchStudentSkills(
    userId: number | null
): Promise<StudentSkillModel[]> {
    try {
        const token = Cookies.get('jwtToken');
        const response = await apiClient.get<StudentSkillModel[]>(`${GET_STUDENT_SKILLS_URL}`, {
            params: {
                userId: userId                
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching detail:", error);
        throw error; // Handle this in your component
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchStudentFutureCareers(
    userId: number | null
): Promise<PredictedCareerModel[]> {
    try {
        const token = Cookies.get('jwtToken');
        const response = await apiClient.get<PredictedCareerModel[]>(`${GET_STUDENT_FUTURE_CAREER_URL}`, {
            params: {
                userId: userId                
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data;
    } catch (error) {
        console.error("Error careers prediction", error);
        throw error; // Handle this in your component
    }
}

//Add Student Skill
export const addStudentSkill = async (formData: FormData) => {
    try {     
        const token = Cookies.get('jwtToken');   
        const response = await apiClient.post(`${ADD_STUDENT_SKILLS_URL}`, formData, {           
            headers: {                
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {        
        throw new Error(`Error add student subject: ${error}`);
    }
};

//deelete Student Skill
export const deleteStudentSkill = async (studentSkillId: number) => {
    try {   
        const token = Cookies.get('jwtToken');
        console.log("DELETE " + studentSkillId);
        const response = await apiClient.put(`${DELETE_STUDENT_SKILLS_URL}` + studentSkillId, {           
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {        
        throw new Error(`Error deleting skill: ${error}`);
    }
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchStudentCertificates(
    userId: number | null
): Promise<StudentCertAndRecogModel[]> {
    try {
        const token = Cookies.get('jwtToken');
        const response = await apiClient.get<StudentCertAndRecogModel[]>(`${GET_STUDENT_CERTIFICATES_URL}`, {
            params: {
                userId: userId                
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching Student Certificates", error);
        throw error; // Handle this in your component
    }
}

//Add Student Certificate
export const addStudentCertificate = async (formData: FormData) => {
    try {     
        const token = Cookies.get('jwtToken');   
        const response = await apiClient.post(`${ADD_STUDENT_CERTIFICATE_URL}`, formData, {           
            headers: {                
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {        
        throw new Error(`Error adding Student Certificate: ${error}`);
    }
};

//deelete Student Certificate
export const deleteStudentCertificate = async (studentCertId: number) => {
    try {  
        const token = Cookies.get('jwtToken'); 
        console.log("DELETE " + studentCertId);
        const response = await apiClient.put(`${DELETE_STUDENT_CERTIFICATE_URL}` + studentCertId, {           
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {        
        throw new Error(`Error deleting Student Certificate: ${error}`);
    }
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchStudentRecognitions(
    userId: number | null
): Promise<StudentCertAndRecogModel[]> {
    try {
        const token = Cookies.get('jwtToken');
        const response = await apiClient.get<StudentCertAndRecogModel[]>(`${GET_STUDENT_RECOGNITIONS_URL}`, {
            params: {
                userId: userId                
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching Student Recognitions", error);
        throw error; // Handle this in your component
    }
}

//Add Student Recognition
export const addStudentRecognition = async (formData: FormData) => {
    try {     
        const token = Cookies.get('jwtToken');   
        const response = await apiClient.post(`${ADD_STUDENT_RECOGNITION_URL}`, formData, {           
            headers: {                
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {        
        throw new Error(`Error adding Student Recognition: ${error}`);
    }
};

//deelete Student Recognition
export const deleteStudentRecognition = async (studentCertId: number) => {
    try {   
        const token = Cookies.get('jwtToken');
        console.log("DELETE " + studentCertId);
        const response = await apiClient.put(`${DELETE_STUDENT_RECOGNITION_URL}` + studentCertId, {           
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {        
        throw new Error(`Error deleting Student Recognition: ${error}`);
    }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchStudentSeminars(
    userId: number | null
): Promise<StudentSeminarModel[]> {
    try {
        const token = Cookies.get('jwtToken');
        const response = await apiClient.get<StudentSeminarModel[]>(`${GET_STUDENT_SEMINARS_URL}`, {
            params: {
                userId: userId                
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching Student Seminars", error);
        throw error; // Handle this in your component
    }
}

//Add Student Seminar
export const addStudentSeminar = async (formData: FormData) => {
    try {       
        const token = Cookies.get('jwtToken'); 
        const response = await apiClient.post(`${ADD_STUDENT_SEMINAR_URL}`, formData, {           
            headers: {                
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {        
        throw new Error(`Error adding Student Seminar: ${error}`);
    }
};

//Update Student Seminar
export const updateStudentSeminar = async (formData: FormData) => {
    try {        
        const token = Cookies.get('jwtToken');
        const response = await apiClient.post(`${UPDATE_STUDENT_SEMINAR_URL}`, formData, {           
            headers: {                
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {        
        throw new Error(`Error adding Student Seminar: ${error}`);
    }
};

//deelete Student Seminar
export const deleteStudentSeminar = async (studentSeminarId: number) => {
    try {   
        const token = Cookies.get('jwtToken');
        console.log("DELETE " + studentSeminarId);
        const response = await apiClient.put(`${DELETE_STUDENT_SEMINAR_URL}` + studentSeminarId, {           
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {        
        throw new Error(`Error deleting Student Seminar: ${error}`);
    }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchSeminarsByStudentUserId(    
    userId: number
): Promise<StudentSeminarModel[]> {
    try {      
        const token = Cookies.get('jwtToken');  
        const response = await apiClient.get<StudentSeminarModel[]>(`${GET_STUDENT_SCHOOL_SEMINARS_URL}`, {
            params: {                
                userId: userId
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching seminars using student user id:", error);
        throw error; // Handle this in your component
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchCourseProgressByStudentUserId(    
    userId: number
): Promise<StudentCourseWithSubjectsModel> {
    try {       
        const token = Cookies.get('jwtToken'); 
        const response = await apiClient.get<StudentCourseWithSubjectsModel>(`${GET_STUDENT_COURSE_PROGRESS_URL}`, {
            params: {                
                userId: userId
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching course progress using student user id:", error);
        throw error; // Handle this in your component
    }
}

// Update Admin Password
export const updateStudentPassword = async (userId: number, updatedData: ChangeUserPasswordModel) => {
    try {
        const token = Cookies.get('jwtToken');
        const response = await apiClient.put(`${CHANGE_STUDENT_PWD_URL}${userId}`, updatedData, {           
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data; // Return the response data if needed
    } catch (error) {
        throw new Error(`Error updating student password: ${error}`);
    }
};