using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{
    public interface IStudentDetailRepository
    {
        Task<StudentDetail?> GetStudentDetailByUserIdAsync(int userId);
        Task<bool> AddStudentDetailAsync(StudentDetail studentDetail);
        Task<bool> UpdateStudentDetailAsync(StudentDetail studentDetail);
    }
}
