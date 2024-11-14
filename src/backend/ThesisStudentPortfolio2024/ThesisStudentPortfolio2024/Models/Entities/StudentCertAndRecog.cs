using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class StudentCertAndRecog
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public int CertRecogType {  get; set; } // 1 = Certificate; 2 = Recoginition
        public DateTime LastModifiedDate { get; set; } = DateTime.Now;
        [Required]
        public int UserId { get; set; }
    }
}
