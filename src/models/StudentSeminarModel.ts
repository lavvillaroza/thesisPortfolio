export interface StudentSeminarModel {
    id: number;
    userId: number;
    title: string;
    facilitator: string;
    dateAttended: Date;        
    reflection: string;
    seminarType: number;    
    seminarId: number;    
  }