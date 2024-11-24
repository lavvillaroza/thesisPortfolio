using System.ComponentModel.DataAnnotations;
using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Models.Dtos
{
    public class AnnouncementDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public DateTime DateTimeFrom { get; set; }
        [Required]
        public DateTime DateTimeTo { get; set; }
        [Required]
        public int AnnouncementType { get; set; }        
        [Required]
        public string CreatedBy { get; set; } = string.Empty; // New field for passing username
        public DateTime CreatedDate { get; set; }
        [Required]
        public string LastModifiedBy { get; set; } = string.Empty; // New field for passing username
        public DateTime LastModifiedDate { get; set; }
        public List<IFormFile>? Images { get; set; } // Use IFormFile for image upload
        public List<AnnouncementDetailDto>? AnnouncementDetails { get; set; }
    }
}
