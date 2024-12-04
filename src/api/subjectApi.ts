import { PagedResultModel } from "../models/PagedResultModel";
import { PaginationParamsModel } from "../models/PaginationParamsModel";
import { SubjectModel } from "../models/SubjectModel";
import apiClient from "./apiClient";
import { ADD_SUBJECT_URL, GET_SUBJECTS_ALL_URL, GET_SUBJECTS_URL, SEARCH_SUBJECTS_URL, UPDATE_SUBJECT_URL } from "./apiConfig";
import Cookies from 'js-cookie';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchSubjects(
    paginationParams: PaginationParamsModel    
): Promise<PagedResultModel<SubjectModel>> {
    try {
        const token = Cookies.get('jwtToken');
        const response = await apiClient.get<PagedResultModel<SubjectModel>>(`${GET_SUBJECTS_URL}`, {
            params: {
                pageNumber: paginationParams.pageNumber,
                pageSize: paginationParams.pageSize                
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching subjects:", error);
        throw error; // Handle this in your component
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchSubjectsAll(    
): Promise<SubjectModel[]> {
    try {
        const token = Cookies.get('jwtToken');
        const response = await apiClient.get<SubjectModel[]>(`${GET_SUBJECTS_ALL_URL}`, {           
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching subjects:", error);
        throw error; // Handle this in your component
    }
}

export async function fetchSearchSubjects(
    paginationParams: PaginationParamsModel,
    searchValue: string | null
): Promise<PagedResultModel<SubjectModel>> {
    try {
        const token = Cookies.get('jwtToken');
        const response = await apiClient.get<PagedResultModel<SubjectModel>>(`${SEARCH_SUBJECTS_URL}`, {
            params: {
                pageNumber: paginationParams.pageNumber,
                pageSize: paginationParams.pageSize,
                searchValue: searchValue
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching searched students:", error);
        throw error; // Handle this in your component
    }
}

// Add New Announcement
export const addSubject = async (formData: FormData) => {
    try {
        const token = Cookies.get('jwtToken');
        const response = await apiClient.post(`${ADD_SUBJECT_URL}`, formData, {           
            headers: {                
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data; // Return the response data if needed
    } catch (error) {
        throw new Error(`Error adding subject: ${error}`);
    }
};

// Add New Announcement
export const updateSubject = async (subjectId: number, updatedData: SubjectModel) => {
    try {
        const token = Cookies.get('jwtToken');
        const response = await apiClient.put(`${UPDATE_SUBJECT_URL}${subjectId}`, updatedData, {           
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        console.log(`${UPDATE_SUBJECT_URL}${subjectId}`);
        return response.data; // Return the response data if needed
    } catch (error) {
        throw new Error(`Error updating subject: ${error}`);
    }
};