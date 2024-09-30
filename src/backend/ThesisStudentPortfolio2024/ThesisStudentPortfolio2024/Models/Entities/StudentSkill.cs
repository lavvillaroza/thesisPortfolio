using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class StudentSkill
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int SkillId { get; set; }        
        public short SkillRating { get; set; } // 0 = Well, 1 = Better, 2 = Best
        public char Deleted { get; set; }      // Y = YES, N = No         
        public DateTime CreatedDate { get; set; }
    }
}
