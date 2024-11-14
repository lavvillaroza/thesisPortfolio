using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models.Dtos
{
    public class UserDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Username { get; set; } = "";
        [Required]
        public string Password { get; set; } = "";
        [Required]
        public short UserType { get; set; } // 0 - student, 1 - admin
    }
}
