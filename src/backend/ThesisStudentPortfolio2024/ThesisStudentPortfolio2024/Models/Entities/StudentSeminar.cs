using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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
        public char Deleted { get; set; }        
        public DateTime CreatedDate { get; set; }        
        public DateTime LastModifiedDate { get; set; }
        public int UserId { get; set; }

        [JsonIgnore]        
        public StudentUser StudentUser { get; set; }

    }
}
