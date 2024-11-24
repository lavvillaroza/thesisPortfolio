using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models.Dtos
{
    public class CourseDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string CourseName { get; set; } = string.Empty;
        [Required]
        public string CourseCode { get; set; } = string.Empty;
        [Required]
        public int TotalUnitsRequired { get; set; }
        public IFormFile? CourseLogo { get; set; }
        public string? CourseLogoUrl { get; set; }
        [Required]
        public string CreatedBy { get; set; } = string.Empty;
        [Required]
        public string LastModifiedBy { get; set; } = string.Empty;

    }
}
