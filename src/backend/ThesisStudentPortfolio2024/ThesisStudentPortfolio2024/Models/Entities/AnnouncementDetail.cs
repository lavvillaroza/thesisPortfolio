using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class AnnouncementDetail
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int AnnouncementId { get; set; }
        [Required]        
        public string AttachedImage { get; set; } = string.Empty;
        [Required]
        public string AttachedPath { get; set; } = string.Empty;
    }
}
