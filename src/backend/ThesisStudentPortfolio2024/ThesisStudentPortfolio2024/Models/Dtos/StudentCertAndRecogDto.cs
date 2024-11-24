using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models.Dtos
{
    public class StudentCertAndRecogDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;        
        public string Attachment { get; set; } = string.Empty;
        public IFormFile? AttachmentFile { get; set; }
        [Required]
        public int CertRecogType { get; set; } // 1 = Certificate; 2 = Recoginition
    }
}
