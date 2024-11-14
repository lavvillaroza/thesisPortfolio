using ThesisStudentPortfolio2024.Models.Dtos;
using ThesisStudentPortfolio2024.Models.Entities;
using ThesisStudentPortfolio2024.Repositories;

namespace ThesisStudentPortfolio2024.Services
{
    public class CourseService
    {
        private readonly ICourseRepository _courseRepository;
        private readonly IWebHostEnvironment _webhostEnvironment;
        public CourseService(ICourseRepository coureRepository, IWebHostEnvironment webhostEnvironment)
        {
            _courseRepository = coureRepository;
            _webhostEnvironment = webhostEnvironment;   
        }

        public async Task<ICollection<Course>> GetCoursesAsync()
        {
            return await _courseRepository.GetCoursesAsync();
        }
        public async Task<bool> AddCourseAsync(CourseDto courseDTO)
        {
            var newCourse = new Course {
                CourseName = courseDTO.CourseName,
                CourseCode = courseDTO.CourseCode,
                TotalUnitsRequired = courseDTO.TotalUnitsRequired,
                CreatedBy = courseDTO.CreatedBy,
                CreatedDate = DateTime.Now,
                LastModifiedBy = courseDTO.LastModifiedBy,
                LastModifiedDate = DateTime.Now,                               
            };
            


            if (courseDTO.CourseLogo != null) {
                // Ensure the Uploads directory exists
                var contentPath = _webhostEnvironment.WebRootPath;
                string uploadsFolderName = Path.Combine("Uploads", "CoursesFiles");
                string uploadsDirectory = Path.Combine(contentPath, uploadsFolderName);

                // Check if the directory exists
                if (!Directory.Exists(uploadsDirectory))
                {
                    // Create the directory if it doesn't exist
                    Directory.CreateDirectory(uploadsDirectory);
                }
                var fileName = Path.GetFileNameWithoutExtension(courseDTO.CourseLogo.FileName);
                var extension = Path.GetExtension(courseDTO.CourseLogo.FileName);
                var newFileName = $"{fileName}_{Guid.NewGuid().ToString()}{extension}";
                var fullFileName = Path.Combine(uploadsDirectory, newFileName);
                var attachedPath = Path.Combine(uploadsFolderName, newFileName);
                using (var stream = new FileStream(fullFileName, FileMode.Create))
                {
                    await courseDTO.CourseLogo.CopyToAsync(stream);
                }

                newCourse.CourseLogo = attachedPath;
            }
            return await _courseRepository.AddCourseAsync(newCourse);
        }
        public async Task<bool> UpdateSubjetAsync(CourseDto courseDTO)
        {
            var newCourse = new Course
            {
                Id = courseDTO.Id,
                CourseName = courseDTO.CourseName,
                CourseCode = courseDTO.CourseCode,
                TotalUnitsRequired = courseDTO.TotalUnitsRequired,
                CreatedBy = courseDTO.CreatedBy,
                CreatedDate = DateTime.Now,
                LastModifiedBy = courseDTO.LastModifiedBy,
                LastModifiedDate = DateTime.Now,
            };

            if (courseDTO.CourseLogo != null)
            {
                // Ensure the Uploads directory exists
                var contentPath = _webhostEnvironment.WebRootPath;
                string uploadsDirectory = Path.Combine(contentPath, "Uploads", "CoursesFiles");

                var fileName = Path.GetFileNameWithoutExtension(courseDTO.CourseLogo.FileName);
                var extension = Path.GetExtension(courseDTO.CourseLogo.FileName);
                var newFileName = $"{fileName}_{Guid.NewGuid().ToString()}{extension}";
                var fullFileName = Path.Combine(uploadsDirectory, newFileName);
                var attachedPath = Path.Combine("Uploads", "CoursesFiles", newFileName);

                using (var stream = new FileStream(fullFileName, FileMode.Create))
                {
                    await courseDTO.CourseLogo.CopyToAsync(stream);
                }
                newCourse.CourseLogo = attachedPath;
            }

            return await _courseRepository.UpdateCourseAsync(newCourse);
        }
        public async Task<bool> DeleteSubjetAsync(int courseId)
        {
            return await _courseRepository.DeleteCourseAsync(courseId);
        }
    }
}
