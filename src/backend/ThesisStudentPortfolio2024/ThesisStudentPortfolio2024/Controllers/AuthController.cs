using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using ThesisStudentPortfolio2024.Services;
using ThesisStudentPortfolio2024.Models;
using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly JWTService _jwtService;
        private readonly EncryptionService _encryptionService;
        private readonly UserService _userService;
        
        public AuthController(JWTService jwtService, EncryptionService encryptionService, UserService userService)
        {
            _jwtService = jwtService;
            _encryptionService = encryptionService;
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Models.LoginRequest request)
        {
            if (request.UserType == 0) {
                var getUserDetail = await _userService.GetStudentUserByUsernameAsync(request.Username);
                if (getUserDetail == null)
                    return Unauthorized(new { message = "Invalid credentials" });

                var decryptPwd = _encryptionService.Decrypt(getUserDetail.Password);

                // Validate user credentials (replace this with real user validation)
                if (request.Username == getUserDetail.UserName && request.Password == decryptPwd)
                {
                        var token = _jwtService.GenerateToken("1", request.Username);
                        return Ok(new { Token = token });
                }
            }
            else {
                var getUserDetail = await _userService.GetAdminUserByUserNameAsync(request.Username);
                if (getUserDetail == null)
                    return Unauthorized(new { message = "Invalid credentials" });

                var decryptPwd = _encryptionService.Decrypt(getUserDetail.Password);

                // Validate user credentials (replace this with real user validation)
                if (request.Username == getUserDetail.UserName && request.Password == decryptPwd)
                {
                    var token = _jwtService.GenerateToken("1", request.Username);
                    return Ok(new { Token = token });
                }
            }            
            return Unauthorized("Invalid credentials");
        }

        [HttpPost("CreateAdminUser")]
        public async Task<IActionResult> CreateUser([FromBody] AdminUser adminUser)
        {
            adminUser.Password = _encryptionService.Encrypt(adminUser.Password);
            var createuser = await _userService.AddAdminUserAsync(adminUser);

            if (createuser)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
