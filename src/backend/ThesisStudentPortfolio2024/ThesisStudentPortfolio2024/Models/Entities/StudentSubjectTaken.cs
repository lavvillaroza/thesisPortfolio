using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class StudentSubjectTaken
    {
        [Key]
        public int Id { get; set; }
        public char Deleted { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public int UserId { get; set; }
        public int SubjectId { get; set; }        
        public Subject? Subject { get; set; }

        [JsonIgnore]        
        public StudentUser? StudentUser { get; set; }
    }
}

