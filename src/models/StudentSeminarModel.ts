export interface StudentSeminarModel {
    id: number;
    userId: number;
    title: string;
    facilitator: string;
    dateAttended: Date;            
    seminarType: number;    
    seminarId: number;    
  }