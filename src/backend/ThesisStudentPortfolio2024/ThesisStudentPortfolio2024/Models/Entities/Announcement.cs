using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class Announcement
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public DateTime DateAnnounced { get; set; }        
        [Required]
        public int AnnouncementType { get; set; } //0 = Announcement, 1 = Seminar
        [Required]
        public string CreatedBy { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        [Required]
        public string LastModifiedBy { get; set; } = string.Empty;
        public DateTime LastModifiedDate { get; set; } = DateTime.Now;
        public int Delete { get; set; } = 0;
    }
}
