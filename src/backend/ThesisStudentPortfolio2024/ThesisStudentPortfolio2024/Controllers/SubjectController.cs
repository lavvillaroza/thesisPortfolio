using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ThesisStudentPortfolio2024.Models.Dtos;
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
        [HttpGet("getsubjects")]
        public async Task<IActionResult> GetSubjectsAsync([FromQuery] PaginationParamsDto paginationParamsDto)
        {
            var subjects = await _subjectService.GetSubjectsAsync(paginationParamsDto);
            return Ok(subjects);
        }

        [Authorize]
        [HttpGet("searchsubjects")]
        public async Task<IActionResult> SearchInStudents([FromQuery] PaginationParamsDto paginationParamsDto, [FromQuery] string searchValue)
        {
            if (string.IsNullOrWhiteSpace(searchValue))
            {
                var students = await _subjectService.GetSubjectsAsync(paginationParamsDto);
                return Ok(students);
            }
            var searchStudents = await _subjectService.GetSubjectsAsync(paginationParamsDto, searchValue);
            return Ok(searchStudents);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddSubjetAsync([FromForm] SubjectDto subjectDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var createdAnnouncemnet = await _subjectService.AddSubjetAsync(subjectDto);

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
