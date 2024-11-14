import { AnnouncementDetailModel } from "./AnnouncementDetailModel";

export interface AnnouncementModel {
    id: number;
    title: string;
    description: string;
    dateFrom: string;
    dateTo: string;    
    announcementType: number;
    images: File | null;        
    createdBy: string;
    createdDate: Date | null;
    lastModifiedBy: string;
    lastModifiedDate: Date | null;
    announcementDetails: AnnouncementDetailModel[];
}