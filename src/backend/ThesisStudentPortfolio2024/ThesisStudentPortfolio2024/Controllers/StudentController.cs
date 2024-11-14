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
        public StudentController(StudentService studentService)
        {
            _studentService = studentService;
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
        [HttpPost("detail/update")]
        public async Task<IActionResult> UpdateStudentDetailAsync([FromForm] StudentDetailDto studentDetailDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _studentService.UpdateStudentDetailAsync(studentDetailDto);
            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }

        [HttpGet("Seminar/{id}")]
        public async Task<IActionResult> GetStudentSeminarByUserIdAsync(PaginationParamsDto paginationParams, int userId)
        {
            var studentSeminar = await _studentService.GetStudentSeminarByUserIdAsync(userId);
            return Ok(studentSeminar);
        }
        [Authorize]
        [HttpPost("Seminar/add")]
        public async Task<IActionResult> AddStudentSeminarAsync([FromForm] StudentSeminar studentSeminar)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _studentService.AddStudentSeminarAsync(studentSeminar);
            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }

        [Authorize]
        [HttpPut("Seminar/update")]
        public async Task<IActionResult> UpdateStudentSeminarAsync([FromForm] StudentSeminar studentSeminar)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _studentService.UpdateStudentSeminarAsync(studentSeminar);
            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }

        [HttpGet("Skill/{id}")]
        public async Task<IActionResult> GetStudentSkillsByUserIdAsync(int userId)
        {
            var studentSkills = await _studentService.GetStudentSkillsByUserIdAsync(userId);
            return Ok(studentSkills);
        }
        [HttpGet("Skill")]
        public async Task<IActionResult> GetAllSkillsAsync()
        {
            var skills = await _studentService.GetAllSkillsAsync();
            return Ok(skills);
        }
        [Authorize]
        [HttpPost("Skill/add")]
        public async Task<IActionResult> AddStudentSkillAsync([FromForm] StudentSkill studentSkill)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _studentService.AddStudentSkillAsync(studentSkill);
            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }

        [Authorize]
        [HttpPut("Skill/delete")]
        public async Task<IActionResult> DeleteStudentSkillAsync([FromForm] StudentSkill studentSkill)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _studentService.DeleteStudentSkillAsync(studentSkill);
            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }

        [HttpGet("subjectstaken")]
        public async Task<IActionResult> GetAllStudentSubjetTakenByUser([FromQuery] int userId)
        {
            var studentSkills = await _studentService.GetStudentSkillsByUserIdAsync(userId);
            return Ok(studentSkills);
        }
        [Authorize]
        [HttpPost("subjectstaken/add")]
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
        [HttpPut("subjectstaken/delete")]
        public async Task<IActionResult> DeleteStudentSubjetTakenAsync([FromForm] StudentSubjectTakenDto studentSubjectTakenDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _studentService.DeleteStudentSubjetTakenAsync(studentSubjectTakenDto);
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
    }
}
