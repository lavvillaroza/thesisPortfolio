using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{
    public interface IStudentInformationRepository
    {
        Task<bool> AddOrUpdateStudentInformationAsync(StudentInformation studentInfo);        
        Task<StudentInformation?> GetStudentInformationByUserIdAsync(int userId);        
    }
}
