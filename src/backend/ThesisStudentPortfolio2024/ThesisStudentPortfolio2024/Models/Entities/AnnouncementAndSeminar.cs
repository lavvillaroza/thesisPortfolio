using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class AnnouncementAndSeminar
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public DateTime DateTimeFrom {  get; set; }
        [Required]
        public DateTime DateTimeTo { get; set; }
        [Required]
        public short Type { get; set; }
        public string CreatedBy { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public string LastModifiedBy { get; set; }
        [Required]
        public DateTime LastModifiedDate { get; set; }

    }
}
