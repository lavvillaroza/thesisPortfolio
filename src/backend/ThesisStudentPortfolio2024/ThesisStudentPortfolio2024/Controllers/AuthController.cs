using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using ThesisStudentPortfolio2024.Services;
using ThesisStudentPortfolio2024.Models;
using ThesisStudentPortfolio2024.Models.Entities;
using ThesisStudentPortfolio2024.Models.Dtos;
using Microsoft.CodeAnalysis.Elfie.Diagnostics;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;
using Microsoft.AspNetCore.Http.HttpResults;

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
        public async Task<IActionResult> Login([FromBody] UserDto request)
        {
            try
            {
                if (request.UserType == 0)
                {
                    var getUserDetail = await _userService.GetStudentUserByUsernameAsync(request.Username);
                    if (getUserDetail == null)
                        return Unauthorized(new { message = "Invalid credentials" });

                    var decryptPwd = _encryptionService.Decrypt(getUserDetail.Password);

                    // Validate user credentials (replace this with real user validation)
                    if (request.Username == getUserDetail.UserName && request.Password == decryptPwd)
                    {
                        var userDetails = new
                        {
                            userid = getUserDetail.UserId,
                            username = getUserDetail.UserName,
                            usertype = 0
                        };
                        var token = _jwtService.GenerateToken("1", request.Username);
                        return Ok(new { UserDetails = userDetails, Token = token });
                    }
                }
                else
                {
                    var getUserDetail = await _userService.GetAdminUserByUserNameAsync(request.Username);
                    if (getUserDetail == null)
                        return Unauthorized(new { message = "Invalid credentials" });

                    var decryptPwd = _encryptionService.Decrypt(getUserDetail.Password);

                    // Validate user credentials (replace this with real user validation)
                    if (request.Username == getUserDetail.UserName && request.Password == decryptPwd)
                    {
                        var userDetails = new
                        {
                            userid = getUserDetail.UserId,
                            username = getUserDetail.UserName,
                            usertype = 1
                        };
                        var token = _jwtService.GenerateToken(getUserDetail.UserId.ToString(), getUserDetail.UserName);
                        return Ok(new { UserDetails = userDetails, Token = token });
                    }
                }
                return Unauthorized("Invalid credentials");
            }
            catch (Exception ex)
            {
                return Unauthorized($"Error: {ex.Message}");
            }
            
        }

        [HttpPost("CreateAdminUser")]
        public async Task<IActionResult> CreateUser([FromBody] AdminUserDto adminUserDto)
        {            
            var createuser = await _userService.AddAdminUserAsync(adminUserDto);

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
