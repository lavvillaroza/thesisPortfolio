import { CourseModel } from "../models/CourseModel";
import apiClient from "./apiClient";
import { COURSES_URL } from "./apiConfig";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchCourses(    
): Promise<CourseModel[]> {
    try {
        const response = await apiClient.get<CourseModel[]>(`${COURSES_URL}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error; // Handle this in your component
    }
}

// Add New Announcement
export const addCourse = async (formData: FormData) => {
    try {
        const response = await apiClient.post(`${COURSES_URL}`, formData);
        return response.data; // Return the response data if needed
    } catch (error) {
        throw new Error(`Error adding course: ${error}`);
    }
};