using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;


namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class StudentInformationDetail
    {
        [Key]
        public int Id { get; set; }        
        public string? CoverPhoto { get; set; }
        public int StudentInformationId { get; set; }

        [JsonIgnore]        
        public StudentInformation? StudentInformation { get; set; }
    }
}
