using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class StudentSkill
    {
        [Key]        
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public string SkillName { get; set; } = string.Empty;
        [Required]
        public short SkillRating { get; set; } // 0 = Well, 1 = Better, 2 = Best        
        public DateTime CreatedDate { get; set; } = DateTime.Now;                
    }
}
