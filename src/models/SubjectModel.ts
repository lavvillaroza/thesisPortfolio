export interface SubjectModel {
    id: number;
    subjectName: string;
    subjectDescription: string;
    prereq: string;
    lec: number;
    lab: number;
    units: number;
    hrs: number;       
    createdBy: string;
    createdDate: string;
    lastModifiedBy: string;
    lastModifiedDate: string;    
  }