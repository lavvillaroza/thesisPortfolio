using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class StudentInformation
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public string AboutMe { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastModifiedDate { get; set; }

        public ICollection<StudentInformationDetail> StudentInformationDetails { get; set; }
    }
}
