import { PagedResultModel } from '../models/PagedResultModel';
import { AnnouncementModel } from '../models/AnnouncementModel';
import { PaginationParamsModel } from '../models/PaginationParamsModel';
import apiClient from '../api/apiClient';
import { ADD_ANNOUNCEMENT_URL, SEMINARS_URL, ANNOUNCEMENTS_URL,  
        SEARCH_SEMINARS_URL, SEMINAR_ATTENDEES_URL, 
        ADD_SEMINAR_ATTENDEE_URL,
        UPDATE_SEMINAR_ATTENDEE_URL} from './apiConfig';
import { AnnouncementAttendeeModel } from '../models/AnnouncementAttendeeModel';
import Cookies from 'js-cookie';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchAnnouncementsWithDetails(
    paginationParams: PaginationParamsModel,
    currentDate?: string | null
): Promise<PagedResultModel<AnnouncementModel>> {
    try {
        const token = Cookies.get('jwtToken');        
        const response = await apiClient.get<PagedResultModel<AnnouncementModel>>(`${ANNOUNCEMENTS_URL}`, {
            params: {
                pageNumber: paginationParams.pageNumber,
                pageSize: paginationParams.pageSize,
                currentDate: currentDate
            }, 
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}` // Include your JWT if required
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching announcements:", error);
        throw error; // Handle this in your component
    }
}

export async function fetchSearchSeminars(
    paginationParams: PaginationParamsModel,
    searchValue: string | null
): Promise<PagedResultModel<AnnouncementModel>> {
    try {
        const token = Cookies.get('jwtToken');
        const response = await apiClient.get<PagedResultModel<AnnouncementModel>>(`${SEARCH_SEMINARS_URL}`, {
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
        console.error("Error fetching searched seminars:", error);
        throw error; // Handle this in your component
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchSeminars(
    paginationParams: PaginationParamsModel,
    selectedYear?: number | null
): Promise<PagedResultModel<AnnouncementModel>> {
    try {
        const token = Cookies.get('jwtToken');
        const response = await apiClient.get<PagedResultModel<AnnouncementModel>>(`${SEMINARS_URL}`, {
            params: {
                pageNumber: paginationParams.pageNumber,
                pageSize: paginationParams.pageSize,
                selectedYear: selectedYear
            }, 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching announcements:", error);
        throw error; // Handle this in your component
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchSeminarAttendees(
    paginationParams: PaginationParamsModel,
    announcementId?: number | null
): Promise<PagedResultModel<AnnouncementAttendeeModel>> {
    try {
        const token = Cookies.get('jwtToken');        
        const response = await apiClient.get<PagedResultModel<AnnouncementAttendeeModel>>(`${SEMINAR_ATTENDEES_URL}`, {
            params: {
                pageNumber: paginationParams.pageNumber,
                pageSize: paginationParams.pageSize,
                announcementId: announcementId
            }, 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching announcements:", error);
        throw error; // Handle this in your component
    }
}

// Add New Announcement
export const addAnnouncement = async (formData: FormData) => {
    try {
        const token = Cookies.get('jwtToken');
        const response = await apiClient.post(`${ADD_ANNOUNCEMENT_URL}`, formData, {           
            headers: {                
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data; // Return the response data if needed
    } catch (error) {
        throw new Error(`Error adding announcement: ${error}`);
    }
};

// Add Seminar Attendee
export const addSeminarAttendee = async (    
    announcementId: number | null, 
    userId: number | null,) => {
    try {
        const token = Cookies.get('jwtToken');        
        const response = await apiClient.post(`${ADD_SEMINAR_ATTENDEE_URL}`, 
            null, // No data in the body
            {
            params: {                
                announcementId: announcementId, 
                userId: userId
            }, 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }});
        // Check the response message and handle accordingly
        return response.data;        
    } catch (error) {
        throw new Error(`Error adding Attendee: ${error}`);
    }
};

// Update Seminar Attendee
export const updateSeminarAttendee = async (seminarId: number, updatedData: AnnouncementAttendeeModel) => {
    try {
        const token = Cookies.get('jwtToken');
        const response = await apiClient.put(`${UPDATE_SEMINAR_ATTENDEE_URL}${seminarId}`, updatedData, {           
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include your JWT if required
          }
        });
        return response.data; // Return the response data if needed
    } catch (error) {
        throw new Error(`Error updating seminar attendance: ${error}`);
    }
};