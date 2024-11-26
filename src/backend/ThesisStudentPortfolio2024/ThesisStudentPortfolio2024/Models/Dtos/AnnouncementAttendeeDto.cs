using System.ComponentModel.DataAnnotations;
using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Models.Dtos
{
    public class AnnouncementAttendeeDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int StudentAttendanceStatus { get; set; } //1 = Registered, 2 = Absent, 3 = Attended        
        [Required]
        public int AnnouncementId { get; set; }
        [Required]
        public int StudentUserId { get; set; }
        public string StudentName { get; set; } = string.Empty;
        public string StudentCourse { get; set; } = string.Empty;
        public string StudentYearLevel { get; set; } = string.Empty;
        public string StudentEmail { get; set; } = string.Empty;        
        [Required]
        public string LastModifiedBy { get; set; } = string.Empty;        

    }
}
