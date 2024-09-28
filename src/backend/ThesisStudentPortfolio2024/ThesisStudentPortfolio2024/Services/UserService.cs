using ThesisStudentPortfolio2024.Models.Entities;
using ThesisStudentPortfolio2024.Repositories.User;

namespace ThesisStudentPortfolio2024.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        async Task<bool> IUserService.AddAdminUserAsync(AdminUser user)
        {
            return await _userRepository.AddAdminUserAsync(user);
        }

        async Task<bool> IUserService.AddStudentUserAsync(StudentUser user)
        {
            return await _userRepository.AddStudentUserAsync(user);
        }

        async Task<AdminUser?> IUserService.GetAdminUserByIdAsync(int id)
        {
            return await _userRepository.GetAdminUserByIdAsync(id);
        }

        async Task<List<AdminUser>> IUserService.GetAllAdminUserAsync()
        {
            return await _userRepository.GetAllAdminUserAsync();
        }

        async Task<List<StudentUser>> IUserService.GetAllStudentUserAsync()
        {
            return await _userRepository.GetAllStudentUserAsync();
        }

        async Task<StudentUser?> IUserService.GetStudentUserByIdAsync(int id)
        {
            return await _userRepository.GetStudentUserByIdAsync(id);
        }

        async Task<AdminUser?> IUserService.GetUserByAdminUsernameAsync(string username)
        {
            return await _userRepository.GetUserByAdminUsernameAsync(username);
        }

        async Task<StudentUser?> IUserService.GetUserByStudentUsernameAsync(string username)
        {
            return await _userRepository.GetUserByStudentUsernameAsync(username);
        }

        async Task<bool> IUserService.UpdateAdminUserAsync(AdminUser user)
        {
            return await _userRepository.UpdateAdminUserAsync(user);
        }

        async Task<bool> IUserService.UpdateStudentUserAsync(StudentDetail user)
        {
            return await _userRepository.UpdateStudentUserAsync(user); 
        }
    }
}
