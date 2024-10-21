using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{
    public interface ICourseRepository
    {
        Task<List<Course>> GetAllCourses();
        Task<bool> AddCourseAsync(Course course);
        Task<bool> UpdateCourseAsync(Course course);
        Task<bool> DeleteCourseAsync(Course course);
    }
}
