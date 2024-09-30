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
            var eStudentDetail = await _context.StudentDetails.FindAsync(studentDetail.UserId);

            if (eStudentDetail == null)
            {
                // Student Detail not found
                return false;
            }

            // Update fields (you can add any other fields you want to update)            
            eStudentDetail.StudentId = studentDetail.StudentId;
            eStudentDetail.FirstName = studentDetail.FirstName;
            eStudentDetail.MiddleName = studentDetail.MiddleName;
            eStudentDetail.LastName = studentDetail.LastName;
            eStudentDetail.Course = studentDetail.Course;
            eStudentDetail.SchoolEmail = studentDetail.SchoolEmail;
            eStudentDetail.PersonalEmail = studentDetail.PersonalEmail;
            eStudentDetail.PortfolioUrl = studentDetail.PortfolioUrl;
            eStudentDetail.ProfilePicture = studentDetail.ProfilePicture;
            eStudentDetail.LastModifiedDate = DateTime.Now;

            // Save changes to the database
            await _context.SaveChangesAsync();
            return true;
        }
        async Task<StudentDetail?> IStudentDetailRepository.GetStudentDetailByUserIdAsync(int userId)
        {
            return _context.StudentDetails.SingleOrDefault(x => x.UserId == userId);
        }
    }
}
