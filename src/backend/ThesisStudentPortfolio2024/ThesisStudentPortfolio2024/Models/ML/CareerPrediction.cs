using Microsoft.ML.Data;

namespace ThesisStudentPortfolio2024.Models.ML
{
    public class CareerPrediction
    {
        [ColumnName("PredictedLabel")]
        public string PredictedCareer { get; set; }
    }
}
