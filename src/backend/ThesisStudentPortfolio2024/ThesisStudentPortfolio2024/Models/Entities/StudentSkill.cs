using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class StudentSkill
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public short SkillRating { get; set; } // 0 = Well, 1 = Better, 2 = Best        
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        [Required]
        public int SkillId { get; set; }
        [Required]
        public int UserId { get; set; }        
    }
}
