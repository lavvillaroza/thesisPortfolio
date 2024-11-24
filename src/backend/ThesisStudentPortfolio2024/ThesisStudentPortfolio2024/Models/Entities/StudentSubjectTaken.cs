using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class StudentSubjectTaken
    {
        [Key]
        public int Id { get; set; }                
        [Required]
        public int UserId { get; set; }        
        [Required]
        public int SubjectId { get; set; }
        [Required]
        public int SubjectStatus { get; set; } = 0; //0 = On-Going 1 = Passed; 2 = failed;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime LastModifiedDate { get; set; } = DateTime.Now;
    }
}

