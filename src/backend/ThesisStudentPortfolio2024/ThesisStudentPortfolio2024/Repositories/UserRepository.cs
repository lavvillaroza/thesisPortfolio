using Microsoft.EntityFrameworkCore;
using Serilog;
using ThesisStudentPortfolio2024.Data;
using ThesisStudentPortfolio2024.Models;
using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        
        //All
        async Task<List<AdminUser>> IUserRepository.GetAllAdminUserAsync()
        {
            return await _context.AdminUsers.ToListAsync();
        }
        async Task<List<StudentUser>> IUserRepository.GetAllStudentUserAsync()
        {            
            return await _context.StudentUsers.ToListAsync();
        }
        async Task<PagedResult<StudentUser>> IUserRepository.GetAllStudentUserByPagedAsync(PaginationParams paginationParams)
        {
            var query = _context.StudentUsers
                        .Include(a => a.StudentDetail)
                        .AsQueryable();

            var totalCount = await query.CountAsync();
            var studentUsers = await query
                .Skip((paginationParams.PageNumber - 1) * paginationParams.PageSize)
                .Take(paginationParams.PageSize)
                .ToListAsync();

            return new PagedResult<StudentUser>
            {
                Items = studentUsers,
                TotalCount = totalCount,
                PageNumber = paginationParams.PageNumber,
                PageSize = paginationParams.PageSize
            };
        }
        //Admin
        async Task<AdminUser?> IUserRepository.GetAdminUserByIdAsync(int id)
        {
            return await _context.AdminUsers.SingleOrDefaultAsync(u => u.UserId == id);
        }

        async Task<PagedResult<AdminUser>> IUserRepository.GetAllAdminUserByPagedAsync(PaginationParams paginationParams)
        {
            var query = _context.AdminUsers                        
                        .AsQueryable();

            var totalCount = await query.CountAsync();
            var admintUsers = await query
                .Skip((paginationParams.PageNumber - 1) * paginationParams.PageSize)
                .Take(paginationParams.PageSize)
                .ToListAsync();

            return new PagedResult<AdminUser>
            {
                Items = admintUsers,
                TotalCount = totalCount,
                PageNumber = paginationParams.PageNumber,
                PageSize = paginationParams.PageSize
            };
        }

        async Task<bool> IUserRepository.AddAdminUserAsync(AdminUser user)
        {
            bool ret = false;
            try
            {
                await _context.AdminUsers.AddAsync(user);
                await _context.SaveChangesAsync();
                ret = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
            return ret;
        }
        async Task<bool> IUserRepository.UpdateAdminUserAsync(AdminUser user)
        {
            var existingUser = await _context.AdminUsers.FindAsync(user.UserId);

            if (existingUser == null)
            {
                // User not found
                return false;
            }

            // Update fields (you can add any other fields you want to update)
            existingUser.Name = user.Name;            
            existingUser.Position = user.Position;
            existingUser.Email = user.Email;
            existingUser.UserName = user.UserName;
            existingUser.Password = user.Password;
            existingUser.Deleted = user.Deleted;
            existingUser.Version = user.Version;
            existingUser.LastModifiedBy = user.LastModifiedBy;
            existingUser.LastModifiedDate = user.LastModifiedDate;

            // Save changes to the database
            await _context.SaveChangesAsync();

            return true;
        }
        async Task<AdminUser?> IUserRepository.GetAdminUserByUserNameAsync(string username)
        {
            var result = await _context.AdminUsers.SingleOrDefaultAsync(u => u.UserName == username);

            return result;
        }

        //Student
        async Task<bool> IUserRepository.AddStudentUserAsync(StudentUser user)
        {
            bool ret = false;
            try
            {
                await _context.StudentUsers.AddAsync(user);
                await _context.SaveChangesAsync();
                ret = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
            return ret;
        }
        async Task<bool> IUserRepository.UpdateStudentUserAsync(StudentDetail user)
        {
            var existingUser = await _context.StudentDetails.FindAsync(user.UserId);

            if (existingUser == null)
            {
                // User not found
                return false;
            }

            // Update fields (you can add any other fields you want to update)
            existingUser.StudentId = user.StudentId;
            existingUser.Name = user.Name;            
            existingUser.Course = user.Course;
            existingUser.SchoolEmail = user.SchoolEmail;
            existingUser.PersonalEmail = user.PersonalEmail;
            existingUser.LastModifiedDate = DateTime.Now;

            // Save changes to the database
            await _context.SaveChangesAsync();

            return true;
        }        
        async Task<StudentUser?> IUserRepository.GetStudentUserByIdAsync(int id)
        {
            return await _context.StudentUsers.SingleOrDefaultAsync(u => u.UserId == id);
        }
        async Task<StudentUser?> IUserRepository.GetStudentUserByUsernameAsync(string username)
        {
            return await _context.StudentUsers.SingleOrDefaultAsync(u => u.UserName == username);
        }
    }
}
