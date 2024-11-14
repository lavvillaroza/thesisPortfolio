using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models.Dtos
{
    public class CourseDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string? CourseName { get; set; }
        [Required]
        public string? CourseCode { get; set; }
        [Required]
        public int TotalUnitsRequired { get; set; }
        public IFormFile? CourseLogo { get; set; }
        public string? CourseLogoUrl { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? LastModifiedBy { get; set; }
        public DateTime LastModifiedDate { get; set; }

    }
}
