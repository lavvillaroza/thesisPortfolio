using System.ComponentModel.DataAnnotations;
namespace ThesisStudentPortfolio2024.Models.Dtos
{
    public class ChangePasswordDto
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public string CurrentPassword { get; set; } = "";
        [Required]
        public string NewPassword { get; set; } = "";        
    }
}
