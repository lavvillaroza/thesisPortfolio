using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class StudentInformation
    {
        [Key]
        public int Id { get; set; }        
        public required string AboutMe { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public ICollection<StudentInformationDetail>? StudentInformationDetails { get; set; }
        public int UserId { get; set; }
        [JsonIgnore]        
        public StudentUser? StudentUser { get; set; }
    }
}
