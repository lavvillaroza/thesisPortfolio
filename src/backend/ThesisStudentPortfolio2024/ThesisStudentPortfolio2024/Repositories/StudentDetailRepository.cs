using Microsoft.EntityFrameworkCore;
using Serilog;
using ThesisStudentPortfolio2024.Data;
using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{
    public class StudentDetailRepository : IStudentDetailRepository
    {
        private readonly ApplicationDbContext _context;

        public StudentDetailRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        async Task<bool> IStudentDetailRepository.AddStudentDetailAsync(StudentDetail studentDetail)
        {
            bool ret = false;
            try
            {
                await _context.StudentDetails.AddAsync(studentDetail);
                await _context.SaveChangesAsync();
                ret = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
            return ret;
        }
        async Task<bool> IStudentDetailRepository.UpdateStudentDetailAsync(StudentDetail studentDetail)
        {
            var eStudentDetail = await _context.StudentDetails.SingleOrDefaultAsync( x => x.UserId == studentDetail.UserId);

            if (eStudentDetail == null)
            {
                // Student Detail not found
                return false;
            }

            // Update fields (you can add any other fields you want to update)            
            eStudentDetail.StudentId = studentDetail.StudentId;
            eStudentDetail.StudentName = studentDetail.StudentName;            
            eStudentDetail.CourseId = studentDetail.CourseId;
            eStudentDetail.SchoolEmail = studentDetail.SchoolEmail;
            eStudentDetail.PersonalEmail = studentDetail.PersonalEmail;
            eStudentDetail.AttachedResume = studentDetail.AttachedResume;
            eStudentDetail.LastModifiedDate = DateTime.Now;

            // Save changes to the database
            await _context.SaveChangesAsync();
            return true;
        }
        async Task<StudentDetail?> IStudentDetailRepository.GetStudentDetailByUserIdAsync(int userId)
        {
            return await _context.StudentDetails.SingleOrDefaultAsync(x => x.UserId == userId);
        }

        async Task<IEnumerable<StudentDetail>?> IStudentDetailRepository.GetStudentsDetailAsync()
        {
            return await _context.StudentDetails.ToListAsync();
        }
    }
}
