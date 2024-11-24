using Microsoft.EntityFrameworkCore;
using Serilog;
using ThesisStudentPortfolio2024.Data;
using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{
    public class StudentSkillRepository : IStudentSkillRepository
    {
        private readonly ApplicationDbContext _context;

        public StudentSkillRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        async Task<List<StudentSkill>> IStudentSkillRepository.GetStudentSkillsByStudentIdAsync(int userId)
        {
            return await _context.StudentSkills.Where(x => x.UserId == userId).ToListAsync();
        }

        async Task<bool> IStudentSkillRepository.AddStudentSkillAsync(StudentSkill studentSkill)
        {
            bool ret = false;
            try
            {
                await _context.StudentSkills.AddAsync(studentSkill);
                await _context.SaveChangesAsync();
                ret = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
            return ret;
        }
        async Task<bool> IStudentSkillRepository.DeleteStudentSkillAsync(int id)
        {
            bool ret = false;
            try
            {
                var studentSkillitem = await _context.StudentSkills.FindAsync(id);
                if (studentSkillitem != null) {
                    _context.StudentSkills.Remove(studentSkillitem);
                    await _context.SaveChangesAsync();
                    ret = true;
                }                
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
            return ret;
        }                
    }
}
