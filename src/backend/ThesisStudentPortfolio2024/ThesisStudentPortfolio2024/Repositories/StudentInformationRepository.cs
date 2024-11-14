using Microsoft.EntityFrameworkCore;
using Serilog;
using System.Linq;
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

        async Task<bool> IStudentInformationRepository.AddOrUpdateStudentInformationAsync(StudentInformation studentInfo)
        {            
            try
            {
                // Check if the entity exists based on a unique identifier (e.g., Id).
                var existingEntity = await _context.StudentInformations
                                           .FirstOrDefaultAsync(s => s.Id == studentInfo.Id);

                if (existingEntity == null)
                {
                    // Entity does not exist, so add it.
                    await _context.StudentInformations.AddAsync(studentInfo);
                }
                else
                {
                    // Entity exists, so update it.
                    _context.Entry(existingEntity).CurrentValues.SetValues(studentInfo);
                    _context.StudentInformations.Update(existingEntity);
                }               
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                return false;
            }            
        }
        async Task<StudentInformation?> IStudentInformationRepository.GetStudentInformationByUserIdAsync(int userId)
        {
            return await _context.StudentInformations.Where(x => x.UserId == userId).FirstOrDefaultAsync();
        }       
    }
}
