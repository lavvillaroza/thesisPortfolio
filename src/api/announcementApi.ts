import { PagedResultModel } from '../models/PagedResultModel';
import { AnnouncementModel } from '../models/AnnouncementModel';
import { PaginationParamsModel } from '../models/PaginationParamsModel';
import apiClient from '../api/apiClient';
import { ADD_ANNOUNCEMENT_URL, SEMINARS_URL, ANNOUNCEMENTS_URL,  SEARCH_SEMINARS_URL, SEMINAR_ATTENDEES_URL, ADD_SEMINAR_ATTENDEE_URL } from './apiConfig';
import { SeminarAttendeesModel } from '../models/SeminarAttendeesModel';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchAnnouncementsWithDetails(
    paginationParams: PaginationParamsModel,
    currentDate?: string | null
): Promise<PagedResultModel<AnnouncementModel>> {
    try {
        const response = await apiClient.get<PagedResultModel<AnnouncementModel>>(`${ANNOUNCEMENTS_URL}`, {
            params: {
                pageNumber: paginationParams.pageNumber,
                pageSize: paginationParams.pageSize,
                currentDate: currentDate
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
        const response = await apiClient.get<PagedResultModel<AnnouncementModel>>(`${SEARCH_SEMINARS_URL}`, {
            params: {
                pageNumber: paginationParams.pageNumber,
                pageSize: paginationParams.pageSize,
                searchValue: searchValue
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
        console.log('API: ' + selectedYear)
        const response = await apiClient.get<PagedResultModel<AnnouncementModel>>(`${SEMINARS_URL}`, {
            params: {
                pageNumber: paginationParams.pageNumber,
                pageSize: paginationParams.pageSize,
                selectedYear: selectedYear
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
): Promise<PagedResultModel<SeminarAttendeesModel>> {
    try {        
        const response = await apiClient.get<PagedResultModel<SeminarAttendeesModel>>(`${SEMINAR_ATTENDEES_URL}`, {
            params: {
                pageNumber: paginationParams.pageNumber,
                pageSize: paginationParams.pageSize,
                announcementId: announcementId
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
        const response = await apiClient.post(`${ADD_ANNOUNCEMENT_URL}`, formData);
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
        console.log(userId + ' From API')
        console.log(announcementId + ' From API')
        const response = await apiClient.post(`${ADD_SEMINAR_ATTENDEE_URL}`, 
            null, // No data in the body
            {
            params: {                
                announcementId: announcementId, 
                userId: userId
            }});
        // Check the response message and handle accordingly
        return response.data;        
    } catch (error) {
        throw new Error(`Error adding Attendee: ${error}`);
    }
};