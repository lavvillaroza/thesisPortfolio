using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class Course
    {
        [Key]
        public int Id { get; set; }
        public required string CourseName { get; set; }
        public required string CourseCode { get; set; }
        public int TotalUnitsRequired { get; set; }
        public string? CourseLogo { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime CreatedBy { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public DateTime LastModifiedBy { get; set; }
    }
}
