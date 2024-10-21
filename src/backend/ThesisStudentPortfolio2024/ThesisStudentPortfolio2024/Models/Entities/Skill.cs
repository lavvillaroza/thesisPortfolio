using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class Skill
    {
        [Key]
        public int Id { get; set; }
        public string SkillName { get; set; }        
        public char Deleted { get; set; }
        public DateTime CreatedDate { get; set; }               
        public ICollection<StudentSkill> StudentSkills { get; set; }
    }
}
