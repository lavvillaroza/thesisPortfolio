using Microsoft.EntityFrameworkCore;
using Serilog;
using ThesisStudentPortfolio2024.Data;
using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{
    public class StudentCertifAndRecogRepository : IStudentCertifAndRecogRepository
    {
        private readonly ApplicationDbContext _context;
        public StudentCertifAndRecogRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        async Task<bool> IStudentCertifAndRecogRepository.AddCertificateAsync(StudentCertAndRecog studentCertAndRecog)
        {
            bool ret = false;
            try
            {
                await _context.StudentCertifsAndRecogs.AddAsync(studentCertAndRecog);
                await _context.SaveChangesAsync();                
                ret = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
            return ret;
        }

        async Task<bool> IStudentCertifAndRecogRepository.AddRecognitionAsync(StudentCertAndRecog studentCertAndRecog)
        {
            bool ret = false;
            try
            {
                await _context.StudentCertifsAndRecogs.AddAsync(studentCertAndRecog);                         
                await _context.SaveChangesAsync();
                ret = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
            return ret;
        }

        async Task<bool> IStudentCertifAndRecogRepository.DeleteCertificateAsync(int id)
        {
            var getStudentCertif = await _context.StudentCertifsAndRecogs.FindAsync(id);

            if (getStudentCertif != null)
            {
                _context.StudentCertifsAndRecogs.Remove(getStudentCertif);
                await _context.SaveChangesAsync();
            }
            return true;
        }

        async Task<bool> IStudentCertifAndRecogRepository.DeleteRecognitionAsync(int id)
        {
            var getStudentRecog = await _context.StudentCertifsAndRecogs.FindAsync(id);

            if (getStudentRecog != null) {
                _context.StudentCertifsAndRecogs.Remove(getStudentRecog);
                await _context.SaveChangesAsync();
            }
            return true;
        }

        async Task<IEnumerable<StudentCertAndRecog>> IStudentCertifAndRecogRepository.GetCertificatesAsync(int userId)
        {
            return await _context.StudentCertifsAndRecogs.Where(x => x.UserId == userId && x.CertRecogType == 1).ToListAsync();
        }

        async Task<IEnumerable<StudentCertAndRecog>> IStudentCertifAndRecogRepository.GetRecognitionsAsync(int userId)
        {
            return await _context.StudentCertifsAndRecogs.Where(x => x.UserId == userId && x.CertRecogType == 2).ToListAsync();
        }

        async Task<bool> IStudentCertifAndRecogRepository.UpdateCertificateAsync(StudentCertAndRecog studentCertAndRecog)
        {
            var existingData = await _context.StudentCertifsAndRecogs.FindAsync(studentCertAndRecog.Id);

            if (existingData == null)
            {
                // Announcement not found
                return false;
            }

            // Update fields (you can add any other fields you want to update)
            existingData.Name = studentCertAndRecog.Name;
            existingData.Attachment = studentCertAndRecog.Attachment;
            existingData.CertRecogType = studentCertAndRecog.CertRecogType;            
            existingData.LastModifiedDate = DateTime.Now;

            // Save changes to the database
            await _context.SaveChangesAsync();
            return true;
        }

        async Task<bool> IStudentCertifAndRecogRepository.UpdateRecognitionAsync(StudentCertAndRecog studentCertAndRecog)
        {
            var existingData = await _context.StudentCertifsAndRecogs.FindAsync(studentCertAndRecog.Id);

            if (existingData == null)
            {
                // Announcement not found
                return false;
            }

            // Update fields (you can add any other fields you want to update)
            existingData.Name = studentCertAndRecog.Name;
            existingData.Attachment = studentCertAndRecog.Attachment;
            existingData.CertRecogType = studentCertAndRecog.CertRecogType;
            existingData.LastModifiedDate = DateTime.Now;

            // Save changes to the database
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
