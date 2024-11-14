using System.ComponentModel.DataAnnotations;
using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Models.Dtos
{
    public class StudentUserDto
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        public string? UserName { get; set; }
        [Required]
        public string? Password { get; set; }        
        [Required]
        public int Version { get; set; }
        [Required]
        public string? CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        [Required]
        public string LastModifiedBy { get; set; }
        public DateTime LastModifiedDate { get; set; }        
    }
}
