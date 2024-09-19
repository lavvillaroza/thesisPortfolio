using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Services
{
    public interface IUserService
    {
        //Admin Repository
        Task<AdminUser?> GetAdminUserByIdAsync(int id);
        Task<AdminUser?> GetUserByAdminUsernameAsync(string username);
        Task<bool> AddAdminUserAsync(AdminUser user);
        Task<bool> UpdateAdminUserAsync(AdminUser user);
        Task<List<AdminUser>> GetAllAdminUserAsync();

        //Student Repository
        Task<StudentUser?> GetStudentUserByIdAsync(int id);
        Task<StudentUser?> GetUserByStudentUsernameAsync(string username);
        Task<bool> AddStudentUserAsync(StudentUser user);
        Task<bool> UpdateStudentUserAsync(StudentDetail user);
        Task<List<StudentUser>> GetAllStudentUserAsync();
    }
}
