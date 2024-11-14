using System.ComponentModel.DataAnnotations;
namespace ThesisStudentPortfolio2024.Models.Dtos
{
    public class AdminUserProfileDto
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Position { get; set; } = string.Empty;
        [Required]
        public string SchoolEmail { get; set; } = string.Empty;
        [Required]
        public string LastModifiedBy { get; set; } = string.Empty;
    }
}
