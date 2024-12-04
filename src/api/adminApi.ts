import { PagedResultModel } from '../models/PagedResultModel';
import { PaginationParamsModel } from '../models/PaginationParamsModel';
import apiClient from '../api/apiClient';
import { StudentDetailModel } from '../models/StudentDetailModel';
import { ADD_STUDENT_URL, CHANGE_ADMIN_PWD_URL, GET_ADMIN_URL, GET_ADMINS_URL, GET_STUDENTS_URL, SEARCH_STUDENT_URL, UPDATE_ADMIN_URL } from './apiConfig';
import { AdminUserModel } from '../models/AdminUserModel';
import { ChangeUserPasswordModel } from '../models/ChanceUserPasswordModel';
import Cookies from 'js-cookie';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchStudents(
    paginationParams: PaginationParamsModel
): Promise<PagedResultModel<StudentDetailModel>> {
    try {
        const token = Cookies.get('jwtToken');
        const response = await apiClient.get<PagedResultModel<StudentDetailModel>>(`${GET_STUDENTS_URL}`, {
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
        console.error("Error fetching students:", error);
        throw error; // Handle this in your component
    }
}

export async function fetchSearchStudents(
    paginationParams: PaginationParamsModel,
    searchValue: string | null
): Promise<PagedResultModel<StudentDetailModel>> {
    try {
        const token = Cookies.get('jwtToken');
        const response = await apiClient.get<PagedResultModel<StudentDetailModel>>(`${SEARCH_STUDENT_URL}`, {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchAdmins(
    paginationParams: PaginationParamsModel
): Promise<PagedResultModel<AdminUserModel>> {
    try {
        const token = Cookies.get('jwtToken');
        const response = await apiClient.get<PagedResultModel<AdminUserModel>>(`${GET_ADMINS_URL}`, {
            params: {
                pageNumber: paginationParams.pageNumber,
                pageSize: paginationParams.pageSize,
            }, 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
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
        const token = Cookies.get('jwtToken');
        const response = await apiClient.get<AdminUserModel>(`${GET_ADMIN_URL}`, {
            params: {
                userId: userId                
            }, 
            headers: {                
                'Authorization': `Bearer ${token}` // Include your JWT if required
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
        const token = Cookies.get('jwtToken');
        const response = await apiClient.post(`${ADD_STUDENT_URL}`, formData, {           
            headers: {                
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data; // Return the response data if needed
    } catch (error) {
        throw new Error(`Error adding student: ${error}`);
    }
};

// Add New Announcement
export const updateAdminUser = async (formData: FormData) => {
    try {    
        const token = Cookies.get('jwtToken');    
        const response = await apiClient.post(`${UPDATE_ADMIN_URL}`, formData, {           
            headers: {                
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data; // Return the response data if needed
    } catch (error) {
        throw new Error(`Error updating admin profile: ${error}`);
    }
};

// Update Admin Password
export const updateAdminPassword = async (userId: number, updatedData: ChangeUserPasswordModel) => {
    try {
        const token = Cookies.get('jwtToken');
        const response = await apiClient.put(`${CHANGE_ADMIN_PWD_URL}${userId}`, updatedData, {           
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data; // Return the response data if needed
    } catch (error) {
        throw new Error(`Error updating admin password: ${error}`);
    }
};
