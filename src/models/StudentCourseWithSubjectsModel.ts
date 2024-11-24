import { StudentSubjectTakenModel } from "./StudentSubjectTakenModel";

export interface StudentCourseWithSubjectsModel {
    id: number;
    courseName: string;
    courseCode: string;
    totalUnitsRequired: number;
    subjectsTaken: StudentSubjectTakenModel[];    
  }