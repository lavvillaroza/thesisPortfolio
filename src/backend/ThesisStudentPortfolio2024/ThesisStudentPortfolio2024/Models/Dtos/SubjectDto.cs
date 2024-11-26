using System.ComponentModel.DataAnnotations;
using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Models.Dtos
{
    public class SubjectDto
    {        
        public int Id { get; set; }
        [Required]
        public string SubjectName { get; set; } = string.Empty;
        [Required]
        public string SubjectDescription { get; set; } = string.Empty;
        public string Prereq { get; set; } = "NONE";
        public short Lec { get; set; }
        public short Lab { get; set; }
        public short Units { get; set; }
        public short Hrs { get; set; }        
        [Required]
        public string CreatedBy { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        [Required]
        public string LastModifiedBy { get; set; } = string.Empty;
        public DateTime LastModifiedDate { get; set; } = DateTime.Now;
    }
}
