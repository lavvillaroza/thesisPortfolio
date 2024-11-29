using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using ThesisStudentPortfolio2024.Models.Dtos;
using ThesisStudentPortfolio2024.Models.Entities;
using ThesisStudentPortfolio2024.Repositories;

namespace ThesisStudentPortfolio2024.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;
        private readonly EncryptionService _encryptionService;
        private readonly ICourseRepository _courseRepository;        
        public UserService(IUserRepository userRepository, EncryptionService encryptionService, ICourseRepository courseRepository)
        {
            _userRepository = userRepository;
            _encryptionService = encryptionService;
            _courseRepository = courseRepository;
        }

        public async Task<bool> AddAdminUserAsync(AdminUserDto newAdmin)
        {
            AdminUser adminUser = new AdminUser
            {
                UserId = newAdmin.UserId,
                Name = newAdmin.Name,
                Position = newAdmin.Position,
                UserName = newAdmin.UserName,
                Password = _encryptionService.Encrypt("Qwerty1234!"),
                SchoolEmail = newAdmin.SchoolEmail,
                Version = newAdmin.Version,
                CreatedBy = newAdmin.CreatedBy,
                CreatedDate = DateTime.Now,
                LastModifiedBy = newAdmin.LastModifiedBy,
                LastModifiedDate = DateTime.Now,

            };
            return await _userRepository.AddAdminUserAsync(adminUser);
        }

        public async Task<bool> AddStudentUserAsync(StudentDetailDto newStudent)
        {
            StudentUser studentUser = new StudentUser
            {
                UserName = newStudent.SchoolEmail,
                Password = _encryptionService.Encrypt("Qwerty1234!"),
                Version = 0,
                CreatedBy = newStudent.LastModifiedBy,
                CreatedDate = DateTime.Now,
                LastModifiedBy = newStudent.LastModifiedBy,
                LastModifiedDate = DateTime.Now,                
            };

            StudentDetail studentDetail = new StudentDetail
            {
                StudentId = newStudent.StudentId,
                StudentName = newStudent.StudentName,
                CourseId = newStudent.CourseId,
                Section = newStudent.Section,
                YearLevel = newStudent.YearLevel,
                YearStart = newStudent.YearStart,
                YearEnd = null,
                SchoolEmail = newStudent.SchoolEmail,
                LastModifiedBy = newStudent.LastModifiedBy
            };

            return await _userRepository.AddStudentUserAsync(studentUser, studentDetail);
        }

        public async Task<AdminUserDto?> GetAdminUserByIdAsync(int id)
        {
            AdminUser adminUser = await _userRepository.GetAdminUserByIdAsync(id);
            AdminUserDto adminUserDto = new AdminUserDto
            {
                UserId = adminUser.UserId,
                Name = adminUser.Name,
                Position = adminUser.Position,
                SchoolEmail = adminUser.SchoolEmail,
            };
            return adminUserDto;
        }

        public async Task<string> GetCurrentPasswordByAdminUserIdAsync(int id)
        {
            var adminUser = await _userRepository.GetAdminUserByIdAsync(id);            
            return adminUser.Password;
        }

        public async Task<string> GetCurrentPasswordByStudentUserIdAsync(int id)
        {
            var studentUser = await _userRepository.GetStudentUserByIdAsync(id);
            return studentUser.Password;
        }

        public async Task<PagedResultDto> GetAdminUsersAsync(PaginationParamsDto paginationParamsDto)
        {
            List<AdminUser> fetchAdmins = await _userRepository.GetAdminsAsync();
            PagedResultDto pagedResultDto = new PagedResultDto();

            pagedResultDto.TotalCount = fetchAdmins.Count();
            pagedResultDto.PageNumber = paginationParamsDto.PageNumber;
            pagedResultDto.PageSize = paginationParamsDto.PageSize;

            var admins = fetchAdmins
                        .Skip(paginationParamsDto.Skip)
                        .Take(paginationParamsDto.PageSize)
                        .ToList();

            List<AdminUserDto> adminUsersDto = new List<AdminUserDto>();
            foreach (AdminUser adminUser in admins)
            {
                AdminUserDto adminUserDto = new AdminUserDto
                {
                    UserId = adminUser.UserId,
                    Name = adminUser.Name,
                    Position = adminUser.Position,
                    UserName = adminUser.UserName,                    
                    SchoolEmail = adminUser.SchoolEmail,
                    Version = adminUser.Version,
                    CreatedBy = adminUser.CreatedBy,
                    CreatedDate = adminUser.CreatedDate,                    
                    LastModifiedBy = adminUser.LastModifiedBy,
                    LastModifiedDate = adminUser.LastModifiedDate,                    
                };
                adminUsersDto.Add(adminUserDto);
            }
            pagedResultDto.Items = adminUsersDto.Cast<object>().ToList();
            return pagedResultDto;
        }
       
        public async Task<PagedResultDto> GetStudentsAsync(PaginationParamsDto paginationParamsDto)
        {
            List<StudentDetail> fetchStudents = await _userRepository.GetStudentsAsync();
            List<Course> fetchCourses = await _courseRepository.GetCoursesAsync();
            PagedResultDto pagedResultDto = new PagedResultDto();

            pagedResultDto.TotalCount = fetchStudents.Count();
            pagedResultDto.PageNumber = paginationParamsDto.PageNumber;
            pagedResultDto.PageSize = paginationParamsDto.PageSize;

            var students = fetchStudents
                               .Skip(paginationParamsDto.Skip)
                               .Take(paginationParamsDto.PageSize)
                               .ToList();

            List<StudentDetailDto> studentsDetailDto = new List<StudentDetailDto>();
            foreach (StudentDetail studentDetail in students)
            {
                var getCourseCode = fetchCourses.Where(x => x.Id == studentDetail.CourseId).FirstOrDefault();
                if (getCourseCode != null) {
                    StudentDetailDto studentDetailDto = new StudentDetailDto
                    {
                        Id = studentDetail.Id,
                        StudentId = studentDetail.StudentId,
                        StudentName = studentDetail.StudentName,
                        CourseId = studentDetail.CourseId,
                        CourseName = getCourseCode.CourseCode,
                        YearLevel = studentDetail.YearLevel,
                        Section = studentDetail.Section,
                        YearStart = studentDetail.YearStart,
                        YearEnd = studentDetail.YearEnd,
                        SchoolEmail = studentDetail.SchoolEmail,
                        PersonalEmail = studentDetail.PersonalEmail,
                        AttachedResume = studentDetail.AttachedResume,
                        LastModifiedBy = studentDetail.LastModifiedBy,
                        LastModifiedDate = studentDetail.LastModifiedDate,
                        UserId = studentDetail.UserId,
                    };
                    studentsDetailDto.Add(studentDetailDto);
                }                
            }
            pagedResultDto.Items = studentsDetailDto.Cast<object>().ToList();
            return pagedResultDto;
        }

        public async Task<PagedResultDto> GetStudentsAsync(PaginationParamsDto paginationParamsDto, string searchValue)
        {
            List<StudentDetail> fetchStudents = await _userRepository.GetStudentsBySearchAsync(searchValue);
            PagedResultDto pagedResultDto = new PagedResultDto();

            pagedResultDto.TotalCount = fetchStudents.Count();
            pagedResultDto.PageNumber = paginationParamsDto.PageNumber;
            pagedResultDto.PageSize = paginationParamsDto.PageSize;
            var students = fetchStudents
                            .Skip(paginationParamsDto.Skip)
                            .Take(paginationParamsDto.PageSize)
                            .ToList();
            List<StudentDetailDto> studentsDetailDto = new List<StudentDetailDto>();
            foreach (StudentDetail studentDetail in students)
            {
                StudentDetailDto studentDetailDto = new StudentDetailDto
                {
                    Id = studentDetail.Id,
                    StudentId = studentDetail.StudentId,
                    StudentName = studentDetail.StudentName,
                    CourseId = studentDetail.CourseId,
                    YearLevel = studentDetail.YearLevel,
                    Section = studentDetail.Section,
                    YearStart = studentDetail.YearStart,
                    YearEnd = studentDetail.YearEnd,
                    SchoolEmail = studentDetail.SchoolEmail,
                    PersonalEmail = studentDetail.PersonalEmail,
                    AttachedResume = studentDetail.AttachedResume,                    
                    LastModifiedBy = studentDetail.LastModifiedBy,
                    LastModifiedDate = studentDetail.LastModifiedDate,
                    UserId = studentDetail.UserId,
                };
                studentsDetailDto.Add(studentDetailDto);
            }
            pagedResultDto.Items = studentsDetailDto.Cast<object>().ToList();
            return pagedResultDto;
        }

        public async Task<StudentUser?> GetStudentUserByIdAsync(int id)
        {
            return await _userRepository.GetStudentUserByIdAsync(id);
        }

        public async Task<AdminUser?> GetAdminUserByUserNameAsync(string username)
        {
            return await _userRepository.GetAdminUserByUserNameAsync(username);
        }

        public async Task<StudentUser?> GetStudentUserByUsernameAsync(string username)
        {
            return await _userRepository.GetStudentUserByUsernameAsync(username);
        }

        public async Task<bool> UpdateAdminUserAsync(AdminUserProfileDto adminUserProfileDto)
        {
            AdminUser adminUser = new AdminUser
            {
                UserId = adminUserProfileDto.UserId,
                Name = adminUserProfileDto.Name,
                Position = adminUserProfileDto.Position,                      
                SchoolEmail = adminUserProfileDto.SchoolEmail,                                                
                LastModifiedBy = adminUserProfileDto.LastModifiedBy,
                LastModifiedDate = DateTime.Now,

            };
            return await _userRepository.UpdateAdminUserAsync(adminUser);
        }

        public async Task<bool> UpdateAdminUserPasswordAsync(AdminUserProfileDto adminUserProfileDto)
        {
            AdminUser adminUser = new AdminUser
            {
                UserId = adminUserProfileDto.UserId,
                Name = adminUserProfileDto.Name,
                Position = adminUserProfileDto.Position,
                SchoolEmail = adminUserProfileDto.SchoolEmail,
                LastModifiedBy = adminUserProfileDto.LastModifiedBy,
                LastModifiedDate = DateTime.Now,

            };
            return await _userRepository.UpdateAdminUserAsync(adminUser);
        }

        public async Task<bool> UpdateStudentUserAsync(StudentDetail user)
        {
            return await _userRepository.UpdateStudentUserAsync(user); 
        }
        public async Task<bool> UpdateAdminUserPasswordAsync(ChangePasswordDto changePasswordDto) {            
            var ret = await _userRepository.UpdateAdminUserPasswordAsync(changePasswordDto);
            return ret;            
        }

        public async Task<bool> UpdateStudentUserPasswordAsync(ChangePasswordDto changePasswordDto)
        {            
            var ret = await _userRepository.UpdateStudentUserPasswordAsync(changePasswordDto);
            return ret;
        }
    }
}
