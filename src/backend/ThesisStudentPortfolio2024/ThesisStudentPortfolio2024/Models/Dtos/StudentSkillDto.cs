using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models.Dtos
{
    public class StudentSkillDto
    {        
        [Required]
        public int Id { get; set; }
        [Required]
        public short SkillRating { get; set; } // 0 = Well, 1 = Better, 2 = Best        
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        [Required]
        public SkillDto? Skill { get; set; }
        [Required]
        public int UserId { get; set; }
    }
}
