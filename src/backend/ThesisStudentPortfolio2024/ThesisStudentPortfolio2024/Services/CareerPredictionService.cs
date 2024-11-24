using Microsoft.ML;
using Microsoft.ML.Data;
using System;
using System.IO;
using System.Linq;
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
            _modelPath = Path.Combine(AppContext.BaseDirectory, "MachineLearningModel", "careerModel.zip");

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

        public Task<List<CareerPrediction>> PredictCareers(List<string> skillsList)
        {
            try
            {
                if (_model == null)
                {
                    throw new InvalidOperationException("The model is not loaded.");
                }
                skillsList.Add("Blender, Maya, 3D modeling, texturing, rendering");

                var predictionEngine = _mlContext.Model.CreatePredictionEngine<CareerData, CareerPrediction>(_model);

                var predictions = new List<CareerPrediction>();

                foreach (var skills in skillsList)
                {
                    var predictionResult = predictionEngine.Predict(new CareerData { Skills = skills });
                    predictions.Add(new CareerPrediction { PredictedCareer = predictionResult.PredictedCareer });
                }

                var seenCareers = new HashSet<string>();
                var distinctPredictions = predictions
                    .Where(c => seenCareers.Add(c.PredictedCareer))
                    .ToList();
                
                return Task.FromResult(distinctPredictions);
            }
            catch (Exception ex) {
                throw new Exception(ex.Message);
            }
            
        }
        private class CareerPredictionResult
        {
            [ColumnName("PredictedCareer")]
            public string PredictedCareer { get; set; }
        }
    }
}
