import { PagedResultModel } from "../models/PagedResultModel";
import { PaginationParamsModel } from "../models/PaginationParamsModel";
import { StudentDetailModel } from "../models/StudentDetailModel";
import { StudentInformationModel } from "../models/StudentInformationModel";
import { StudentSubjectTakenModel } from "../models/StudentSubjectTakenModel";
import apiClient from "./apiClient";
import { ADD_STUDENT_SUBJECTS_TAKEN_URL, ADDUP_STUDENT_INFO_URL, DELETE_STUDENT_SUBJECTS_TAKEN_URL, GET_STUDENT_DETAIL_URL, GET_STUDENT_INFO_URL, GET_STUDENT_SUBJECTS_TAKEN_URL, UPDATE_STUDENT_DETAIL_URL } from "./apiConfig";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchStudentDetail(
    userId: number | null
): Promise<StudentDetailModel> {
    try {
        const response = await apiClient.get<StudentDetailModel>(`${GET_STUDENT_DETAIL_URL}`, {
            params: {
                userId: userId                
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching detail:", error);
        throw error; // Handle this in your component
    }
}

// Update Student Detail
export const updateStudentDetail = async (formData: FormData) => {
    try {        
        const response = await apiClient.post(`${UPDATE_STUDENT_DETAIL_URL}`, formData);
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
        const response = await apiClient.get<StudentInformationModel>(`${GET_STUDENT_INFO_URL}`, {
            params: {
                userId: userId                
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
        const response = await apiClient.post(`${ADDUP_STUDENT_INFO_URL}`, formData);
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
        const response = await apiClient.get<PagedResultModel<StudentSubjectTakenModel>>(`${GET_STUDENT_SUBJECTS_TAKEN_URL}`, {
            params: {
                pageNumber: paginationParams.pageNumber,
                pageSize: paginationParams.pageSize,
                userId: userId                
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching subjects taken:", error);
        throw error; // Handle this in your component
    }
}

//Add Student Subject
export const addStudentSubjectTaken = async (formData: FormData) => {
    try {        
        const response = await apiClient.post(`${ADD_STUDENT_SUBJECTS_TAKEN_URL}`, formData);
        return response.data; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {        
        throw new Error(`Error add student subject: ${error}`);
    }
};

//Delete Student Subject
export const deleteStudentSubjectTaken = async (formData: FormData) => {
    try {        
        const response = await apiClient.post(`${DELETE_STUDENT_SUBJECTS_TAKEN_URL}`, formData);
        return response.data; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {        
        throw new Error(`Error delete student subject: ${error}`);
    }
};
