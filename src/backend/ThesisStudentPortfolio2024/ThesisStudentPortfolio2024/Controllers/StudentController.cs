using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ThesisStudentPortfolio2024.Models;
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
        [HttpGet("Detail/{id}")]
        public async Task<IActionResult> StudentDetail(int userId)
        {
            var studentDetail = await _studentService.GetStudentDetailByUserIdAsync(userId);
            return Ok(studentDetail);
        }
        [Authorize]
        [HttpPost("Detail/Add")]
        public async Task<IActionResult> AddStudentDetailAsync([FromBody] StudentDetail studentDetail)
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
        [HttpPut("Detail/Update")]
        public async Task<IActionResult> UpdateStudentDetailAsync([FromBody] StudentDetail studentDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _studentService.UpdateStudentDetailAsync(studentDetail);
            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }

        [HttpGet("Seminar/{id}")]
        public async Task<IActionResult> GetStudentSeminarByUserIdAsync(PaginationParams paginationParams, int userId)
        {
            var studentSeminar = await _studentService.GetStudentSeminarByUserIdAsync(paginationParams, userId);
            return Ok(studentSeminar);
        }
        [Authorize]
        [HttpPost("Seminar/Add")]
        public async Task<IActionResult> AddStudentSeminarAsync([FromBody] StudentSeminar studentSeminar)
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
        [HttpPut("Seminar/Update")]
        public async Task<IActionResult> UpdateStudentSeminarAsync([FromBody] StudentSeminar studentSeminar)
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
        [HttpPost("Skill/Add")]
        public async Task<IActionResult> AddStudentSkillAsync([FromBody] StudentSkill studentSkill)
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
        [HttpPut("Skill/Delete")]
        public async Task<IActionResult> DeleteStudentSkillAsync([FromBody] StudentSkill studentSkill)
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

        [HttpGet("SubjectTaken/{id}/{year}")]
        public async Task<IActionResult> GetAllStudentSubjetTakenByUser(int userId, int year)
        {
            var studentSkills = await _studentService.GetStudentSkillsByUserIdAsync(userId);
            return Ok(studentSkills);
        }
        [Authorize]
        [HttpPost("SubjectTaken/Add")]
        public async Task<IActionResult> AddStudentSubjetTakenAsync([FromBody] StudentSubjectTaken studentSubjectTaken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _studentService.AddStudentSubjetTakenAsync(studentSubjectTaken);
            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }
        [Authorize]
        [HttpPut("SubjectTaken/Delete")]
        public async Task<IActionResult> DeleteStudentSubjetTakenAsync([FromBody] StudentSubjectTaken studentSubjectTaken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _studentService.DeleteStudentSubjetTakenAsync(studentSubjectTaken);
            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }

        [HttpGet("Information/{id}")]
        public async Task<IActionResult> GetStudentInformationByUserIdAsync(int userId)
        {
            var studentSkills = await _studentService.GetStudentInformationByUserIdAsync(userId);
            return Ok(studentSkills);
        }
        [Authorize]
        [HttpPost("Information/Add")]
        public async Task<IActionResult> AddStudentInformationAsync([FromBody] StudentInformation studentInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _studentService.AddStudentInformationAsync(studentInfo);
            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }
        [Authorize]
        [HttpPost("InformationDetail/Add")]
        public async Task<IActionResult> AddStudentInformationDetailAsync([FromBody] StudentInformationDetail studentInfoDtl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _studentService.AddStudentInformationDetailAsync(studentInfoDtl);
            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }
        [Authorize]
        [HttpPut("Information/Update")]
        public async Task<IActionResult> UpdateStudentInformationAsync([FromBody] StudentInformation studentInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _studentService.UpdateStudentInformationAsync(studentInfo);
            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }
        [Authorize]
        [HttpPut("InformationDetail/Update")]
        public async Task<IActionResult> UpdateStudentInformationDetailAsync([FromBody] StudentInformationDetail studentInfoDtl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _studentService.UpdateStudentInformationDetailAsync(studentInfoDtl);
            if (result)
                return Ok("Success");
            else
                return BadRequest("Failed");
        }
    }
}
