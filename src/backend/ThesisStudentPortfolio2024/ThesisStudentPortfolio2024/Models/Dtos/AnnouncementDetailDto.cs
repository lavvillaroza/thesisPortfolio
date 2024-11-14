using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models.Dtos
{
    public class AnnouncementDetailDto
    {        
        public int Id { get; set; }
        [Required]
        public string? AttachedImage { get; set; }
        [Required]
        public string? AttachedPath { get; set; }
    }
}
