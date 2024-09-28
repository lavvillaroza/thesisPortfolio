using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class StudentSubjectTaken
    {
        [Key]
        public int Id { get; set; }        
        public int UserId { get; set; }        
        public char Deleted { get; set; }
        public DateTime CreatedDate { get; set; }        
        public DateTime LastModifiedDate { get; set; }
        [ForeignKey("Subject")]
        public int SubjectId { get; set; }
        public Subject Subject { get; set; }
    }
}

