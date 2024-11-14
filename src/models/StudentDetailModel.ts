export interface StudentDetailModel {
    id: number;
    userId: number;
    studentId: string;
    studentName: string;    
    courseId: number;
    courseName: string;
    yearLevel: number;
    yearStart: number;
    yearEnd: number | null;
    section: string;
    schoolEmail: string;
    personalEmail: string;
    portfolioURL: string;
    attachedResume: string;
    attachedResumeFile: File | null;
    createdBy: string;
    createdDate: null;
    lastModifiedBy: string;
    lastModifiedDate: null;
  }