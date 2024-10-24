import { StudentInformationDetailModel } from "./StudentInformationDetailModel";

export interface StudentInformationModel {
    id: number;
    aboutMe: string;
    studentInformationDetail: StudentInformationDetailModel[];
    createdDate: string;   
    lastModifiedDate: string;    
  }