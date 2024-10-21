using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class Subject
    {
        [Key]
        public int Id { get; set; }        
        public string SubjectName { get; set; }        
        public string SubjectDescription { get; set; }        
        public string Prereq { get; set; }        
        public short Lec { get; set; }        
        public short Lab { get; set; }        
        public short Units { get; set; }        
        public short Hrs { get; set; }
        public short Year {  get; set; } // 1 = 1st year, 2 = 2nd year, 3 = 3rd year, 4 = 4th year
        public short Term { get; set; } // 1 = 1st term or sem, 2 = 2nd term or sem
        public string CreatedBy { get; set; }        
        public DateTime CreatedDate { get; set; }        
        public string LastModifiedBy { get; set; }        
        public DateTime LastModifiedDate { get; set; }
        [JsonIgnore]
        public ICollection<StudentSubjectTaken> StudentSubjectTakens { get; set; }
    }
}
