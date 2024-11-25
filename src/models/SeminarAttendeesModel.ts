export interface SeminarAttendeesModel {
    id: number;
    studentUserId: number;
    studentName: string;
    studentCourse: string;
    studentYearLevel: string;
    studentAttendanceStatus: number;
    createdDate: string;
    lastModifiedBy: string;
    lastModifiedDate: string;    
}