using System.Text.Json.Serialization;
namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class SubjectDetail
    {
        public int Id { get; set; }
        public int SubjectId { get; set; }
        public int CourseId { get; set; }
        [JsonIgnore]
        public Subject Subject { get; set; }  // Navigation property        
        public Course Course { get; set; }
    }
}
