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
        [Required]
        public short UserType { get; set; } // 0 - student, 1 - admin
    }
}
