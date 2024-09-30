using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class AnnouncementAttendee
    {
        [Key]
        public int Id { get; set; }
        public int StudentUserId { get; set; }        
        public short StudentAttendanceStatus { get; set; } //0 = To confirm, 1 = Registered, 2 = Absent, 3 = Attended
        public DateTime CreatedDate { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime LastModifiedDate { get; set; }

        [ForeignKey("Announcement")]
        public int AnnouncementId { get; set; }
        public Announcement Announcement { get; set; }
    }
}
