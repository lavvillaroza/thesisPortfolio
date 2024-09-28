using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class SeminarAttendedDetail
    {
        [Required]
        public int SeminarId { get; set; }
        [Required]
        public int StudentId { get; set; }
        [Required]
        public short StudentStatus {  get; set; }
        [Required]
        public string LastModifiedBy { get; set; }
        [Required]
        public DateTime LastModifiedDate { get; set; }
    }
}
