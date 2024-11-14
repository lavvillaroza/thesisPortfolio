
using System.ComponentModel.DataAnnotations;
namespace ThesisStudentPortfolio2024.Models.Dtos
{
    public class SkillDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string SkillName { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
