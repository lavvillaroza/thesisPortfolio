using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ThesisStudentPortfolio2024.Models.Dtos;
using ThesisStudentPortfolio2024.Services;

namespace ThesisStudentPortfolio2024.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PortfolioController : ControllerBase
    {
        private readonly StudentService _studentService;
        private readonly CareerPredictionService _careerPredictionService;
        private readonly CourseService _courseService;
        public PortfolioController(StudentService studentService, CareerPredictionService careerPredictionService, CourseService courseService)
        {
            _studentService = studentService;
            _careerPredictionService = careerPredictionService;
            _courseService = courseService;
        }

        [HttpGet("detail/{userId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetStudentDetail(int userId)
        {
            var studentDetail = await _studentService.GetStudentDetailByUserIdAsync(userId);
            return Ok(studentDetail);
        }

        [HttpGet("seminars/{userId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetStudentSeminarByUserIdAsync(int userId)
        {
            var studentSeminar = await _studentService.GetStudentSeminarByUserIdAsync(userId);
            return Ok(studentSeminar);
        }

        [HttpGet("courseprogress/{userId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetStudentCourseProgressByUserIdAsync(int userId)
        {
            var studentDetail = await _studentService.GetStudentDetailByUserIdAsync(userId);
            var courses = await _courseService.GetCoursesAsync();
            var studentCourse = courses.Where(x => x.Id == studentDetail.CourseId).First();
            var studentSubjectsTaken = await _studentService.GetStudentSubjectsTakenByUserId(userId);
            CourseWithSubjectsDto courseWithSubjectsDto = new CourseWithSubjectsDto();

            courseWithSubjectsDto.Id = studentCourse.Id;
            courseWithSubjectsDto.CourseName = studentCourse.CourseName;
            courseWithSubjectsDto.CourseCode = studentCourse.CourseCode;
            courseWithSubjectsDto.TotalUnitsRequired = studentCourse.TotalUnitsRequired;
            courseWithSubjectsDto.SubjectsTaken = studentSubjectsTaken.ToList();

            return Ok(courseWithSubjectsDto);
        }

        [HttpGet("futurecareers/{userId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetStudentFutureCareerAiAsync(int userId)
        {
            var studentSkills = await _studentService.GetStudentSkillsByUserIdAsync(userId);
            var studentSkillsList = studentSkills.Select(x => x.SkillName).ToList();
            var studentFutureCareers = await _careerPredictionService.PredictCareers(studentSkillsList);

            return Ok(studentFutureCareers);
        }

        [HttpGet("skills/{userId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetStudentSkillsByUserIdAsync(int userId)
        {
            var studentSkills = await _studentService.GetStudentSkillsByUserIdAsync(userId);
            return Ok(studentSkills);
        }

        [HttpGet("subjectstaken/{userId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetStudentSubjetsTakenByUser([FromQuery] PaginationParamsDto paginationParams, int userId)
        {
            var studentSubjectTakens = await _studentService.GetStudentSubjetsTakenByUser(paginationParams, userId);
            return Ok(studentSubjectTakens);
        }

        [HttpGet("information/{userId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetStudentInformationByUserIdAsync(int userId)
        {
            var studentSkills = await _studentService.GetStudentInformationByUserIdAsync(userId);
            return Ok(studentSkills);
        }

        [HttpGet("certificates/{userId}")]
        public async Task<IActionResult> GetStudentCertAndRecogByUserIdAsync(int userId)
        {
            var studentSkills = await _studentService.GetCertificatesAsync(userId);
            return Ok(studentSkills);
        }

        [HttpGet("recognitions/{userId}")]
        public async Task<IActionResult> GetStudentRecognitionsByUserIdAsync(int userId)
        {
            var studentSkills = await _studentService.GetRecognitionsAsync(userId);
            return Ok(studentSkills);
        }
    }
}
