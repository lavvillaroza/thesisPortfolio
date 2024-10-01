using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class AdminUser
    {
        [Key]
        public int UserId { get; set; }        
        public string FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string LastName { get; set; }
        public string Position { get; set; }        
        public string UserName { get; set; }        
        public string Password { get; set; }        
        public string Email { get; set; }        
        public char Deleted { get; set; }
        public int Version { get; set; }
        public string CreatedBy {  get; set; }
        public DateTime CreatedDate { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime LastModifiedDate { get; set; }
    }
}
