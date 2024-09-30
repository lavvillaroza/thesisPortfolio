using Microsoft.EntityFrameworkCore;
using Serilog;
using System;
using ThesisStudentPortfolio2024.Data;
using ThesisStudentPortfolio2024.Models;
using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{
    public class StudentSeminarRepository : IStudentSeminarRepository<StudentSeminar>
    {
        private readonly ApplicationDbContext _context;

        public StudentSeminarRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        async Task<bool> IStudentSeminarRepository<StudentSeminar>.AddStudentSeminartAsync(StudentSeminar studentSeminar)
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

        async Task<bool> IStudentSeminarRepository<StudentSeminar>.UpdateStudentSeminarAsync(StudentSeminar studentSeminar)
        {
            var existingStudentSeminar = await _context.StudentSeminars.FindAsync(studentSeminar.Id);

            if (existingStudentSeminar == null)
            {
                // Announcement not found
                return false;
            }

            // Update fields (you can add any other fields you want to update)            
            existingStudentSeminar.Title = studentSeminar.Title;            
            existingStudentSeminar.DateAttendedFrom = studentSeminar.DateAttendedFrom;
            existingStudentSeminar.DateAttendedTo = studentSeminar.DateAttendedTo;
            existingStudentSeminar.TimeAttended = studentSeminar.TimeAttended;
            existingStudentSeminar.Reflection = studentSeminar.Reflection;
            existingStudentSeminar.Deleted = studentSeminar.Deleted;
            existingStudentSeminar.LastModifiedDate = DateTime.Now;

            // Save changes to the database
            await _context.SaveChangesAsync();

            return true;
        }

        async Task<PagedResult<StudentSeminar>> IStudentSeminarRepository<StudentSeminar>.GetStudentSeminarByStudentIdAsync(PaginationParams paginationParams, int userId)
        {
            var query = _context.StudentSeminars.Where(x => x.UserId == userId).AsQueryable();
            var totalCount = await query.CountAsync();
            var studSeminars = await query
                .Skip((paginationParams.PageNumber - 1) * paginationParams.PageSize)
                .Take(paginationParams.PageSize)
                .ToListAsync();

            return new PagedResult<StudentSeminar>
            {
                Items = studSeminars,
                TotalCount = totalCount,
                PageNumber = paginationParams.PageNumber,
                PageSize = paginationParams.PageSize
            };
        }
    }
}
