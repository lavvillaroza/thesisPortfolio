using Microsoft.EntityFrameworkCore;
using Serilog;
using ThesisStudentPortfolio2024.Data;
using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{
    public class SubjectRepository : ISubjectRepository
    {
        private readonly ApplicationDbContext _context;

        public SubjectRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        async Task<bool> ISubjectRepository.AddSubjetAsync(Subject subject)
        {
            bool ret = false;
            try
            {
                await _context.Subjects.AddAsync(subject);
                await _context.SaveChangesAsync();
                ret = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
            return ret;
        }

        async Task<bool> ISubjectRepository.DeleteSubjetAsync(Subject subject)
        {
            bool ret = false;
            try
            {
                _context.Subjects.Remove(subject);
                await _context.SaveChangesAsync();
                ret = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
            return ret;
        }

        async Task<List<Subject>> ISubjectRepository.GetSubjectsAsync()
        {
            return await _context.Subjects.ToListAsync();
        }

        async Task<List<Subject>> ISubjectRepository.GetSearchSubjectsAsync(string searchValue)
        {
            return await _context.Subjects.ToListAsync();
        }

        async Task<bool> ISubjectRepository.UpdateSubjetAsync(Subject subject)
        {
            var eSubject = await _context.Subjects.FindAsync(subject.Id);

            if (eSubject == null)
            {
                // User not found
                return false;
            }

            // Update fields (you can add any other fields you want to update)
            eSubject.SubjectName = subject.SubjectName;
            eSubject.SubjectDescription = subject.SubjectDescription;
            eSubject.Prereq = subject.Prereq;
            eSubject.Lec = subject.Lec;
            eSubject.Lab = subject.Lab;
            eSubject.Units = subject.Units;
            eSubject.Hrs = subject.Hrs;            
            eSubject.LastModifiedBy = subject.LastModifiedBy;
            eSubject.LastModifiedDate = subject.LastModifiedDate;            
            // Save changes to the database
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
