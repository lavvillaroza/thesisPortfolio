using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class AdminUser
    {
        [Key]
        public int UserId { get; set; }        
        public required string Name { get; set; }        
        public required string Position { get; set; }        
        public required string UserName { get; set; }        
        public required string Password { get; set; }        
        public required string Email { get; set; }        
        public char Deleted { get; set; }
        public int Version { get; set; }
        public required string CreatedBy {  get; set; }
        public DateTime CreatedDate { get; set; }
        public required string LastModifiedBy { get; set; }
        public DateTime LastModifiedDate { get; set; }
    }
}
