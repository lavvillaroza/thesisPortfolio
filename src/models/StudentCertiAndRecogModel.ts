export interface StudentCertAndRecogModel {
    id: number;
    userId: number;
    name: string;
    attachment: string;
    attachmentFile: File | null;
    certRecogType: number;    
  }