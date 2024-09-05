namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class AdminUser
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Position { get; set; }
        public required string Email { get; set; }
        public string UserName { get; set; }
        public required string Password { get; set; }
        public char Deleted { get; set; }
        public int Version { get; set; }
        public string CreatedBy {  get; set; }
        public DateTime CreatedDate { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime LastModifiedDate { get; set; }
    }
}
