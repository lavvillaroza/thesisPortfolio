using ThesisStudentPortfolio2024.Models.Entities;
using ThesisStudentPortfolio2024.Repositories;

namespace ThesisStudentPortfolio2024.Services
{
    public class CourseService
    {
        private readonly ICourseRepository _courseRepository;

        public CourseService(ICourseRepository coureRepository)
        {
            _courseRepository = coureRepository;
        }

        public async Task<List<Course>> GetAllCourses()
        {
            return await _courseRepository.GetAllCourses();
        }
        public async Task<bool> AddCourseAsync(Course course)
        {
            return await _courseRepository.AddCourseAsync(course);
        }
        public async Task<bool> UpdateSubjetAsync(Course course)
        {
            return await _courseRepository.UpdateCourseAsync(course);
        }
        public async Task<bool> DeleteSubjetAsync(Course course)
        {
            return await _courseRepository.DeleteCourseAsync(course);
        }
    }
}
