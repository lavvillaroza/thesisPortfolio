using System.ComponentModel.DataAnnotations;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class StudentInformationDetail
    {
        [Key]
        public int Id { get; set; }        
        public string CoverPhoto { get; set; }
        public int StudentInformationId { get; set; }
        public StudentInformation StudentInformation { get; set; }
    }
}
