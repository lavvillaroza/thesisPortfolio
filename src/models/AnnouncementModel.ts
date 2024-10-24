import { AnnouncementAttendeeModel } from "./AnnouncementAttendeesModel";
import { AnnouncementDetailModel } from "./AnnouncementDetailModel";

export interface AnnouncementModel {
    id: number;
    title: string;
    description: string;
    dateFrom: string;
    dateTo: string;
    announcementType: number;
    announcementDetails: AnnouncementDetailModel[];
    announcementAttendees: AnnouncementAttendeeModel[];
}