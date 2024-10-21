using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
            var courses = await _courseService.GetAllCourses();
            return Ok(courses);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddCourseAsync([FromBody] Course course)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var createdAnnouncemnet = await _courseService.AddCourseAsync(course);

            return Ok("Success");
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateCourseAsync([FromBody] Course course)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var updatedAnnouncemnet = await _courseService.UpdateSubjetAsync(course);

            return Ok("Success");
        }
        [Authorize]
        [HttpPut("Delete")]
        public async Task<IActionResult> DeleteSubjetAsync([FromBody] Course course)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var updatedAnnouncemnet = await _courseService.DeleteSubjetAsync(course);

            return Ok("Success");
        }
    }
}
