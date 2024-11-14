export interface StudentUserProfileModel {
    id: number;
    studentId: string;
    studentName: string;    
    courseId: number;
    courseName: string;
    yearLevel: string;
    yearStart: string;
    yearEnd?: string | null;
    section: string;
    schoolEmail: string;
    personalEmail: string | null;
    portfolioURL: string | null;
    profilePictureUrl: string | null;
    profilePicture: File | null;    
  }