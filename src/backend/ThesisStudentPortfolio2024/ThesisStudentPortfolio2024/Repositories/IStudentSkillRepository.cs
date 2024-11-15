using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{
    public interface IStudentSkillRepository
    {
        Task<List<StudentSkill>> GetStudentSkillsByStudentIdAsync(int userId);        
        Task<bool> AddStudentSkillAsync(StudentSkill studentSkill);
        Task<bool> DeleteStudentSkillAsync(StudentSkill studentSkill);        
    }
}
