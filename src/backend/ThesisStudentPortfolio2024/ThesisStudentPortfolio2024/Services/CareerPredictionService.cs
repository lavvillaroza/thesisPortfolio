using Microsoft.ML;
using Microsoft.ML.Data;
using System;
using System.IO;
using ThesisStudentPortfolio2024.Models.ML;

namespace ThesisStudentPortfolio2024.Services
{
    public class CareerPredictionService
    {
        private readonly MLContext _mlContext;
        private ITransformer _model;
        private readonly string _modelPath;

        public CareerPredictionService()
        {
            _mlContext = new MLContext();
            _modelPath = Path.Combine(AppContext.BaseDirectory, "job_career_model.zip");

            // Load the model when the service is created
            LoadModel();
        }
        private void LoadModel()
        {
            if (File.Exists(_modelPath))
            {
                _model = _mlContext.Model.Load(_modelPath, out _);
            }
            else
            {
                throw new FileNotFoundException("Model file not found at " + _modelPath);
            }
        }

        public List<JobCareerPrediction> PredictCareers(List<string> skillsList)
        {
            if (_model == null)
            {
                throw new InvalidOperationException("The model is not loaded.");
            }

            var predictionEngine = _mlContext.Model.CreatePredictionEngine<JobCareerData, CareerPredictionResult>(_model);
            var predictions = new List<JobCareerPrediction>();

            foreach (var skills in skillsList)
            {
                var predictionResult = predictionEngine.Predict(new JobCareerData { Skills = skills });
                predictions.Add(new JobCareerPrediction { Skills = skills, PredictedJobCareer = predictionResult.PredictedCareer });
            }

            return predictions;
        }
        private class CareerPredictionResult
        {
            [ColumnName("PredictedCareer")]
            public string PredictedCareer { get; set; }
        }
    }
}
