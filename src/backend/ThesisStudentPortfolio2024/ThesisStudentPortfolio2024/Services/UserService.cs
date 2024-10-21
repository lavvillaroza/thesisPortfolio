using ThesisStudentPortfolio2024.Models;
using ThesisStudentPortfolio2024.Models.Entities;
using ThesisStudentPortfolio2024.Repositories;

namespace ThesisStudentPortfolio2024.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> AddAdminUserAsync(AdminUser user)
        {
            return await _userRepository.AddAdminUserAsync(user);
        }

        public async Task<bool> AddStudentUserAsync(StudentUser user)
        {
            return await _userRepository.AddStudentUserAsync(user);
        }

        public async Task<AdminUser?> GetAdminUserByIdAsync(int id)
        {
            return await _userRepository.GetAdminUserByIdAsync(id);
        }

        public async Task<List<AdminUser>> GetAllAdminUserAsync()
        {
            return await _userRepository.GetAllAdminUserAsync();
        }

        public async Task<List<StudentUser>> GetAllStudentUserAsync()
        {
            return await _userRepository.GetAllStudentUserAsync();
        }

        public async Task<PagedResult<StudentUser>> GetAllStudentUserByPagedAsync(PaginationParams paginationParams)
        {
            return await _userRepository.GetAllStudentUserByPagedAsync(paginationParams);
        }

        public async Task<StudentUser?> GetStudentUserByIdAsync(int id)
        {
            return await _userRepository.GetStudentUserByIdAsync(id);
        }

        public async Task<AdminUser?> GetAdminUserByUserNameAsync(string username)
        {
            return await _userRepository.GetAdminUserByUserNameAsync(username);
        }

        public async Task<StudentUser?> GetStudentUserByUsernameAsync(string username)
        {
            return await _userRepository.GetStudentUserByUsernameAsync(username);
        }

        public async Task<bool> UpdateAdminUserAsync(AdminUser user)
        {
            return await _userRepository.UpdateAdminUserAsync(user);
        }

        public async Task<bool> UpdateStudentUserAsync(StudentDetail user)
        {
            return await _userRepository.UpdateStudentUserAsync(user); 
        }
    }
}
