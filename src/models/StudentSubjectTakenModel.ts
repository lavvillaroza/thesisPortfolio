export interface StudentSubjectTakenModel {
    id: number;
    userId: number;
    subjectId: number;
    subjectName: string;
    subjectDescription: string;
    subjectStatus: number;
    prereq: string;
    lec: number;
    lab: number;
    units: number;
    hrs: number;        
  }