using System.ComponentModel.DataAnnotations;
using ThesisStudentPortfolio2024.Models.Entities;
namespace ThesisStudentPortfolio2024.Models.Dtos
{
    public class StudentSubjectTakenDto
    {
        [Key]
        public int Id { get; set; }        
        [Required]
        public int UserId { get; set; }
        [Required]
        public int SubjectId { get; set; }
        [Required]
        public string SubjectName { get; set; } = string.Empty;
        [Required]
        public string SubjectDescription { get; set; } = string.Empty;
        [Required]
        public int SubjectStatus { get; set; } = 0; //0 = On-Going 1 = Passed; 2 = failed;
        public string Prereq { get; set; } = "NONE";
        public int Lec { get; set; }
        public int Lab { get; set; }
        public int Units { get; set; }
        public int Hrs { get; set; }                
    }
}
