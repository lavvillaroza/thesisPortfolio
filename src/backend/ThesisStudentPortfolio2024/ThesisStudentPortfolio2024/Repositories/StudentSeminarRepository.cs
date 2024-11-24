using Microsoft.EntityFrameworkCore;
using Serilog;
using System;
using ThesisStudentPortfolio2024.Data;
using ThesisStudentPortfolio2024.Models.Dtos;
using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{
    public class StudentSeminarRepository : IStudentSeminarRepository
    {
        private readonly ApplicationDbContext _context;

        public StudentSeminarRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        async Task<bool> IStudentSeminarRepository.AddStudentSeminartAsync(StudentSeminar studentSeminar)
        {
            bool ret = false;
            try
            {
                await _context.StudentSeminars.AddAsync(studentSeminar);
                await _context.SaveChangesAsync();
                ret = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
            return ret;
        }

        async Task<bool> IStudentSeminarRepository.UpdateStudentSeminarAsync(StudentSeminar studentSeminar)
        {
            var existingStudentSeminar = await _context.StudentSeminars.FindAsync(studentSeminar.Id);

            if (existingStudentSeminar == null)
            {
                // Announcement not found
                return false;
            }

            // Update fields (you can add any other fields you want to update)            
            existingStudentSeminar.Title = studentSeminar.Title;            
            existingStudentSeminar.DateAttended = studentSeminar.DateAttended;            
            existingStudentSeminar.Reflection = studentSeminar.Reflection;
            existingStudentSeminar.LastModifiedDate = DateTime.Now;

            // Save changes to the database
            await _context.SaveChangesAsync();

            return true;
        }

        async Task<ICollection<StudentSeminar>> IStudentSeminarRepository.GetStudentSeminarByStudentIdAsync(int userId)
        {
            var result = await _context.StudentSeminars.Where(x => x.UserId == userId).ToListAsync();
            
            return result;
        }

        async Task<bool> IStudentSeminarRepository.DeleteStudentSeminarAsync(int seminarId)
        {
            bool ret = false;
            try
            {
                var studentSeminaritem = await _context.StudentSeminars.FindAsync(seminarId);
                if (studentSeminaritem != null)
                {
                    _context.StudentSeminars.Remove(studentSeminaritem);
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
