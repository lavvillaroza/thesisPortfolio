using Microsoft.AspNetCore.Hosting;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;
using ThesisStudentPortfolio2024.Models.Dtos;
using ThesisStudentPortfolio2024.Models.Entities;
using ThesisStudentPortfolio2024.Repositories;
using static System.Collections.Specialized.BitVector32;

namespace ThesisStudentPortfolio2024.Services
{
    public class StudentService
    {
        private readonly IStudentDetailRepository _studentDetailRepository;
        private readonly IStudentSeminarRepository _studentSeminarRepository;
        private readonly IStudentSkillRepository _studentSkillRepository;
        private readonly IStudentSubjectTakenRepository _studentSubjectTakenRepository;
        private readonly IStudentInformationRepository _studentInformationRepository;
        private readonly ICourseRepository _courseRepository;
        private readonly IWebHostEnvironment _webhostEnvironment;
        private readonly ISubjectRepository _subjectRepository;
        public StudentService(IStudentDetailRepository studentDetailRepository, 
                               IStudentSeminarRepository studentSeminarRepository, 
                               IStudentSkillRepository studentSkillRepository, 
                               IStudentSubjectTakenRepository studentSubjectTakenRepository, 
                               IStudentInformationRepository studentInformationRepository, 
                               ICourseRepository courseRepository, IWebHostEnvironment webhostEnvironment, 
                               ISubjectRepository subjectRepository)
        {            
            _studentDetailRepository = studentDetailRepository;
            _studentSeminarRepository = studentSeminarRepository;
            _studentSkillRepository = studentSkillRepository;
            _studentSubjectTakenRepository = studentSubjectTakenRepository;
            _studentInformationRepository = studentInformationRepository;
            _courseRepository = courseRepository;
            _webhostEnvironment = webhostEnvironment;
            _subjectRepository = subjectRepository;
        }

        public async Task<StudentDetailDto> GetStudentDetailByUserIdAsync(int userId)
        {
            var studentDetail  = await _studentDetailRepository.GetStudentDetailByUserIdAsync(userId);
            var course = await _courseRepository.GetCourseByIdAsync(studentDetail.CourseId);

            StudentDetailDto studentDetailDto = new StudentDetailDto { 
                Id = studentDetail.UserId,
                UserId = studentDetail.UserId,
                StudentId = studentDetail.StudentId,
                StudentName = studentDetail.StudentName,
                CourseId = studentDetail.CourseId,
                CourseName = course.CourseName,
                YearLevel = studentDetail.YearLevel,
                Section = studentDetail.Section,
                YearStart = studentDetail.YearStart,
                YearEnd = studentDetail.YearEnd,
                SchoolEmail = studentDetail.SchoolEmail,
                PersonalEmail = studentDetail.PersonalEmail,
                PortfoliuURL = studentDetail.PortfolioUrl,
                AttachedResume = studentDetail.AttachedResume,
                CreatedBy = studentDetail.CreatedBy
            };
            return studentDetailDto;
        }

        public async Task<bool> AddStudentDetailAsync(StudentDetail studentDetail) { 

            return await _studentDetailRepository.AddStudentDetailAsync(studentDetail);
        }
        public async Task<bool> UpdateStudentDetailAsync(StudentDetailDto studentDetailDto) {
            StudentDetail studentDetail = new StudentDetail
            {
                Id = studentDetailDto.Id,
                UserId = studentDetailDto.UserId,
                StudentId = studentDetailDto.StudentId,
                StudentName = studentDetailDto.StudentName,
                CourseId = studentDetailDto.CourseId,
                YearLevel = studentDetailDto.YearLevel,
                Section = studentDetailDto.Section,
                YearStart = studentDetailDto.YearStart,
                YearEnd = studentDetailDto.YearEnd,
                SchoolEmail = studentDetailDto.SchoolEmail,
                PersonalEmail = studentDetailDto.PersonalEmail,
                LastModifiedBy = studentDetailDto.LastModifiedBy,
            };

            if (studentDetailDto.AttachedResumeFile != null)
            {
                // Ensure the Uploads directory exists
                var contentPath = _webhostEnvironment.WebRootPath;
                string uploadsFolderName = Path.Combine("Uploads", "StudentFiles");
                string uploadsDirectory = Path.Combine(contentPath, uploadsFolderName);

                // Check if the directory exists
                if (!Directory.Exists(uploadsDirectory))
                {
                    // Create the directory if it doesn't exist
                    Directory.CreateDirectory(uploadsDirectory);
                }
                var fileName = Path.GetFileNameWithoutExtension(studentDetailDto.AttachedResumeFile.FileName);
                var extension = Path.GetExtension(studentDetailDto.AttachedResumeFile.FileName);
                var newFileName = $"{fileName}_{Guid.NewGuid().ToString()}{extension}";
                var fullFileName = Path.Combine(uploadsDirectory, newFileName);
                var attachedPath = Path.Combine(uploadsFolderName, newFileName);
                using (var stream = new FileStream(fullFileName, FileMode.Create))
                {
                    await studentDetailDto.AttachedResumeFile.CopyToAsync(stream);
                }

                studentDetail.AttachedResume = attachedPath;
            }

            return await _studentDetailRepository.UpdateStudentDetailAsync(studentDetail);
        }

