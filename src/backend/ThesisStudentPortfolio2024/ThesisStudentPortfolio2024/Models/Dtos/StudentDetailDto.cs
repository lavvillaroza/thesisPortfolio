using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models.Dtos
{
    public class StudentDetailDto
    {        
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public string StudentId { get; set; } = string.Empty;
        [Required]
        public string StudentName { get; set; } = string.Empty;
        public int CourseId { get; set; }
        public string CourseName { get; set; } = string.Empty;
        [Required]
        public int YearLevel { get; set; }
        [Required]
        public string Section { get; set; } = string.Empty;
        [Required]
        public int YearStart { get; set; }
        public int? YearEnd { get; set; }
        [Required]
        public string SchoolEmail { get; set; } = string.Empty;
        public string? PersonalEmail { get; set; }
        public string? PortfoliuURL { get; set; }
        public string? AttachedResume { get; set; }
        public IFormFile? AttachedResumeFile { get; set; }
        public string CreatedBy { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
        public string LastModifiedBy { get; set; } = string.Empty;
        public DateTime LastModifiedDate { get; set; }        
    }
}
