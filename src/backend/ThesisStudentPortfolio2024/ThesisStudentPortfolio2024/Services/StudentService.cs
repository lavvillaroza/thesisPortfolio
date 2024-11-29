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
        private readonly IStudentCertifAndRecogRepository _studentCertifAndRecogRepository;
        public StudentService(IStudentDetailRepository studentDetailRepository, 
                               IStudentSeminarRepository studentSeminarRepository, 
                               IStudentSkillRepository studentSkillRepository, 
                               IStudentSubjectTakenRepository studentSubjectTakenRepository, 
                               IStudentInformationRepository studentInformationRepository, 
                               ICourseRepository courseRepository, IWebHostEnvironment webhostEnvironment, 
                               ISubjectRepository subjectRepository, 
                               IStudentCertifAndRecogRepository studentCertifAndRecogRepository)
        {            
            _studentDetailRepository = studentDetailRepository;
            _studentSeminarRepository = studentSeminarRepository;
            _studentSkillRepository = studentSkillRepository;
            _studentSubjectTakenRepository = studentSubjectTakenRepository;
            _studentInformationRepository = studentInformationRepository;
            _courseRepository = courseRepository;
            _webhostEnvironment = webhostEnvironment;
            _subjectRepository = subjectRepository;
            _studentCertifAndRecogRepository = studentCertifAndRecogRepository;
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
                var newFileName = $"{fileName}_{DateTime.Now.ToString("yyyyMMdd-hhmmss")}{extension}";
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
        public async Task<bool> AddStudentSeminarAsync(StudentSeminarDto studentSeminarDto)
        {
            StudentSeminar studentSeminar = new StudentSeminar
            {
                Id = studentSeminarDto.Id,
                UserId = studentSeminarDto.UserId,
                Title = studentSeminarDto.Title,
                DateAttended = studentSeminarDto.DateAttended,
                Facilitator = studentSeminarDto.Facilitator,
                Reflection = studentSeminarDto.Reflection,
                SeminarType = studentSeminarDto.SeminarType,
                CreatedDate = DateTime.Now,
                LastModifiedDate = DateTime.Now
            };

            return await _studentSeminarRepository.AddStudentSeminartAsync(studentSeminar);
        }
        public async Task<bool> UpdateStudentSeminarAsync(StudentSeminarDto studentSeminarDto) {
            StudentSeminar studentSeminar = new StudentSeminar
            {
                Id = studentSeminarDto.Id,
                UserId = studentSeminarDto.UserId,
                Title = studentSeminarDto.Title,
                DateAttended = studentSeminarDto.DateAttended,
                Facilitator = studentSeminarDto.Facilitator,
                Reflection = studentSeminarDto.Reflection,
                SeminarType = studentSeminarDto.SeminarType,
                LastModifiedDate = DateTime.Now
            };

            return await _studentSeminarRepository.UpdateStudentSeminarAsync(studentSeminar);
        }

        public async Task<bool> DeleteStudentSeminarAsync(int semindarId)
        {            
            return await _studentSeminarRepository.DeleteStudentSeminarAsync(semindarId);
        }
        public async Task<IEnumerable<StudentSeminar>> GetStudentSeminarByUserIdAsync(int userId) {
            var getStudentSeminars = await _studentSeminarRepository.GetStudentSeminarByStudentIdAsync(userId);
            List<StudentSeminarDto> studentSeminarsDto = new List<StudentSeminarDto>();
            foreach (var seminar in getStudentSeminars)
            {
                StudentSeminarDto studentSeminarDto = new StudentSeminarDto
                {
                    Id = seminar.Id,
                    UserId = seminar.UserId,
                    Title = seminar.Title,
                    DateAttended = seminar.DateAttended,
                    Facilitator = seminar.Facilitator,
                    Reflection = seminar.Reflection,
                    SeminarType = seminar.SeminarType,
                    SeminarId = seminar.Id
                };
                studentSeminarsDto.Add(studentSeminarDto);
            }
            return getStudentSeminars;            
        }
        //Skill
        public async Task<IEnumerable<StudentSkillDto>> GetStudentSkillsByUserIdAsync(int userId) {
            var getStudentSkills = await _studentSkillRepository.GetStudentSkillsByStudentIdAsync(userId);
            List<StudentSkillDto> studentSkillsDto = new List<StudentSkillDto>();
            foreach (var skill in getStudentSkills) {
                StudentSkillDto studentSkillDto = new StudentSkillDto
                {
                    Id = skill.Id,
                    UserId = skill.UserId,
                    SkillName = skill.SkillName,
                    SkillRating = skill.SkillRating,
                };
                studentSkillsDto.Add(studentSkillDto);
            }
            return studentSkillsDto;
        }        
        public async Task<bool> AddStudentSkillAsync(StudentSkillDto studentSkillDto) {
            StudentSkill studentSkill = new StudentSkill
            {
                Id = studentSkillDto.Id,
                UserId = studentSkillDto.UserId,
                SkillName = studentSkillDto.SkillName,
                SkillRating = studentSkillDto.SkillRating,
                CreatedDate = DateTime.Now
            };

            return await _studentSkillRepository.AddStudentSkillAsync(studentSkill);
        }
        public async Task<bool> DeleteStudentSkillAsync(int id) {            
            return await _studentSkillRepository.DeleteStudentSkillAsync(id);
        }

        //Subject Taken
        public async Task<IEnumerable<StudentSubjectTakenDto>> GetStudentSubjectsTakenByUserId(int userId) {
            List<StudentSubjectTaken> fetchSubjectsTaken = await _studentSubjectTakenRepository.GetStudentSubjetsTakenByUser(userId);
            List<Subject> fetchSubjects = await _subjectRepository.GetSubjectsAsync();
            List<StudentSubjectTakenDto> subjectsTakenDto = new List<StudentSubjectTakenDto>();
            foreach (var subjectTaken in fetchSubjectsTaken)
            {
                var getSubject = fetchSubjects.Where(x => x.Id == subjectTaken.SubjectId).First();
                StudentSubjectTakenDto studentSubjectTakenDto = new StudentSubjectTakenDto
                {
                    Id = subjectTaken.Id,
                    SubjectId = subjectTaken.SubjectId,
                    UserId = subjectTaken.UserId,
                    SubjectName = getSubject.SubjectName,
                    SubjectDescription = getSubject.SubjectDescription,
                    SubjectStatus = subjectTaken.SubjectStatus,
                    Prereq = getSubject.Prereq,
                    Lec = getSubject.Lec,
                    Lab = getSubject.Lab,
                    Units = getSubject.Units,
                    Hrs = getSubject.Hrs,
                };
                subjectsTakenDto.Add(studentSubjectTakenDto);
            }

            return subjectsTakenDto;
        }
        public async Task<PagedResultDto> GetStudentSubjetsTakenByUser(PaginationParamsDto paginationParamsDto ,int userId)
        {
            List<StudentSubjectTaken> fetchSubjectsTaken = await _studentSubjectTakenRepository.GetStudentSubjetsTakenByUser(userId);
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
                    SubjectStatus = subjectTaken.SubjectStatus,
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
                UserId = studentSubjectTakenDto.UserId,
                SubjectId = studentSubjectTakenDto.SubjectId, 
                SubjectStatus = studentSubjectTakenDto.SubjectStatus,
                CreatedDate = DateTime.Now,
                LastModifiedDate = DateTime.Now,            
            };
            return await _studentSubjectTakenRepository.AddStudentSubjetTakenAsync(studentSubjectTaken);
        }

        public async Task<bool> UpdateStudentSubjetTakenAsync(StudentSubjectTakenDto studentSubjectTakenDto)
        {
            StudentSubjectTaken studentSubjectTaken = new StudentSubjectTaken
            {
                Id = studentSubjectTakenDto.Id,
                UserId = studentSubjectTakenDto.UserId,
                SubjectId = studentSubjectTakenDto.SubjectId,
                SubjectStatus = studentSubjectTakenDto.SubjectStatus,                
                LastModifiedDate = DateTime.Now,
            };
            return await _studentSubjectTakenRepository.UpdateStudentSubjetTakenAsync(studentSubjectTaken);
        }
        public async Task<bool> DeleteStudentSubjetTakenAsync(int id) {            
            return await _studentSubjectTakenRepository.DeleteStudentSubjetTakenAsync(id);
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
                var newFileName = $"{fileName}_{DateTime.Now.ToString("yyyyMMdd-hhmmss")}{extension}";
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
                var newFileName = $"{fileName}_{DateTime.Now.ToString("yyyyMMdd-hhmmss")}{extension}";
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
                var newFileName = $"{fileName}_{DateTime.Now.ToString("yyyyMMdd-hhmmss")}{extension}";
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
                var newFileName = $"{fileName}_{DateTime.Now.ToString("yyyyMMdd-hhmmss")}{extension}";
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

        public async Task<IEnumerable<StudentCertAndRecog>> GetCertificatesAsync(int userId)
        {
            try
            {
                return await _studentCertifAndRecogRepository.GetCertificatesAsync(userId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<bool> AddCertificateAsync(StudentCertAndRecogDto studentCertAndRecogDto)
        {
            bool ret = false;
            try
            {
                StudentCertAndRecog newStudentCertAndRecog = new StudentCertAndRecog
                {
                    UserId = studentCertAndRecogDto.UserId,
                    Name = studentCertAndRecogDto.Name,
                    CertRecogType = studentCertAndRecogDto.CertRecogType,
                    LastModifiedDate = DateTime.Now,
                };

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

                if (studentCertAndRecogDto.AttachmentFile != null)
                {
                    var fileName = Path.GetFileNameWithoutExtension(studentCertAndRecogDto.AttachmentFile.FileName);
                    var extension = Path.GetExtension(studentCertAndRecogDto.AttachmentFile.FileName);
                    var newFileName = $"{fileName}_{DateTime.Now.ToString("yyyyMMdd-hhmmss")}{extension}";
                    var fullFileName = Path.Combine(uploadsDirectory, newFileName);
                    var attachedPath = Path.Combine(uploadsFolderName, newFileName);
                    using (var stream = new FileStream(fullFileName, FileMode.Create))
                    {
                        await studentCertAndRecogDto.AttachmentFile.CopyToAsync(stream);
                    }
                    newStudentCertAndRecog.Attachment = attachedPath;
                }

                ret = await _studentCertifAndRecogRepository.AddCertificateAsync(newStudentCertAndRecog);

                return ret;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<bool> UpdateCertificateAsync(StudentCertAndRecogDto studentCertAndRecogDto)
        {
            bool ret = false;
            try
            {
                StudentCertAndRecog upStudentCertAndRecog = new StudentCertAndRecog
                {
                    Id = studentCertAndRecogDto.Id,
                    UserId = studentCertAndRecogDto.UserId,
                    Name = studentCertAndRecogDto.Name,
                    CertRecogType = studentCertAndRecogDto.CertRecogType,
                    LastModifiedDate = DateTime.Now,
                };

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

                if (studentCertAndRecogDto.AttachmentFile != null)
                {
                    var fileName = Path.GetFileNameWithoutExtension(studentCertAndRecogDto.AttachmentFile.FileName);
                    var extension = Path.GetExtension(studentCertAndRecogDto.AttachmentFile.FileName);
                    var newFileName = $"{fileName}_{DateTime.Now.ToString("yyyyMMdd-hhmmss")}{extension}";
                    var fullFileName = Path.Combine(uploadsDirectory, newFileName);
                    var attachedPath = Path.Combine(uploadsFolderName, newFileName);
                    using (var stream = new FileStream(fullFileName, FileMode.Create))
                    {
                        await studentCertAndRecogDto.AttachmentFile.CopyToAsync(stream);
                    }
                    upStudentCertAndRecog.Attachment = attachedPath;
                }

                ret = await _studentCertifAndRecogRepository.UpdateCertificateAsync(upStudentCertAndRecog);

                return ret;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<bool> DeleteCertificateAsync(int id)
        {
            bool ret = false;
            try
            {

                ret = await _studentCertifAndRecogRepository.DeleteCertificateAsync(id);

                return ret;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<IEnumerable<StudentCertAndRecog>> GetRecognitionsAsync(int userId)
        {
            try
            {
                return await _studentCertifAndRecogRepository.GetRecognitionsAsync(userId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<bool> AddRecognitionAsync(StudentCertAndRecogDto studentCertAndRecogDto)
        {
            bool ret = false;
            try
            {
                StudentCertAndRecog upStudentCertAndRecog = new StudentCertAndRecog
                {
                    Id = studentCertAndRecogDto.Id,
                    UserId = studentCertAndRecogDto.UserId,
                    Name = studentCertAndRecogDto.Name,
                    CertRecogType = studentCertAndRecogDto.CertRecogType,
                    LastModifiedDate = DateTime.Now,
                };

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

                if (studentCertAndRecogDto.AttachmentFile != null)
                {
                    var fileName = Path.GetFileNameWithoutExtension(studentCertAndRecogDto.AttachmentFile.FileName);
                    var extension = Path.GetExtension(studentCertAndRecogDto.AttachmentFile.FileName);
                    var newFileName = $"{fileName}_{DateTime.Now.ToString("yyyyMMdd-hhmmss")}{extension}";
                    var fullFileName = Path.Combine(uploadsDirectory, newFileName);
                    var attachedPath = Path.Combine(uploadsFolderName, newFileName);
                    using (var stream = new FileStream(fullFileName, FileMode.Create))
                    {
                        await studentCertAndRecogDto.AttachmentFile.CopyToAsync(stream);
                    }
                    upStudentCertAndRecog.Attachment = attachedPath;
                }

                ret = await _studentCertifAndRecogRepository.AddRecognitionAsync(upStudentCertAndRecog);

                return ret;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        public async Task<bool> UpdateRecognitionAsync(StudentCertAndRecogDto studentCertAndRecogDto)
        {
            bool ret = false;
            try
            {
                StudentCertAndRecog upStudentCertAndRecog = new StudentCertAndRecog
                {
                    Id = studentCertAndRecogDto.Id,
                    UserId = studentCertAndRecogDto.UserId,
                    Name = studentCertAndRecogDto.Name,
                    CertRecogType = studentCertAndRecogDto.CertRecogType,
                    LastModifiedDate = DateTime.Now,
                };

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

                if (studentCertAndRecogDto.AttachmentFile != null)
                {
                    var fileName = Path.GetFileNameWithoutExtension(studentCertAndRecogDto.AttachmentFile.FileName);
                    var extension = Path.GetExtension(studentCertAndRecogDto.AttachmentFile.FileName);
                    var newFileName = $"{fileName}_{DateTime.Now.ToString("yyyyMMdd-hhmmss")}{extension}";
                    var fullFileName = Path.Combine(uploadsDirectory, newFileName);
                    var attachedPath = Path.Combine(uploadsFolderName, newFileName);
                    using (var stream = new FileStream(fullFileName, FileMode.Create))
                    {
                        await studentCertAndRecogDto.AttachmentFile.CopyToAsync(stream);
                    }
                    upStudentCertAndRecog.Attachment = attachedPath;
                }

                ret = await _studentCertifAndRecogRepository.UpdateRecognitionAsync(upStudentCertAndRecog);

                return ret;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<bool> DeleteRecognitionAsync(int id)
        {
            bool ret = false;
            try
            {
                ret = await _studentCertifAndRecogRepository.DeleteRecognitionAsync(id);

                return ret;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
