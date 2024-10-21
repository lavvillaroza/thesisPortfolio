namespace ThesisStudentPortfolio2024.Models
{
    public class UserDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }        
        public short UserType { get; set; } // 0 - student, 1 - admin
    }
}
