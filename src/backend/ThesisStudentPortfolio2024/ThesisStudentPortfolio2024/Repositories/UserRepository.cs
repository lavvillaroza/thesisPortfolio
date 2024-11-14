using Microsoft.EntityFrameworkCore;
using Serilog;
using System;
using System.Buffers;
using ThesisStudentPortfolio2024.Data;
using ThesisStudentPortfolio2024.Models.Dtos;
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
        async Task<List<AdminUser>> IUserRepository.GetAdminsAsync()
        {            
            return await _context.AdminUsers.ToListAsync();
        }
        async Task<List<StudentDetail>> IUserRepository.GetStudentsAsync()
        {
            try
            {
                var students = await _context.StudentDetails.ToListAsync();
                return students;
            }
            catch (Exception x) { 
                Console.WriteLine(x.Message);
                return new List<StudentDetail>();
            }
                  
        }
        
        //Admin
        async Task<AdminUser?> IUserRepository.GetAdminUserByIdAsync(int id)
        {
            return await _context.AdminUsers.SingleOrDefaultAsync(u => u.UserId == id);
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
            existingUser.SchoolEmail = user.SchoolEmail;            
            existingUser.Version = existingUser.Version + 1;
            existingUser.LastModifiedBy = user.LastModifiedBy;
            existingUser.LastModifiedDate = DateTime.Now;

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
        async Task<bool> IUserRepository.AddStudentUserAsync(StudentUser user, StudentDetail userDetail)
        {
            bool ret = false;
            try
            {
                await _context.StudentUsers.AddAsync(user);
                await _context.SaveChangesAsync();

                userDetail.UserId = user.UserId;
                await _context.StudentDetails.AddAsync(userDetail);
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
            existingUser.StudentName = user.StudentName;            
            existingUser.CourseId = user.CourseId;
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

        async Task<List<StudentDetail>> IUserRepository.GetStudentsBySearchAsync(string searchValue)
        {
            var students = await _context.StudentDetails
                                .Where(x => EF.Functions.Like(x.StudentName, $"%{searchValue}%"))                                
                                .ToListAsync();
            return students;
        }
    }
}
