using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models.Dtos
{
    public class StudentInformationDto
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public string AboutMe { get; set; } = string.Empty;
        public string? CoverPhotoOne { get; set; }
        public string? CoverPhotoTwo { get; set; }
        public string? CoverPhotoThree { get; set; }
        public string? CoverPhotoFour { get; set; }
        public IFormFile? CoverPhotoOneFile { get; set; }
        public IFormFile? CoverPhotoTwoFile { get; set; }
        public IFormFile? CoverPhotoThreeFile { get; set; }
        public IFormFile? CoverPhotoFourFile { get; set; }

    }
}
