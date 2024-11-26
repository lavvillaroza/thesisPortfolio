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
        [HttpGet("getsubjects/all")]
        public async Task<IActionResult> GetSubjectsAllAsync()
        {
            var subjects = await _subjectService.GetSubjectsAllAsync();
            return Ok(subjects);
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

            try
            {
                // Attempt to update the subject
                var addSubject = await _subjectService.AddSubjetAsync(subjectDto);

                // If no subject was updated, return a not found response
                if (addSubject == false)
                {
                    return NotFound($"Failed to add subject.");
                }

                return Ok($"The subject '{subjectDto.SubjectName}' has been successfully added.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An unexpected error occurred while adding the subject: {ex.Message}");
            }
            
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSubjetAsync(int id, [FromBody] SubjectDto subjectDto)
        {
            if (id != subjectDto.Id)
            {
                return BadRequest($"Update failed: The Subject ID ('{id}') does not correspond to any available subject in the database. Please check and try again.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                // Attempt to update the subject
                var updatedSubject = await _subjectService.UpdateSubjetAsync(subjectDto);

                // If no subject was updated, return a not found response
                if (updatedSubject == false)
                {
                    return NotFound($"Subject with ID '{id}' not found.");
                }
                
                return Ok($"The subject '{subjectDto.SubjectName}' has been successfully updated.");
            }
            catch (Exception ex)
            {                
                return StatusCode(500, $"An unexpected error occurred while updating the subject: {ex.Message}");
            }
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
