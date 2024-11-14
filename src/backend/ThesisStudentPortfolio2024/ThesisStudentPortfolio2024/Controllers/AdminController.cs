using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ThesisStudentPortfolio2024.Models.Dtos;
using ThesisStudentPortfolio2024.Models.Entities;
using ThesisStudentPortfolio2024.Services;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace ThesisStudentPortfolio2024.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly StudentService _studentService;
        private readonly AnnouncementService _announcementService;
        private readonly UserService _userService;
        private readonly EncryptionService _encryptionService;

        // Constructor injection for the services
        public AdminController(StudentService studentService, AnnouncementService announcementService, UserService userService, EncryptionService encryptionService)
        {
            _studentService = studentService;
            _announcementService = announcementService;
            _userService = userService;
            _encryptionService = encryptionService;
        }

        [Authorize]
        [HttpGet("getadmin")]
        public async Task<IActionResult> GetAdminUserByIdAsync([FromQuery] int userId)
        {
            var studentUsers = await _userService.GetAdminUserByIdAsync(userId);
            return Ok(studentUsers);
        }

        [Authorize]
        [HttpPost("addadmin")]
        public async Task<IActionResult> AddAdminAsync([FromForm] AdminUserDto adminUser)
        {
            var createuser = await _userService.AddAdminUserAsync(adminUser);

            if (createuser)
            {
                return Ok("Success");
            }
            else
            {
                return BadRequest("Failed");
            }
        }

        [Authorize]
        [HttpPost("updateadmin")]
        public async Task<IActionResult> UpdateAdminAsync([FromForm] AdminUserProfileDto adminUserProfile)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var updateuser = await _userService.UpdateAdminUserAsync(adminUserProfile);

                if (updateuser)
                {
                    return Ok("Success");
                }
                else
                {
                    return BadRequest("Failed");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }            
        }

        [Authorize]
        [HttpPost("addstudent")]
        public async Task<IActionResult> AddStudentAsync([FromForm] StudentDetailDto newStudent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var createuser = await _userService.AddStudentUserAsync(newStudent);
                if (createuser)
                {
                    return Ok("Success");
                }
                else
                {
                    return BadRequest("Failed");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Authorize]
        [HttpGet("getadmins")]
        public async Task<IActionResult> GetAdminUsersAsync([FromQuery] PaginationParamsDto paginationParamsDto)
        {
            var studentUsers = await _userService.GetAdminUsersAsync(paginationParamsDto);
            return Ok(studentUsers);
        }


        [Authorize]
        [HttpGet("getstudents")]
        public async Task<IActionResult> GetStudentUsersAsync([FromQuery] PaginationParamsDto paginationParamsDto)
        {
            var studentUsers = await _userService.GetStudentsAsync(paginationParamsDto);
            return Ok(studentUsers);
        }

        [Authorize]
        [HttpGet("searchstudents")]
        public async Task<IActionResult> SearchInStudents([FromQuery] PaginationParamsDto paginationParamsDto, [FromQuery] string searchValue)
        {
            if (string.IsNullOrWhiteSpace(searchValue))
            {
                var students = await _userService.GetStudentsAsync(paginationParamsDto);
                return Ok(students);
            } 
            var searchStudents = await _userService.GetStudentsAsync(paginationParamsDto, searchValue);
            return Ok(searchStudents);
        }

    }
}
