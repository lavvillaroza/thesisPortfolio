using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class StudentCertAndRecog
    {
        [Key]
        public int Id { get; set; }        
        public int UserId { get; set; }        
        public string Title { get; set; }
        public string Description { get; set; }        
        public short CertRecogType {  get; set; }
        public DateTime LastModifiedDate { get; set; }

    }
}
