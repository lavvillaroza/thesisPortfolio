using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ThesisStudentPortfolio2024.Models.Dtos;
using ThesisStudentPortfolio2024.Services;

namespace ThesisStudentPortfolio2024.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChangePasswordController : ControllerBase
    {
        private readonly EncryptionService _encryptionService;
        private readonly UserService _userService;
        public ChangePasswordController(EncryptionService encryptionService, UserService userService) { 
            _encryptionService = encryptionService;
            _userService = userService;
        }

        [Authorize]
        [HttpPut("change-admin-user-password/{userid}")]
        public async Task<IActionResult> ChangeAdminUserPasswordAsync(int userid, [FromBody] ChangePasswordDto changePasswordDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var getAdminuser = await _userService.GetAdminUserByIdAsync(userid);
                if (getAdminuser == null)                
                    return NotFound(new { message = "User not found." });

                var decryptCurrPwd = _encryptionService.Decrypt(await _userService.GetCurrentPasswordByAdminUserIdAsync(userid));
                if (!changePasswordDto.CurrentPassword.Equals(decryptCurrPwd)) 
                    return BadRequest(new { message = "Invalid current password." });

                var encryptNewPassword = _encryptionService.Encrypt(changePasswordDto.NewPassword);
                changePasswordDto.NewPassword = encryptNewPassword;
                var ret = await _userService.UpdateAdminUserPasswordAsync(changePasswordDto);
                if (ret)
                    return Ok(new { message = "Password updated successfully." });                
                else 
                    return BadRequest(new { message = "Something wrong during updating password. Please try again!" });

            }
            catch (Exception ex)
            {
                return BadRequest(new { message =  ex.Message });
            }

        }

        [Authorize]
        [HttpPut("change-student-user-password/{userid}")]
        public async Task<IActionResult> ChangeStudentUserPasswordAsync(int userid, [FromBody] ChangePasswordDto changePasswordDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var getStudentuser = await _userService.GetStudentUserByIdAsync(userid);
                if (getStudentuser == null)
                    return NotFound(new { message = "User not found." });

                var decryptCurrPwd = _encryptionService.Decrypt(await _userService.GetCurrentPasswordByStudentUserIdAsync(userid));
                if (changePasswordDto.CurrentPassword.Equals(decryptCurrPwd))
                    return BadRequest(new { message = "Invalid current password." });

                var encryptNewPassword = _encryptionService.Encrypt(changePasswordDto.NewPassword);
                changePasswordDto.NewPassword = encryptNewPassword;
                var ret = await _userService.UpdateStudentUserPasswordAsync(changePasswordDto);
                if (ret)
                    return Ok(new { message = "Password updated successfully." });
                else
                    return BadRequest(new { message = "Something wrong during updating password. Please try again!" });

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }


    }
}
