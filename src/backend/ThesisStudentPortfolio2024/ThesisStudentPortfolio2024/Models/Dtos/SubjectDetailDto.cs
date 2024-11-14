using System.ComponentModel.DataAnnotations;
namespace ThesisStudentPortfolio2024.Models.Dtos
{
    public class SubjectDetailDto
    {
        [Required]
        public int CourseId { get; set; }        
        public string? CourseName { get; set; }        
        public string? CourseCode { get; set; }
    }
}
