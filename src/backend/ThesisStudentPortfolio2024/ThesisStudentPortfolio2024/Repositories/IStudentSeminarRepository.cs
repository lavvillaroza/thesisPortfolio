using ThesisStudentPortfolio2024.Models;
using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{
    public interface IStudentSeminarRepository<T> where T : class
    {        
        Task<bool> AddStudentSeminartAsync(StudentSeminar studentSeminar);
        Task<bool> UpdateStudentSeminarAsync(StudentSeminar studentSeminar);        
        Task<PagedResult<T>> GetStudentSeminarByStudentIdAsync(PaginationParams paginationParams, int userId);
    }
}
