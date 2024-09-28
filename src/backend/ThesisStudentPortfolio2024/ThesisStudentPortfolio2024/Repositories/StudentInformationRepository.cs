using Microsoft.EntityFrameworkCore;
using Serilog;
using ThesisStudentPortfolio2024.Data;
using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{
    public class StudentInformationRepository : IStudentInformationRepository
    {
        private readonly ApplicationDbContext _context;
        public StudentInformationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        async Task<bool> IStudentInformationRepository.AddStudentInformationAsync(StudentInformation studentInfo)
        {
            bool ret = false;
            try
            {
                await _context.StudentInformations.AddAsync(studentInfo);                
                await _context.SaveChangesAsync();
                ret = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
            return ret;
        }

        async Task<bool> IStudentInformationRepository.AddStudentInformationDetailAsync(StudentInformationDetail studentInfoDtl)
        {
            bool ret = false;
            try
            {
                await _context.StudentInformationDetails.AddAsync(studentInfoDtl);
                await _context.SaveChangesAsync();
                ret = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
            return ret;
        }

        async Task<StudentInformation> IStudentInformationRepository.GetStudentInformationByUserIdAsync(int userId)
        {
            return await _context.StudentInformations.SingleOrDefaultAsync(u => u.UserId == userId);
        }

        async Task<bool> IStudentInformationRepository.UpdateStudentInformationAsync(StudentInformation studentInfo)
        {
            var eStudentInfo = await _context.StudentInformations.FindAsync(studentInfo.UserId);

            if (eStudentInfo == null)
            {
                // Announcement not found
                return false;
            }

            // Update fields (you can add any other fields you want to update)
            eStudentInfo.AboutMe = studentInfo.AboutMe;
            eStudentInfo.LastModifiedDate = studentInfo.LastModifiedDate;                 

            // Save changes to the database
            await _context.SaveChangesAsync();

            return true;
        }

        async Task<bool> IStudentInformationRepository.UpdateStudentInformationDetailAsync(StudentInformationDetail studentInfoDtl)
        {
            var eStudentInfo = await _context.StudentInformations.FindAsync(studentInfoDtl.StudentInformationId);
            if (eStudentInfo == null)
            {
                // Student Information Detail not found
                return false;
            }

            var eStudentDetail = eStudentInfo.StudentInformationDetails.SingleOrDefault(u => u.Id == studentInfoDtl.Id);

            // Update fields (you can add any other fields you want to update)            
            eStudentDetail.CoverPhoto = studentInfoDtl.CoverPhoto;

            // Save changes to the database
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
