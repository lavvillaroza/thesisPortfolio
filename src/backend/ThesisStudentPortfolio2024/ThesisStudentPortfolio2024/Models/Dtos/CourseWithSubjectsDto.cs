using System.ComponentModel.DataAnnotations;
namespace ThesisStudentPortfolio2024.Models.Dtos
{
    public class CourseWithSubjectsDto
    {        
        public int Id { get; set; }        
        public string CourseName { get; set; } = string.Empty;        
        public string CourseCode { get; set; } = string.Empty;        
        public int TotalUnitsRequired { get; set; }
        public IEnumerable<StudentSubjectTakenDto> SubjectsTaken { get; set; }
    }
}
