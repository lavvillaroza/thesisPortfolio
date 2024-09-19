using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class StudentDetail
    {
        [Key]
        public int Id { get; set; }        
        public int UserId { get; set; }
        [Required]
        public string StudentId { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string MiddleName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Course { get; set; }
        [Required]
        public string Email { get; set; }        
        public string PortfolioUrl { get; set; }        
        [Required]
        public DateTime LastModifiedDate { get; set; }

        public string GetFullName()
        {
            string fullName = this.FirstName + " " + this.MiddleName + " " + this.LastName;

            return fullName;
        }

    }
}
