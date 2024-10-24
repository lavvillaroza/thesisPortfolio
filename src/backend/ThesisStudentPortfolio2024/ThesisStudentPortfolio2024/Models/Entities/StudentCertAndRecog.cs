using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class StudentCertAndRecog
    {
        [Key]
        public int Id { get; set; }                
        public required string Title { get; set; }
        public required string Description { get; set; }        
        public short CertRecogType {  get; set; }
        public DateTime LastModifiedDate { get; set; }                
        public int UserId { get; set; }
        [JsonIgnore]
        public StudentUser StudentUser { get; set; }
    }
}
