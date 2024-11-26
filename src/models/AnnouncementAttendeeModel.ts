export interface AnnouncementAttendeeModel {
    id: number;
    studentAttendanceStatus: number;
    studentUserId: number;
    announcementId: number;
    studentName: string;
    studentCourse: string;
    studentYearLevel: string;
    studentEmail: string;    
    lastModifiedBy: string;    
}