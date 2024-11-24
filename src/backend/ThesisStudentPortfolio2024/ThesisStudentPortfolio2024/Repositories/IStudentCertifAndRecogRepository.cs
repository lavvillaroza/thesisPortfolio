using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{
    public interface IStudentCertifAndRecogRepository
    {
        Task<IEnumerable<StudentCertAndRecog>> GetCertificatesAsync(int userId);
        Task<bool> AddCertificateAsync(StudentCertAndRecog studentCertAndRecog);
        Task<bool> UpdateCertificateAsync(StudentCertAndRecog studentCertAndRecog);
        Task<bool> DeleteCertificateAsync(int id);
        Task<IEnumerable<StudentCertAndRecog>> GetRecognitionsAsync(int userId);
        Task<bool> AddRecognitionAsync(StudentCertAndRecog studentCertAndRecog);
        Task<bool> UpdateRecognitionAsync(StudentCertAndRecog studentCertAndRecog);
        Task<bool> DeleteRecognitionAsync(int id);
    }
}
