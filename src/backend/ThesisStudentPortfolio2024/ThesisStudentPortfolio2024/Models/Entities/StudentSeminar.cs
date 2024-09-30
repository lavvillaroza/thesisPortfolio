using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class StudentSeminar
    {
        [Key]
        public int Id { get; set; }        
        public string Title { get; set; }
        public string Facilitator { get; set; }
        public DateTime DateAttendedFrom { get; set; }        
        public DateTime DateAttendedTo { get; set; }        
        public DateTime TimeAttended { get; set; }
        public string Reflection {  get; set; }
        public short SeminarType { get; set; } //0 = From School, 1 = Others        
        public int UserId { get; set; }
        public char Deleted { get; set; }        
        public DateTime CreatedDate { get; set; }        
        public DateTime LastModifiedDate { get; set; }
    }
}