        //Seminar
        public async Task<bool> AddStudentSeminarAsync(StudentSeminar studentSeminar)
        {
            return await _studentSeminarRepository.AddStudentSeminartAsync(studentSeminar);
        }
        public async Task<bool> UpdateStudentSeminarAsync(StudentSeminar studentSeminar) {
            return await _studentSeminarRepository.UpdateStudentSeminarAsync(studentSeminar);
        }
        public async Task<ICollection<StudentSeminar>> GetStudentSeminarByUserIdAsync(int userId) {
            return await _studentSeminarRepository.GetStudentSeminarByStudentIdAsync(userId);
        }

        //Skill
        public async Task<List<StudentSkill>> GetStudentSkillsByUserIdAsync(int userId) {
            return await _studentSkillRepository.GetStudentSkillsByStudentIdAsync(userId);
        }
        public async Task<List<Skill>> GetAllSkillsAsync() { 
            return await _studentSkillRepository.GetAllSkillsAsync();
        }
        public async Task<bool> AddStudentSkillAsync(StudentSkill studentSkill) { 
            return await _studentSkillRepository.AddStudentSkillAsync(studentSkill);
        }
        public async Task<bool> DeleteStudentSkillAsync(StudentSkill studentSkill) {
            return await _studentSkillRepository.DeleteStudentSkillAsync(studentSkill);
        }

        //Subject Taken
        public async Task<PagedResultDto> GetAllStudentSubjetTakenByUser(PaginationParamsDto paginationParamsDto ,int userId)
        {
            List<StudentSubjectTaken> fetchSubjectsTaken = await _studentSubjectTakenRepository.GetAllStudentSubjetTakenByUser(userId);
            List<Subject> fetchSubjects = await _subjectRepository.GetSubjectsAsync();
            PagedResultDto pagedResultDto = new PagedResultDto();
            pagedResultDto.TotalCount = fetchSubjectsTaken.Count();
            pagedResultDto.PageNumber = paginationParamsDto.PageNumber;
            pagedResultDto.PageSize = paginationParamsDto.PageSize;

            var subjectsTaken = fetchSubjectsTaken
                        .Skip(paginationParamsDto.Skip)
                        .Take(paginationParamsDto.PageSize)
                        .ToList();

            List<StudentSubjectTakenDto> subjectsTakenDto = new List<StudentSubjectTakenDto>();
            foreach (var subjectTaken in fetchSubjectsTaken) {
                var getSubject = fetchSubjects.Where(x => x.Id == subjectTaken.SubjectId).FirstOrDefault();
                StudentSubjectTakenDto studentSubjectTakenDto = new StudentSubjectTakenDto { 
                    Id = subjectTaken.Id,
                    SubjectId = subjectTaken.SubjectId,
                    UserId = subjectTaken.UserId,
                    SubjectName = getSubject.SubjectName,
                    SubjectDescription = getSubject.SubjectDescription,
                    Prereq = getSubject.Prereq,
                    Lec = getSubject.Lec,
                    Lab = getSubject.Lab,
                    Units = getSubject.Units,
                    Hrs = getSubject.Hrs,
                };            
                subjectsTakenDto.Add(studentSubjectTakenDto);
            }
            pagedResultDto.Items = subjectsTakenDto.Cast<object>().ToList();

            return pagedResultDto;
        }
        public async Task<bool> AddStudentSubjetTakenAsync(StudentSubjectTakenDto studentSubjectTakenDto) {
            StudentSubjectTaken studentSubjectTaken = new StudentSubjectTaken { 
                SubjectId = studentSubjectTakenDto.SubjectId,
                UserId = studentSubjectTakenDto.UserId,
                CreatedDate = DateTime.Now,
                LastModifiedDate = DateTime.Now,            
            };
            return await _studentSubjectTakenRepository.AddStudentSubjetTakenAsync(studentSubjectTaken);
        }
        public async Task<bool> DeleteStudentSubjetTakenAsync(StudentSubjectTakenDto studentSubjectTakenDto) {
            StudentSubjectTaken studentSubjectTaken = new StudentSubjectTaken
            {
                Id = studentSubjectTakenDto.Id,
                SubjectId = studentSubjectTakenDto.SubjectId,
                UserId = studentSubjectTakenDto.UserId,
                CreatedDate = DateTime.Now,
                LastModifiedDate = DateTime.Now,
            };
            return await _studentSubjectTakenRepository.DeleteStudentSubjetTakenAsync(studentSubjectTaken);
        }

