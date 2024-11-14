using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class StudentSeminar
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Title { get; set; }
        [Required]
        public string? Facilitator { get; set; }
        [Required]
        public DateTime DateAttended { get; set; }
        [Required]
        public string TimeStart { get; set; } = string.Empty;
        [Required]
        public string TimeEnd { get; set; } = string.Empty;
        public string? Reflection {  get; set; }
        [Required]
        public short SeminarType { get; set; } //0 = From School, 1 = Others                                
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime LastModifiedDate { get; set; } = DateTime.MinValue;
        [Required]
        public int UserId { get; set; }        

    }
}
