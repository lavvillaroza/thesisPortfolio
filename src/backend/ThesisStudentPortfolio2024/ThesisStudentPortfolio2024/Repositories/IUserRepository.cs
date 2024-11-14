using ThesisStudentPortfolio2024.Models.Dtos;
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
        Task<List<AdminUser>> GetAdminsAsync();        

        //Student Repository
        Task<StudentUser?> GetStudentUserByIdAsync(int id);
        Task<StudentUser?> GetStudentUserByUsernameAsync(string username);
        Task<bool> AddStudentUserAsync(StudentUser user, StudentDetail userDetail);
        Task<bool> UpdateStudentUserAsync(StudentDetail user);
        Task<List<StudentDetail>> GetStudentsAsync();
        Task<List<StudentDetail>> GetStudentsBySearchAsync(string searchValue);
    }
}
