using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ThesisStudentPortfolio2024.Models.Entities;
using ThesisStudentPortfolio2024.Services;

namespace ThesisStudentPortfolio2024.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectController : ControllerBase
    {
        private readonly SubjectService _subjectService;
        public SubjectController(SubjectService subjectService)
        {
            _subjectService = subjectService;
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllSubjectsAsync()
        {
            var subjects = await _subjectService.GetAllSubjects();
            return Ok(subjects);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddSubjetAsync([FromBody] Subject subject)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var createdAnnouncemnet = await _subjectService.AddSubjetAsync(subject);

            return Ok("Success");
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateSubjetAsync([FromBody] Subject subject)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var updatedAnnouncemnet = await _subjectService.UpdateSubjetAsync(subject);

            return Ok("Success");
        }
        [Authorize]
        [HttpPut("Delete")]
        public async Task<IActionResult> DeleteSubjetAsync([FromBody] Subject subject)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var updatedAnnouncemnet = await _subjectService.DeleteSubjetAsync(subject);

            return Ok("Success");
        }
    }
}
