using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models
{
    public class AnnouncementDTO
    {
        [Required]
        public required string Title { get; set; }
        [Required]
        public required string Description { get; set; }
        [Required]
        public DateTime DateTimeFrom { get; set; }
        [Required]
        public DateTime DateTimeTo { get; set; }
        [Required]
        public int AnnouncementType { get; set; }
        public required string CreatedBy { get; set; } // New field for passing username
        public List<IFormFile>? Images { get; set; } // Use IFormFile for image upload
    }
}
