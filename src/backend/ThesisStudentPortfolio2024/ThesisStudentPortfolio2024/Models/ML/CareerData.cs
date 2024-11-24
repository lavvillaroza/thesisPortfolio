using Microsoft.ML.Data;

namespace ThesisStudentPortfolio2024.Models.ML
{
    public class CareerData
    {
        [LoadColumn(0)]
        public string Careers { get; set; }

        [LoadColumn(1)]
        public string Skills { get; set; }
    }
}