        //Student Information
        public async Task<bool> AddOrUpdateStudentInformationAsync(StudentInformationDto studentInfoDto) {            
            StudentInformation newStudentInformation = new StudentInformation
            {
                Id = studentInfoDto.Id,
                UserId = studentInfoDto.UserId,
                AboutMe = studentInfoDto.AboutMe,               
                CoverPhotoOne = studentInfoDto.CoverPhotoOne,
                CoverPhotoTwo = studentInfoDto.CoverPhotoTwo,
                CoverPhotoThree = studentInfoDto.CoverPhotoThree,
                CoverPhotoFour = studentInfoDto.CoverPhotoFour,
                LastModifiedDate = DateTime.Now,                
            };

            // Ensure the Uploads directory exists
            var contentPath = _webhostEnvironment.WebRootPath;
            string uploadsFolderName = Path.Combine("Uploads", "StudentCoverPhotos");
            string uploadsDirectory = Path.Combine(contentPath, uploadsFolderName);

            // Check if the directory exists
            if (!Directory.Exists(uploadsDirectory))
            {
                // Create the directory if it doesn't exist
                Directory.CreateDirectory(uploadsDirectory);
            }

            if (studentInfoDto.CoverPhotoOneFile != null)
            {
                var fileName = Path.GetFileNameWithoutExtension(studentInfoDto.CoverPhotoOneFile.FileName);
                var extension = Path.GetExtension(studentInfoDto.CoverPhotoOneFile.FileName);
                var newFileName = $"{fileName}_{Guid.NewGuid().ToString()}{extension}";
                var fullFileName = Path.Combine(uploadsDirectory, newFileName);
                var attachedPath = Path.Combine(uploadsFolderName, newFileName);
                using (var stream = new FileStream(fullFileName, FileMode.Create))
                {
                    await studentInfoDto.CoverPhotoOneFile.CopyToAsync(stream);
                }
                newStudentInformation.CoverPhotoOne = attachedPath;
            }

            if (studentInfoDto.CoverPhotoTwoFile != null)
            {
                var fileName = Path.GetFileNameWithoutExtension(studentInfoDto.CoverPhotoTwoFile.FileName);
                var extension = Path.GetExtension(studentInfoDto.CoverPhotoTwoFile.FileName);
                var newFileName = $"{fileName}_{Guid.NewGuid().ToString()}{extension}";
                var fullFileName = Path.Combine(uploadsDirectory, newFileName);
                var attachedPath = Path.Combine(uploadsFolderName, newFileName);
                using (var stream = new FileStream(fullFileName, FileMode.Create))
                {
                    await studentInfoDto.CoverPhotoTwoFile.CopyToAsync(stream);
                }
                newStudentInformation.CoverPhotoTwo = attachedPath;
            }

            if (studentInfoDto.CoverPhotoThreeFile != null)
            {
                var fileName = Path.GetFileNameWithoutExtension(studentInfoDto.CoverPhotoThreeFile.FileName);
                var extension = Path.GetExtension(studentInfoDto.CoverPhotoThreeFile.FileName);
                var newFileName = $"{fileName}_{Guid.NewGuid().ToString()}{extension}";
                var fullFileName = Path.Combine(uploadsDirectory, newFileName);
                var attachedPath = Path.Combine(uploadsFolderName, newFileName);
                using (var stream = new FileStream(fullFileName, FileMode.Create))
                {
                    await studentInfoDto.CoverPhotoThreeFile.CopyToAsync(stream);
                }
                newStudentInformation.CoverPhotoThree = attachedPath;
            }

            if (studentInfoDto.CoverPhotoFourFile != null)
            {
                var fileName = Path.GetFileNameWithoutExtension(studentInfoDto.CoverPhotoFourFile.FileName);
                var extension = Path.GetExtension(studentInfoDto.CoverPhotoFourFile.FileName);
                var newFileName = $"{fileName}_{Guid.NewGuid().ToString()}{extension}";
                var fullFileName = Path.Combine(uploadsDirectory, newFileName);
                var attachedPath = Path.Combine(uploadsFolderName, newFileName);
                using (var stream = new FileStream(fullFileName, FileMode.Create))
                {
                    await studentInfoDto.CoverPhotoFourFile.CopyToAsync(stream);
                }
                newStudentInformation.CoverPhotoFour = attachedPath;
            }
            await _studentInformationRepository.AddOrUpdateStudentInformationAsync(newStudentInformation);

            return true;
        }

        public async Task<StudentInformationDto?> GetStudentInformationByUserIdAsync(int userId) {
            StudentInformation? studentInformation = await _studentInformationRepository.GetStudentInformationByUserIdAsync(userId);            

            if (studentInformation == null) { 
                return new StudentInformationDto();
            }

            StudentInformationDto studentInformationDto = new StudentInformationDto
            {
                Id = studentInformation.Id,
                UserId = studentInformation.UserId,
                AboutMe = studentInformation.AboutMe,
                CoverPhotoOne = studentInformation.CoverPhotoOne,
                CoverPhotoTwo = studentInformation.CoverPhotoTwo,
                CoverPhotoThree = studentInformation.CoverPhotoThree,
                CoverPhotoFour = studentInformation.CoverPhotoFour,
            };            

            return studentInformationDto;
        }
    }
}
