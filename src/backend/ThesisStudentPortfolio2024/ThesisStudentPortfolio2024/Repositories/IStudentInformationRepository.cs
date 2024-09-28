using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{
    public interface IStudentInformationRepository
    {
        Task<bool> AddStudentInformationAsync(StudentInformation studentInfo);
        Task<bool> AddStudentInformationDetailAsync(StudentInformationDetail studentInfoDtl);
        Task<bool> UpdateStudentInformationAsync(StudentInformation studentInfo);
        Task<bool> UpdateStudentInformationDetailAsync(StudentInformationDetail studentInfoDtl);
        Task<StudentInformation> GetStudentInformationByUserIdAsync(int userId);
    }
}
