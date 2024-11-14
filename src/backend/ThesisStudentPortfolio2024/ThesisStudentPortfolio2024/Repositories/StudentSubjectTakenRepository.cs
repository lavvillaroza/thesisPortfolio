using Microsoft.EntityFrameworkCore;
using Serilog;
using ThesisStudentPortfolio2024.Data;
using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{

    public class StudentSubjectTakenRepository : IStudentSubjectTakenRepository
    {
        private readonly ApplicationDbContext _context;

        public StudentSubjectTakenRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        async Task<bool> IStudentSubjectTakenRepository.AddStudentSubjetTakenAsync(StudentSubjectTaken studentSubjectTaken)
        {
            bool ret = false;
            try
            {
                await _context.StudentSubjectsTaken.AddAsync(studentSubjectTaken);
                await _context.SaveChangesAsync();
                ret = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
            return ret;
        }

        async Task<bool> IStudentSubjectTakenRepository.DeleteStudentSubjetTakenAsync(StudentSubjectTaken studentSubjectTaken)
        {
            bool ret = false;
            try
            {
                _context.StudentSubjectsTaken.Remove(studentSubjectTaken);
                await _context.SaveChangesAsync();
                ret = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
            return ret;
        }

        async Task<List<StudentSubjectTaken>> IStudentSubjectTakenRepository.GetAllStudentSubjetTakenByUser(int userId)
        {
            return await _context.StudentSubjectsTaken.Where(x => x.UserId == userId).ToListAsync();
        }
    }
}
