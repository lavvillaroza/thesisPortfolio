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
        async Task<List<StudentSubjectTaken>> IStudentSubjectTakenRepository.GetStudentSubjetsTakenByUser(int userId)
        {
            return await _context.StudentSubjectsTaken.Where(x => x.UserId == userId).ToListAsync();
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

        async Task<bool> IStudentSubjectTakenRepository.DeleteStudentSubjetTakenAsync(int id)
        {            
            bool ret = false;
            try
            {
                var getStudentSubject = await _context.StudentSubjectsTaken.FindAsync(id);

                if (getStudentSubject != null)
                {
                    _context.StudentSubjectsTaken.Remove(getStudentSubject);
                    await _context.SaveChangesAsync();
                }

                ret =  true;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
            return ret;
        }

        async Task<bool> IStudentSubjectTakenRepository.UpdateStudentSubjetTakenAsync(StudentSubjectTaken studentSubjectTaken)
        {
            var existingSubjectTaken = await _context.StudentSubjectsTaken.FindAsync(studentSubjectTaken.Id);

            if (existingSubjectTaken == null)
            {                
                return false;
            }

            // Update fields (you can add any other fields you want to update)
            existingSubjectTaken.LastModifiedDate = studentSubjectTaken.LastModifiedDate;
            existingSubjectTaken.SubjectStatus = studentSubjectTaken.SubjectStatus;
            
            // Save changes to the database
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
