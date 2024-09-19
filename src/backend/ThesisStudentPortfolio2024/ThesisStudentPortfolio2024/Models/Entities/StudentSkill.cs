using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class StudentSkill
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string SkillName { get; set; }
        [Required]
        public short SkillRatings { get; set; }
    }
}
