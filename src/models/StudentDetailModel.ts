export interface StudentDetailModel {
    id: number;
    studentId: string;
    studentName: string;    
    course: string;
    yearLevel: string;
    yearStart?: number;
    yearEnd?: number;
    section: string;
    schoolEmail: string;
    personalEmail?: string;
    portfolioURL: string;
    profilePicture?: string;    
  }