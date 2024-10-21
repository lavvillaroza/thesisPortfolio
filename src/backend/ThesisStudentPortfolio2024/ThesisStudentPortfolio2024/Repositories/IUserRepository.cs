using ThesisStudentPortfolio2024.Models;
using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{
    public interface IUserRepository
    {
        //Admin Repository
        Task<AdminUser?> GetAdminUserByIdAsync(int id);
        Task<AdminUser?> GetAdminUserByUserNameAsync(string username);
        Task<bool> AddAdminUserAsync(AdminUser user);
        Task<bool> UpdateAdminUserAsync(AdminUser user);
        Task<List<AdminUser>> GetAllAdminUserAsync();
        Task<PagedResult<AdminUser>> GetAllAdminUserByPagedAsync(PaginationParams paginationParams);

        //Student Repository
        Task<StudentUser?> GetStudentUserByIdAsync(int id);
        Task<StudentUser?> GetStudentUserByUsernameAsync(string username);
        Task<bool> AddStudentUserAsync(StudentUser user);
        Task<bool> UpdateStudentUserAsync(StudentDetail user);
        Task<List<StudentUser>> GetAllStudentUserAsync();
        Task<PagedResult<StudentUser>> GetAllStudentUserByPagedAsync(PaginationParams paginationParams);

    }
}
