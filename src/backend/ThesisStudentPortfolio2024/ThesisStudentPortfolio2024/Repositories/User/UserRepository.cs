using Microsoft.EntityFrameworkCore;
using Serilog;
using ThesisStudentPortfolio2024.Data;
using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories.User
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        async Task<AdminUser?> IUserRepository.GetAdminUserByIdAsync(int id)
        {
            return await _context.AdminUsers.SingleOrDefaultAsync(u => u.Id == id);
        }

        async Task<AdminUser?> IUserRepository.GetUserByAdminUsernameAsync(string username)
        {
            return await _context.AdminUsers.SingleOrDefaultAsync(u => u.UserName == username);
        }        
        async Task<bool> IUserRepository.AddAdminUserAsync(AdminUser user)
        {
            bool ret = false;
            try {
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
            var existingUser = await _context.AdminUsers.FindAsync(user.Id);

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
        async Task<StudentUser?> IUserRepository.GetStudentUserByIdAsync(int id)
        {
            return await _context.StudentUsers.SingleOrDefaultAsync(u => u.Id == id);
        }
        async Task<StudentUser?> IUserRepository.GetUserByStudentUsernameAsync(string username)
        {
            return await _context.StudentUsers.SingleOrDefaultAsync(u => u.UserName == username);
        }        
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
            var existingUser = await _context.StudentDetails.FindAsync(user.Id);

            if (existingUser == null)
            {
                // User not found
                return false;
            }

            // Update fields (you can add any other fields you want to update)
            existingUser.StudentId = user.StudentId;
            existingUser.FirstName = user.FirstName;
            existingUser.MiddleName = user.MiddleName;
            existingUser.LastName = user.LastName;
            existingUser.Course = user.Course;
            existingUser.Email = user.Email;                       
            existingUser.LastModifiedDate = DateTime.Now;

            // Save changes to the database
            await _context.SaveChangesAsync();

            return true;
        }

        async Task<List<AdminUser>> IUserRepository.GetAllAdminUserAsync()
        {
            return await _context.AdminUsers.ToListAsync();
        }

        async Task<List<StudentUser>> IUserRepository.GetAllStudentUserAsync()
        {
            return await _context.StudentUsers.ToListAsync();
        }
    }
}
