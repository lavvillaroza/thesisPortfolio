namespace ThesisStudentPortfolio2024.Models
{
    public class UserDTO
    {
        public required string Username { get; set; }
        public required string Password { get; set; }        
        public short UserType { get; set; } // 0 - student, 1 - admin
    }
}
