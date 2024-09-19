using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ThesisStudentPortfolio2024.Models.Entities;
using ThesisStudentPortfolio2024.Services;

namespace ThesisStudentPortfolio2024.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly JwtService _jwtService;
        private readonly EncryptionService _encryptionService;
        private IUserService _userService;

        public UserController(JwtService jwtService, EncryptionService encryptionService, IUserService userService)
        {
            _jwtService = jwtService;
            _encryptionService = encryptionService;
            _userService = userService;
        }

        [Authorize]
        [HttpPost("CreateAdminUser")]
        public async Task<IActionResult> CreateAdminUser([FromBody] AdminUser adminUser)
        {
            var createuser = await _userService.AddAdminUserAsync(adminUser);

            if (createuser)
            {
                return Ok();
            }
            else {
                return BadRequest();
            }            
        }

        [Authorize]
        [HttpPost("CreateStudentUser")]
        public async Task<IActionResult> CreateStudentUser([FromBody] StudentUser studentUser)
        {
            var createuser = await _userService.AddStudentUserAsync(studentUser);

            if (createuser)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [Authorize]
        [HttpGet("GetAdminUsers")]
        public async Task<IActionResult> GetAdminUsers()
        {
            var studentUsers = await _userService.GetAllAdminUserAsync();
            return Ok(studentUsers);
        }


        [Authorize]
        [HttpGet("GetStudentUsers")]
        public async Task<IActionResult> GetStudentUsers() { 
            var studentUsers = await _userService.GetAllStudentUserAsync();
            return Ok(studentUsers);
        }
    }
}
