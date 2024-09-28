using Microsoft.OpenApi.Writers;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class StudentDetail
    {
        [Key]
        public int Id { get; set; }        
        public string StudentId { get; set; }        
        public string FirstName { get; set; }        
        public string? MiddleName { get; set; }        
        public string LastName { get; set; }        
        public string Course { get; set; }        
        public string SchoolEmail { get; set; }        
        public string? PersonalEmail { get; set; }        
        public string PortfolioUrl { get; set; }
        public string? ProfilePicture { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public string GetFullName()
        {
            string fullName = this.FirstName + " " + this.MiddleName + " " + this.LastName;

            return fullName;
        }
        [ForeignKey("Announcement")]
        public int UserId { get; set; }
        public StudentUser StudentUser { get; set; }
    }
}
