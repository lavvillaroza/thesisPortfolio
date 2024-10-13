namespace ThesisStudentPortfolio2024.Models
{
    public class AnnouncementRequest
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateTimeFrom { get; set; }
        public DateTime DateTimeTo { get; set; }
        public int AnnouncementType { get; set; }
        public string CreatedBy { get; set; } // New field for passing username
        public List<IFormFile>? Images { get; set; } // Use IFormFile for image upload
    }
}
