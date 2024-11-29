using Microsoft.EntityFrameworkCore;
using Microsoft.ML;
using ThesisStudentPortfolio2024.Models.Dtos;
using ThesisStudentPortfolio2024.Models.Entities;
using ThesisStudentPortfolio2024.Repositories;
using static System.Net.Mime.MediaTypeNames;

namespace ThesisStudentPortfolio2024.Services
{
    public class AnnouncementService
    {
        private readonly IAnnouncementRepository _announcementRepository;
        private readonly IWebHostEnvironment _webhostEnvironment;
        private readonly IStudentDetailRepository _studentDetailRepository;
        private readonly ICourseRepository _courseRepository;
        public AnnouncementService(IAnnouncementRepository announcementRepository, IWebHostEnvironment webHostEnvironment, IStudentDetailRepository studentDetailRepository, ICourseRepository courseRepository )
        {
            _announcementRepository = announcementRepository;
            _webhostEnvironment = webHostEnvironment;
            _studentDetailRepository = studentDetailRepository;
            _courseRepository = courseRepository;
        }  

        public async Task<bool> AddAnnouncementAsync(AnnouncementDto announcementDTO) {
            var announcement = new Announcement
            {
                Title = announcementDTO.Title,
                Description = announcementDTO.Description,
                DateTimeFrom = announcementDTO.DateTimeFrom,
                DateTimeTo = announcementDTO.DateTimeTo,
                AnnouncementType = (short)announcementDTO.AnnouncementType,
                CreatedBy = announcementDTO.CreatedBy, // Username from form data
                CreatedDate = DateTime.Now,
                LastModifiedBy = announcementDTO.CreatedBy,
                LastModifiedDate = DateTime.Now
            };

            // Ensure the Uploads directory exists
            var contentPath = _webhostEnvironment.WebRootPath;            
            string uploadsFolderName = Path.Combine("Uploads", "AnnouncementsFiles");
            string uploadsDirectory = Path.Combine(contentPath, uploadsFolderName);

            // Check if the directory exists
            if (!Directory.Exists(uploadsDirectory))
            {
                // Create the directory if it doesn't exist
                Directory.CreateDirectory(uploadsDirectory);
            }

            ICollection<AnnouncementDetail> announcementDetails = new List<AnnouncementDetail>();
            // Check if images are provided
            if (announcementDTO.Images != null && announcementDTO.Images.Count > 0)
            {               
                foreach (var image in announcementDTO.Images)
                {
                    var fileName = Path.GetFileNameWithoutExtension(image.FileName);
                    var extension = Path.GetExtension(image.FileName);
                    var newFileName = $"{fileName}_{DateTime.Now.ToString("yyyyMMdd-hhmmss")}{extension}";
                    var fullFileName = Path.Combine(uploadsDirectory, newFileName);
                    var attachedPath = Path.Combine(uploadsFolderName, newFileName);

                    using (var stream = new FileStream(fullFileName, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }

                    var announcementDetail = new AnnouncementDetail
                    {
                        AttachedImage = fileName,
                        AttachedPath = attachedPath,                        
                    };

                    announcementDetails.Add(announcementDetail);
                }                
            }

            return await _announcementRepository.AddAnnouncementAsync(announcement, announcementDetails.ToList());
        }
        public async Task<bool> UpdateAnnouncementAsync(Announcement announcement) { 
            return await _announcementRepository.UpdateAnnouncementAsync(announcement);
        }
        public async Task<PagedResultDto> GetAnnouncementsWithDetailsAsync(PaginationParamsDto paginationParamsDto, DateTime dateTime) {
            IEnumerable<Announcement> fetchAnnouncements = await _announcementRepository.GetAnnouncementsByDateAsync(dateTime);            
            PagedResultDto pagedResultDto = new PagedResultDto();
            pagedResultDto.TotalCount = fetchAnnouncements.Count();
            pagedResultDto.PageNumber = paginationParamsDto.PageNumber;
            pagedResultDto.PageSize = paginationParamsDto.PageSize;

            var announcements = fetchAnnouncements
                               .Skip(paginationParamsDto.Skip)
                               .Take(paginationParamsDto.PageSize);

            List<AnnouncementDto> announcementsDto = new List<AnnouncementDto>();
            foreach (Announcement announcement in announcements)
            {
                AnnouncementDto newAnnouncement = new AnnouncementDto
                {
                    Id = announcement.Id,
                    Title = announcement.Title,
                    Description = announcement.Description,
                    DateTimeFrom = announcement.DateTimeFrom,
                    DateTimeTo = announcement.DateTimeTo,
                    AnnouncementType = announcement.AnnouncementType,
                    CreatedBy = announcement.CreatedBy,
                    CreatedDate = announcement.CreatedDate,
                    LastModifiedBy = announcement.LastModifiedBy,
                    LastModifiedDate = announcement.LastModifiedDate,
                };                
                List<AnnouncementDetailDto> announcementDetailDtos = new List<AnnouncementDetailDto>();
                IEnumerable<AnnouncementDetail> fetchAnnouncementsDetail = await _announcementRepository.GetAnnouncementDetailsAsync(announcement.Id);
                if (fetchAnnouncementsDetail.Any()) {
                    foreach (AnnouncementDetail announcementDetail in fetchAnnouncementsDetail)
                    {
                        AnnouncementDetailDto newAnnouncementDetailDto = new AnnouncementDetailDto
                        {
                            Id = announcementDetail.Id,
                            AttachedImage = announcementDetail.AttachedImage,
                            AttachedPath = announcementDetail.AttachedPath
                        };
                        announcementDetailDtos.Add(newAnnouncementDetailDto);
                    }
                }                
                newAnnouncement.AnnouncementDetails = announcementDetailDtos;                
                announcementsDto.Add(newAnnouncement);
            }
            pagedResultDto.Items = announcementsDto.Cast<object>().ToList();
            return pagedResultDto;
        }
        public async Task<PagedResultDto> GetSeminarsAsync(PaginationParamsDto paginationParamsDto, int year)
        {
            IEnumerable<Announcement> fetchAnnouncements = await _announcementRepository.GetSeminarsByYearAsync(year);
            PagedResultDto pagedResultDto = new PagedResultDto();
            pagedResultDto.TotalCount = fetchAnnouncements.Count();
            pagedResultDto.PageNumber = paginationParamsDto.PageNumber;
            pagedResultDto.PageSize = paginationParamsDto.PageSize;

            var announcements = fetchAnnouncements
                               .Skip(paginationParamsDto.Skip)
                               .Take(paginationParamsDto.PageSize);

            List<AnnouncementDto> announcementsDto = new List<AnnouncementDto>();
            foreach (Announcement announcement in announcements)
            {
                AnnouncementDto newAnnouncement = new AnnouncementDto
                {
                    Id = announcement.Id,
                    Title = announcement.Title,
                    Description = announcement.Description,
                    DateTimeFrom = announcement.DateTimeFrom,
                    DateTimeTo = announcement.DateTimeTo,
                    AnnouncementType = announcement.AnnouncementType,
                    CreatedBy = announcement.CreatedBy,
                    CreatedDate = announcement.CreatedDate,
                    LastModifiedBy = announcement.LastModifiedBy,
                    LastModifiedDate = announcement.LastModifiedDate,
                };
                List<AnnouncementDetailDto> announcementDetailDtos = new List<AnnouncementDetailDto>();
                IEnumerable<AnnouncementDetail> fetchAnnouncementsDetail = await _announcementRepository.GetAnnouncementDetailsAsync(announcement.Id);
                if (fetchAnnouncementsDetail.Any())
                {
                    foreach (AnnouncementDetail announcementDetail in fetchAnnouncementsDetail)
                    {
                        AnnouncementDetailDto newAnnouncementDetailDto = new AnnouncementDetailDto
                        {
                            Id = announcementDetail.Id,
                            AttachedImage = announcementDetail.AttachedImage,
                            AttachedPath = announcementDetail.AttachedPath
                        };
                        announcementDetailDtos.Add(newAnnouncementDetailDto);
                    }
                }
                newAnnouncement.AnnouncementDetails = announcementDetailDtos;
                announcementsDto.Add(newAnnouncement);
            }
            pagedResultDto.Items = announcementsDto.Cast<object>().ToList();
            return pagedResultDto;
        }
        public async Task<PagedResultDto> GetSeminarsBySearchAsync(PaginationParamsDto paginationParamsDto, string searchValue)
        {
            IEnumerable<Announcement> fetchAnnouncements = await _announcementRepository.GetSeminarsBySearchAsync(searchValue);
            PagedResultDto pagedResultDto = new PagedResultDto();
            pagedResultDto.TotalCount = fetchAnnouncements.Count();
            pagedResultDto.PageNumber = paginationParamsDto.PageNumber;
            pagedResultDto.PageSize = paginationParamsDto.PageSize;

            var announcements = fetchAnnouncements
                               .Skip(paginationParamsDto.Skip)
                               .Take(paginationParamsDto.PageSize);

            List<AnnouncementDto> announcementsDto = new List<AnnouncementDto>();
            foreach (Announcement announcement in announcements)
            {
                AnnouncementDto newAnnouncement = new AnnouncementDto
                {
                    Id = announcement.Id,
                    Title = announcement.Title,
                    Description = announcement.Description,
                    DateTimeFrom = announcement.DateTimeFrom,
                    DateTimeTo = announcement.DateTimeTo,
                    AnnouncementType = announcement.AnnouncementType,
                    CreatedBy = announcement.CreatedBy,
                    CreatedDate = announcement.CreatedDate,
                    LastModifiedBy = announcement.LastModifiedBy,
                    LastModifiedDate = announcement.LastModifiedDate,
                };
                List<AnnouncementDetailDto> announcementDetailDtos = new List<AnnouncementDetailDto>();
                IEnumerable<AnnouncementDetail> fetchAnnouncementsDetail = await _announcementRepository.GetAnnouncementDetailsAsync(announcement.Id);
                if (fetchAnnouncementsDetail.Any())
                {
                    foreach (AnnouncementDetail announcementDetail in fetchAnnouncementsDetail)
                    {
                        AnnouncementDetailDto newAnnouncementDetailDto = new AnnouncementDetailDto
                        {
                            Id = announcementDetail.Id,
                            AttachedImage = announcementDetail.AttachedImage,
                            AttachedPath = announcementDetail.AttachedPath
                        };
                        announcementDetailDtos.Add(newAnnouncementDetailDto);
                    }
                }
                newAnnouncement.AnnouncementDetails = announcementDetailDtos;
                announcementsDto.Add(newAnnouncement);
            }
            pagedResultDto.Items = announcementsDto.Cast<object>().ToList();
            return pagedResultDto;
        }
        public async Task<PagedResultDto> GetSeminarAttendeesAsync(PaginationParamsDto paginationParamsDto, int announcementId) {
            IEnumerable<AnnouncementAttendee> fetchAnnouncementsAttendees = await _announcementRepository.GetSeminarAttendeesAsync(announcementId);
            IEnumerable<StudentDetail> fetchStudentsDetail = await _studentDetailRepository.GetStudentsDetailAsync();
            IEnumerable<Course> fetchCourses = await _courseRepository.GetCoursesAsync();

            PagedResultDto pagedResultDto = new PagedResultDto();
            pagedResultDto.TotalCount = fetchAnnouncementsAttendees.Count();
            pagedResultDto.PageNumber = paginationParamsDto.PageNumber;
            pagedResultDto.PageSize = paginationParamsDto.PageSize;

            var seminarattendees = fetchAnnouncementsAttendees
                            .GroupJoin(
                                fetchStudentsDetail,
                                attendee => attendee.StudentUserId,
                                userDetail => userDetail.UserId,
                                (attendeeStudent, userDetails) => new { attendeeStudent, userDetails }
                            )
                            .SelectMany(
                                sa => sa.userDetails.DefaultIfEmpty(),
                                (sa, userDetails) => new AnnouncementAttendeeDto
                                {
                                    Id = sa.attendeeStudent.Id,
                                    StudentAttendanceStatus = sa.attendeeStudent.StudentAttendanceStatus,
                                    StudentUserId = sa.attendeeStudent.StudentUserId,
                                    AnnouncementId = sa.attendeeStudent.AnnouncementId,
                                    LastModifiedBy = sa.attendeeStudent.LastModifiedBy,                                                                        
                                    StudentName = userDetails.StudentName,
                                    StudentCourse = fetchCourses.Where(x => x.Id == userDetails.CourseId).Select(x => x.CourseCode).Single(),
                                    StudentYearLevel = userDetails.YearLevel.ToString(),
                                    StudentEmail = userDetails.SchoolEmail
                                }
                            ).Skip(paginationParamsDto.Skip)
                            .Take(paginationParamsDto.PageSize).ToList();
                        
            pagedResultDto.Items = seminarattendees.Cast<object>().ToList();
            return pagedResultDto;
        }        
        public async Task<bool> AddSeminarAttendeeAsync(int announcementId, int userId) {
            var getUserDetail = await _studentDetailRepository.GetStudentDetailByUserIdAsync(userId);
            AnnouncementAttendee announcementAttendee = new AnnouncementAttendee
            {
                AnnouncementId = announcementId,
                StudentAttendanceStatus = 1,
                StudentUserId = userId,
                LastModifiedBy = getUserDetail.SchoolEmail,
                LastModifiedDate = DateTime.Now,
            };
            return await _announcementRepository.AddAnnouncementAttendeeAsync(announcementAttendee);
        }
        public async Task<bool> CheckSeminarAttendeeAsync(int announcementId, int userId)
        {
            var checkUserAttendee = await _announcementRepository.GetSeminarAttendeesAsync(announcementId, userId);

            if (checkUserAttendee.Any()) {
                return true;
            }
            return false;            
        }

        public async Task<bool> AddAnnouncementDetailAsync(AnnouncementDetail announcementDetail) {
            return await _announcementRepository.AddAnnouncementDetailAsync(announcementDetail);
        }
        public async Task<bool> UpdateAnnouncementAttendeeAsync(AnnouncementAttendeeDto announcementAttendeeDto) {

            AnnouncementAttendee announcementAttendee = new AnnouncementAttendee
            {
                Id = announcementAttendeeDto.Id,
                StudentAttendanceStatus = announcementAttendeeDto.StudentAttendanceStatus,
                StudentUserId = announcementAttendeeDto.StudentUserId,
                AnnouncementId = announcementAttendeeDto.AnnouncementId,
                LastModifiedBy = announcementAttendeeDto.LastModifiedBy,
                LastModifiedDate = DateTime.Now
            };

            return await _announcementRepository.UpdateAnnouncementAttendeeAsync(announcementAttendee);
        }

        public async Task<IEnumerable<Announcement>> GetSeminarsByAttendeesAsync(int userId)
        {           
            return await _announcementRepository.GetSeminarsByAttendeesAsync(userId);
        }
    }
}
