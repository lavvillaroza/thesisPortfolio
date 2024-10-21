export interface SubjectModel {
    id: number;
    subjectname: string;
    subjectDescription: string;
    prereq: string;
    lec: number;
    lab: number;
    units: number;
    hours: number;
    year: number;
    term: number;
    createdBy: string;
    createdDate: string;
    lastModifiedBy: string;
    lastModifiedDate: string;    
  }