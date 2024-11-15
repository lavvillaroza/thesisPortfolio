import { PagedResultModel } from '../models/PagedResultModel';
import { PaginationParamsModel } from '../models/PaginationParamsModel';
import apiClient from '../api/apiClient';
import { StudentDetailModel } from '../models/StudentDetailModel';
import { ADD_STUDENT_URL, GET_ADMIN_URL, GET_ADMINS_URL, GET_STUDENTS_URL, SEARCH_STUDENT_URL, UPDATE_ADMIN_URL } from './apiConfig';
import { AdminUserModel } from '../models/AdminUserModel';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchStudents(
    paginationParams: PaginationParamsModel
): Promise<PagedResultModel<StudentDetailModel>> {
    try {
        const response = await apiClient.get<PagedResultModel<StudentDetailModel>>(`${GET_STUDENTS_URL}`, {
            params: {
                pageNumber: paginationParams.pageNumber,
                pageSize: paginationParams.pageSize                
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching students:", error);
        throw error; // Handle this in your component
    }
}

export async function fetchSearchStudents(
    paginationParams: PaginationParamsModel,
    searchValue: string | null
): Promise<PagedResultModel<StudentDetailModel>> {
    try {
        const response = await apiClient.get<PagedResultModel<StudentDetailModel>>(`${SEARCH_STUDENT_URL}`, {
            params: {
                pageNumber: paginationParams.pageNumber,
                pageSize: paginationParams.pageSize,
                searchValue: searchValue
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching searched students:", error);
        throw error; // Handle this in your component
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchAdmins(
    paginationParams: PaginationParamsModel
): Promise<PagedResultModel<AdminUserModel>> {
    try {
        const response = await apiClient.get<PagedResultModel<AdminUserModel>>(`${GET_ADMINS_URL}`, {
            params: {
                pageNumber: paginationParams.pageNumber,
                pageSize: paginationParams.pageSize,
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching admins:", error);
        throw error; // Handle this in your component
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchAdminUser(
    userId: number | null
): Promise<AdminUserModel> {
    try {
        const response = await apiClient.get<AdminUserModel>(`${GET_ADMIN_URL}`, {
            params: {
                userId: userId                
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching admins:", error);
        throw error; // Handle this in your component
    }
}

// Add New Announcement
export const addStudent = async (formData: FormData) => {
    try {
        const response = await apiClient.post(`${ADD_STUDENT_URL}`, formData);
        return response.data; // Return the response data if needed
    } catch (error) {
        throw new Error(`Error adding student: ${error}`);
    }
};

// Add New Announcement
export const updateAdminUser = async (formData: FormData) => {
    try {        
        const response = await apiClient.post(`${UPDATE_ADMIN_URL}`, formData);
        return response.data; // Return the response data if needed
    } catch (error) {
        throw new Error(`Error updating admin profile: ${error}`);
    }
};