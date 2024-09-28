using System.ComponentModel.DataAnnotations;

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
    }
}
