using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class StudentSubjectTaken
    {
        [Key]
        public int SubjectId { get; set; }
        [Required]
        public string SubjectName { get; set; }
        [Required]
        public string SubjectDescription { get; set; }
        [Required]
        public string Prereq { get; set; }
        [Required]
        public short Lec { get; set; }
        [Required]
        public short Lab { get; set; }
        [Required]
        public short Units { get; set; }
        [Required]
        public short Hrs { get; set; }
        [Required]
        public int StudentId { get; set; }

    }
}
