using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using ThesisStudentPortfolio2024.Models.ML;
using ThesisStudentPortfolio2024.Services;

namespace ThesisStudentPortfolio2024.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CareerPredictionController : ControllerBase
    {
        private readonly CareerPredictionService _predictionService;

        public CareerPredictionController(CareerPredictionService predictionService)
        {
            _predictionService = predictionService;
        }

        [HttpPost("predict")]
        public ActionResult<List<JobCareerPrediction>> Predict([FromBody] List<string> skillsList)
        {
            var predictions = _predictionService.PredictCareers(skillsList);
            return Ok(predictions);
        }

    }
}
