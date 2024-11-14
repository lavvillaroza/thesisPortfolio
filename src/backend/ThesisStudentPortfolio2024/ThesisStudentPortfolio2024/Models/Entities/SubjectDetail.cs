using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class SubjectDetail
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int SubjectId { get; set; }
        [Required]
        public int CourseId { get; set; }
    }
}
