using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class StudentSkill
    {
        [Key]
        public int Id { get; set; }                
        public short SkillRating { get; set; } // 0 = Well, 1 = Better, 2 = Best
        public char Deleted { get; set; }      // Y = YES, N = No         
        public DateTime CreatedDate { get; set; }
        public int SkillId { get; set; }
        public Skill? Skill { get; set; }
        public int UserId { get; set; }
        [JsonIgnore]        
        public StudentUser? StudentUser { get; set; }
        
        
    }
}
