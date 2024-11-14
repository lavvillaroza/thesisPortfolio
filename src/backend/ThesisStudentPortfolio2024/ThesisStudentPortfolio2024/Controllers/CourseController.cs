using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ThesisStudentPortfolio2024.Models.Dtos;
using ThesisStudentPortfolio2024.Models.Entities;
using ThesisStudentPortfolio2024.Services;

namespace ThesisStudentPortfolio2024.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly CourseService _courseService;        
        public CourseController(CourseService courseService)
        {
            _courseService = courseService;
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllCoursessAsync()
        {
            var courses = await _courseService.GetCoursesAsync();
            List<CourseDto> courseDtos = new List<CourseDto>();
            foreach (Course course in courses) {
                CourseDto courseDto = new CourseDto
                {
                    Id = course.Id,
                    CourseName = course.CourseName,
                    CourseCode = course.CourseCode,
                    CourseLogo = null,
                    CourseLogoUrl = course.CourseLogo,
                    CreatedBy = course.CreatedBy,
                    CreatedDate = course.CreatedDate,
                    LastModifiedBy = course.LastModifiedBy,
                    LastModifiedDate = course.LastModifiedDate
                };
                courseDtos.Add(courseDto);
            }            
            return Ok(courseDtos);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddCourseAsync([FromForm] CourseDto courseDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var createdAnnouncemnet = await _courseService.AddCourseAsync(courseDto);

            return Ok("Success");
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateCourseAsync([FromForm] CourseDto courseDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var updatedAnnouncemnet = await _courseService.UpdateSubjetAsync(courseDto);

            return Ok("Success");
        }
        [Authorize]
        [HttpPut("Delete/{courseId}")]
        public async Task<IActionResult> DeleteSubjetAsync([FromRoute] int courseId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _courseService.DeleteSubjetAsync(courseId);

            return result ? Ok("Success") : StatusCode(StatusCodes.Status500InternalServerError, $"Failed to delete subject: {courseId}");

        }
    }
}
