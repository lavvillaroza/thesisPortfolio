using Microsoft.OpenApi.Writers;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;


namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class StudentDetail
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string StudentId { get; set; } = string.Empty;
        [Required]
        public string StudentName { get; set; } = string.Empty;
        [Required]
        public int YearLevel { get; set; }
        [Required]
        public string Section { get; set; } = string.Empty;
        [Required]
        public int YearStart { get; set; }
        public int? YearEnd { get; set; }
        [Required]
        public string SchoolEmail { get; set; } = string.Empty;
        public string PersonalEmail { get; set; } = string.Empty;
        public string PortfolioUrl { get; set; } = string.Empty;
        public string AttachedResume { get; set; } = string.Empty;
        public string CreatedBy { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public string LastModifiedBy { get; set; } = string.Empty;
        public DateTime LastModifiedDate { get; set; } = DateTime.Now;
        [Required]
        public int UserId { get; set; }
        [Required]
        public int CourseId { get; set; }

    }
}
