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
import { P_GET_STUDENT_CERTIFICATES_URL, P_GET_STUDENT_COURSE_PROGRESS_URL, P_GET_STUDENT_DETAIL_URL, P_GET_STUDENT_FUTURE_CAREER_URL, 
    P_GET_STUDENT_INFO_URL, P_GET_STUDENT_RECOGNITIONS_URL, P_GET_STUDENT_SEMINARS_URL, 
    P_GET_STUDENT_SKILLS_URL, P_GET_STUDENT_SUBJECTS_TAKEN_URL} from "./apiConfig";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchStudentDetail(
    userId: number | null
): Promise<StudentDetailModel> {
    try {
        const response = await apiClient.get<StudentDetailModel>(`${P_GET_STUDENT_DETAIL_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching detail:", error);
        throw error; // Handle this in your component
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchStudentInformation(
    userId: number | null
): Promise<StudentInformationModel> {
    try {
        const response = await apiClient.get<StudentInformationModel>(`${P_GET_STUDENT_INFO_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching detail:", error);
        throw error; // Handle this in your component
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchStudentSubjectsTaken(
    paginationParams: PaginationParamsModel,    
    userId: number | null
): Promise<PagedResultModel<StudentSubjectTakenModel>> {
    try {
        const response = await apiClient.get<PagedResultModel<StudentSubjectTakenModel>>(`${P_GET_STUDENT_SUBJECTS_TAKEN_URL}/${userId}`, {
            params: {
                pageNumber: paginationParams.pageNumber,
                pageSize: paginationParams.pageSize,                
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching subjects taken:", error);
        throw error; // Handle this in your component
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchStudentSkills(
    userId: number | null
): Promise<StudentSkillModel[]> {
    try {
        const response = await apiClient.get<StudentSkillModel[]>(`${P_GET_STUDENT_SKILLS_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching skills:", error);
        throw error; // Handle this in your component
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchStudentFutureCareers(
    userId: number | null
): Promise<PredictedCareerModel[]> {
    try {
        const response = await apiClient.get<PredictedCareerModel[]>(`${P_GET_STUDENT_FUTURE_CAREER_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error careers prediction", error);
        throw error; // Handle this in your component
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchStudentCertificates(
    userId: number | null
): Promise<StudentCertAndRecogModel[]> {
    try {
        const response = await apiClient.get<StudentCertAndRecogModel[]>(`${P_GET_STUDENT_CERTIFICATES_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching Student Certificates", error);
        throw error; // Handle this in your component
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchStudentRecognitions(
    userId: number | null
): Promise<StudentCertAndRecogModel[]> {
    try {
        const response = await apiClient.get<StudentCertAndRecogModel[]>(`${P_GET_STUDENT_RECOGNITIONS_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching Student Recognitions", error);
        throw error; // Handle this in your component
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchStudentSeminars(
    userId: number | null
): Promise<StudentSeminarModel[]> {
    try {
        const response = await apiClient.get<StudentSeminarModel[]>(`${P_GET_STUDENT_SEMINARS_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching Student Seminars", error);
        throw error; // Handle this in your component
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchCourseProgressByStudentUserId(    
    userId: number
): Promise<StudentCourseWithSubjectsModel> {
    try {        
        const response = await apiClient.get<StudentCourseWithSubjectsModel>(`${P_GET_STUDENT_COURSE_PROGRESS_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching course progress using student user id:", error);
        throw error; // Handle this in your component
    }
}