using ThesisStudentPortfolio2024.Models.Dtos;
using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{
    public interface IStudentSeminarRepository
    {        
        Task<bool> AddStudentSeminartAsync(StudentSeminar studentSeminar);
        Task<bool> UpdateStudentSeminarAsync(StudentSeminar studentSeminar);        
        Task<ICollection<StudentSeminar>> GetStudentSeminarByStudentIdAsync(int userId);
    }
}
