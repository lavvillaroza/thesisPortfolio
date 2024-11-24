using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models.Dtos
{
    public class StudentSeminarDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public string? Title { get; set; }
        [Required]
        public string? Facilitator { get; set; }
        [Required]
        public DateTime DateAttended { get; set; }        
        public string? Reflection { get; set; }
        [Required]
        public int SeminarType { get; set; } //0 = From School, 1 = Others
        public int SeminarId { get; set; } = 0;
    }
}
