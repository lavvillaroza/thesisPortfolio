using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{
    public interface IStudentSubjectTakenRepository
    {
        Task<List<StudentSubjectTaken>> GetAllStudentSubjetTakenByUser(int userId);
        Task<bool> AddStudentSubjetTakenAsync(StudentSubjectTaken studentSubjectTaken);        
        Task<bool> DeleteStudentSubjetTakenAsync(StudentSubjectTaken studentSubjectTaken);
    }
}
