using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class Announcement
    {
        [Key]
        public int Id { get; set; }        
        public required string Title { get; set; }        
        public required string Description { get; set; }        
        public DateTime DateTimeFrom {  get; set; }        
        public DateTime DateTimeTo { get; set; }        
        public short AnnouncementType { get; set; } //0 = Event Announcement, 1 = FYI Announcement, 2 = Seminar Announcemnet
        public required string CreatedBy { get; set; }        
        public DateTime CreatedDate { get; set; }        
        public required string LastModifiedBy { get; set; }        
        public DateTime LastModifiedDate { get; set; }
        public ICollection<AnnouncementAttendee>? AnnouncementAttendees { get; set; }
        public ICollection<AnnouncementDetail>? AnnouncementDetails { get; set;}

    }
}
