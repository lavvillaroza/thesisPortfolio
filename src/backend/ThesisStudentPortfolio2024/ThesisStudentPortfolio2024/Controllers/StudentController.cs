using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ThesisStudentPortfolio2024.Models.Dtos;
using ThesisStudentPortfolio2024.Models.Entities;
using ThesisStudentPortfolio2024.Services;

namespace ThesisStudentPortfolio2024.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly StudentService _studentService;
        private readonly CareerPredictionService _careerPredictionService;
        private readonly CourseService _courseService;
        public StudentController(StudentService studentService, CareerPredictionService careerPredictionService, CourseService courseService)
        {
            _studentService = studentService;
            _careerPredictionService = careerPredictionService;
            _courseService = courseService;
        }
        
        [HttpGet("detail")]
        public async Task<IActionResult> GetStudentDetail([FromQuery] int userId)
        {
            var studentDetail = await _studentService.GetStudentDetailByUserIdAsync(userId);
            return Ok(studentDetail);
        }


        [Authorize]
        [HttpPost("detail/add")]
        public async Task<IActionResult> AddStudentDetailAsync([FromForm] StudentDetail studentDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _studentService.AddStudentDetailAsync(studentDetail);
            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }

        [Authorize]
        [HttpPut("detail/{userId}")]
        public async Task<IActionResult> UpdateStudentDetailAsync(int userId, [FromForm] StudentDetailDto studentDetailDto)
        {
            try
            {
                
                var result = await _studentService.UpdateStudentDetailAsync(studentDetailDto);
                if (result)
                    return Ok("Success");
                else
                    return BadRequest("Failed");
            }
            catch (Exception err) {
                return BadRequest(err);
            }
        }

        [HttpGet("seminars")]
        public async Task<IActionResult> GetStudentSeminarByUserIdAsync([FromQuery] int userId)
        {
            var studentSeminar = await _studentService.GetStudentSeminarByUserIdAsync(userId);
            return Ok(studentSeminar);
        }

        [HttpGet("courseprogress")]
        public async Task<IActionResult> GetStudentCourseProgressByUserIdAsync([FromQuery] int userId)
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

        [Authorize]
        [HttpPost("seminar/add")]
        public async Task<IActionResult> AddStudentSeminarAsync([FromForm] StudentSeminarDto studentSeminarDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _studentService.AddStudentSeminarAsync(studentSeminarDto);
            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }

        [Authorize]
        [HttpPost("seminar/update")]
        public async Task<IActionResult> UpdateStudentSeminarAsync([FromForm] StudentSeminarDto studentSeminarDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _studentService.UpdateStudentSeminarAsync(studentSeminarDto);
            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }
        [HttpGet("futurecareers")]
        public async Task<IActionResult> GetStudentFutureCareerAiAsync(int userId)
        {            
            var studentSkills = await _studentService.GetStudentSkillsByUserIdAsync(userId);
            var studentSkillsList = studentSkills.Select(x => x.SkillName).ToList();
            var studentFutureCareers = await _careerPredictionService.PredictCareers(studentSkillsList);            

            return Ok(studentFutureCareers);
        }

        [HttpGet("skills")]
        public async Task<IActionResult> GetStudentSkillsByUserIdAsync(int userId)
        {
            var studentSkills = await _studentService.GetStudentSkillsByUserIdAsync(userId);
            return Ok(studentSkills);
        }
        
        [Authorize]
        [HttpPost("skill/add")]
        public async Task<IActionResult> AddStudentSkillAsync([FromForm] StudentSkillDto studentSkillDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _studentService.AddStudentSkillAsync(studentSkillDto);
            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }

        [Authorize]
        [HttpPut("skill/delete/{id}")]
        public async Task<IActionResult> DeleteStudentSkillAsync([FromRoute] int id)
        {            
            var result = await _studentService.DeleteStudentSkillAsync(id);

            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }

        [HttpGet("subjectstaken")]
        public async Task<IActionResult> GetStudentSubjetsTakenByUser([FromQuery] PaginationParamsDto paginationParams, [FromQuery] int userId)
        {
            var studentSubjectTakens = await _studentService.GetStudentSubjetsTakenByUser(paginationParams, userId);
            return Ok(studentSubjectTakens);
        }

        [Authorize]
        [HttpPost("subjecttaken/add")]
        public async Task<IActionResult> AddStudentSubjetTakenAsync([FromForm] StudentSubjectTakenDto studentSubjectTakenDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _studentService.AddStudentSubjetTakenAsync(studentSubjectTakenDto);
            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }

        [Authorize]
        [HttpPost("subjecttaken/update")]
        public async Task<IActionResult> UpdateStudentSubjetTakenAsync([FromForm] StudentSubjectTakenDto studentSubjectTakenDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _studentService.UpdateStudentSubjetTakenAsync(studentSubjectTakenDto);
            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }

        [Authorize]
        [HttpPut("subjecttaken/delete/{id}")]
        public async Task<IActionResult> DeleteStudentSubjetTakenAsync([FromRoute] int id)
        {            
            var result = await _studentService.DeleteStudentSubjetTakenAsync(id);
            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }

        [HttpGet("information")]
        public async Task<IActionResult> GetStudentInformationByUserIdAsync([FromQuery] int userId)
        {
            var studentSkills = await _studentService.GetStudentInformationByUserIdAsync(userId);
            return Ok(studentSkills);
        }


        [Authorize]
        [HttpPost("information/addorupdate")]
        public async Task<IActionResult> AddOrUpdateStudentInformationAsync([FromForm] StudentInformationDto studentInfoDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _studentService.AddOrUpdateStudentInformationAsync(studentInfoDto);
            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }

        [HttpGet("certificates")]
        public async Task<IActionResult> GetStudentCertAndRecogByUserIdAsync([FromQuery] int userId)
        {
            var studentSkills = await _studentService.GetCertificatesAsync(userId);
            return Ok(studentSkills);
        }

        [Authorize]
        [HttpPost("certificate/add")]
        public async Task<IActionResult> AddStudentCertificateAsync([FromForm] StudentCertAndRecogDto studentCertAndRecogDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _studentService.AddCertificateAsync(studentCertAndRecogDto);
            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }

        [Authorize]
        [HttpPut("certificate/delete/{id}")]
        public async Task<IActionResult> DeleteStudentCertificateAsync([FromRoute] int id)
        {            
            var result = await _studentService.DeleteCertificateAsync(id);
            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }

        [HttpGet("recognitions")]
        public async Task<IActionResult> GetStudentRecognitionsByUserIdAsync([FromQuery] int userId)
        {
            var studentSkills = await _studentService.GetRecognitionsAsync(userId);
            return Ok(studentSkills);
        }

        [Authorize]
        [HttpPost("recognition/add")]
        public async Task<IActionResult> AddStudentRecognitionAsync([FromForm] StudentCertAndRecogDto studentCertAndRecogDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _studentService.AddRecognitionAsync(studentCertAndRecogDto);
            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }

        [Authorize]
        [HttpPut("recognition/delete/{id}")]
        public async Task<IActionResult> DeleteStudentRecognitionAsync([FromRoute] int id)
        {            
            var result = await _studentService.DeleteCertificateAsync(id);
            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }

    }
}
