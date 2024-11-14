using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class AnnouncementAttendee
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int StudentAttendanceStatus { get; set; } //1 = Registered, 2 = Absent, 3 = Attended                
        [Required]
        public int AnnouncementId { get; set; }
        [Required]
        public int StudentUserId { get; set; }        
        [Required]
        public string LastModifiedBy { get; set; } = string.Empty;
        public DateTime LastModifiedDate { get; set; } = DateTime.Now;        
    }
}
