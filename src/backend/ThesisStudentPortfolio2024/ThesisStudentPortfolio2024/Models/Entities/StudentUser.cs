using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class StudentUser
    {
        [Key]
        public int UserId { get; set; }        
        public string UserName { get; set; }        
        public  string Password { get; set; }
        public char Deleted { get; set; }
        public int Version { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime LastModifiedDate { get; set; }                
        public StudentDetail StudentDetail { get; set; }
        public StudentInformation StudentInformation { get; set; }
        public ICollection<StudentSeminar> StudentSeminars { get; set; }
        public ICollection<StudentSkill> StudentSkills { get; set; }
        public ICollection<StudentSubjectTaken> StudentSubjectTakens { get; set; }
        public ICollection<StudentCertAndRecog> StudentCertAndRecogs { get; set; }
    }
}
