using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class StudentInformation
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public string AboutMe { get; set; } = string.Empty;
        public string? CoverPhotoOne { get; set; }
        public string? CoverPhotoTwo { get; set; }
        public string? CoverPhotoThree { get; set; }
        public string? CoverPhotoFour { get; set; }        
        public DateTime LastModifiedDate { get; set; } = DateTime.Now;        
    }
}
