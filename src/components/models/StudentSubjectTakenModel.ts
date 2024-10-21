import { SubjectModel } from "./SubjectModel";

export interface StudentSubjectTakenModel {
    id: number;
    deleted: number;
    createdDate: string;
    lastModifiedDate: string;
    subject: SubjectModel[];    
  }