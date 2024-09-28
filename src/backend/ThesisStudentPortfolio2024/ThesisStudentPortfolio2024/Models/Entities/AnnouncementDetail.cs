using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class AnnouncementDetail
    {
        [Key]
        public int Id { get; set; }        
        public string AttachedImage { get; set; }
        public string AttachedPath { get; set; }
        [ForeignKey("Announcement")]
        public int AnnouncementId { get; set; }
        public Announcement Announcement { get; set; }
    }
}
