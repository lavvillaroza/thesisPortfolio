using ThesisStudentPortfolio2024.Models;
using ThesisStudentPortfolio2024.Models.Entities;
using ThesisStudentPortfolio2024.Repositories;
using static System.Net.Mime.MediaTypeNames;

namespace ThesisStudentPortfolio2024.Services
{
    public class AnnouncementService
    {
        private readonly IAnnouncementRepository<Announcement> _announcementRepository;
        private readonly IWebHostEnvironment _webhostEnvironment;

        public AnnouncementService(IAnnouncementRepository<Announcement> announcementRepository, IWebHostEnvironment webHostEnvironment)
        {
            _announcementRepository = announcementRepository;
            _webhostEnvironment = webHostEnvironment;
        }
        public async Task<Announcement?> GetAnnouncementByIdAsync(int id) { 
            return await _announcementRepository.GetAnnouncementByIdAsync(id);
        }
        public async Task<bool> AddAnnouncementAsync(AnnouncementDTO announcementDTO) {
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
            string uploadsDirectory = Path.Combine(contentPath, "Uploads", "Ann");

            // Check if the directory exists
            if (!Directory.Exists(uploadsDirectory))
            {
                // Create the directory if it doesn't exist
                Directory.CreateDirectory(uploadsDirectory);
            }

            // Check if images are provided
            if (announcementDTO.Images != null && announcementDTO.Images.Count > 0)
            {
                ICollection<AnnouncementDetail> announcementDetails = new List<AnnouncementDetail>();

                foreach (var image in announcementDTO.Images)
                {
                    var fileName = Path.GetFileNameWithoutExtension(image.FileName);
                    var extension = Path.GetExtension(image.FileName);
                    var newFileName = $"{fileName}_{Guid.NewGuid().ToString()}{extension}";
                    var fullFileName = Path.Combine(uploadsDirectory, newFileName);
                    var attachedPath = Path.Combine("Uploads","Ann", newFileName);

                    using (var stream = new FileStream(fullFileName, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }

                    var announcementDetail = new AnnouncementDetail
                    {
                        AttachedImage = fileName,
                        AttachedPath = attachedPath,
                        Announcement = announcement
                    };

                    announcementDetails.Add(announcementDetail);
                }

                announcement.AnnouncementDetails = announcementDetails;
            }

            return await _announcementRepository.AddAnnouncementAsync(announcement);
        }
        public async Task<bool> UpdateAnnouncementAsync(Announcement announcement) { 
            return await _announcementRepository.UpdateAnnouncementAsync(announcement);
        }
        public async Task<PagedResult<Announcement>> GetAllAnnouncementAsync(PaginationParams paginationParams) { 
            return await _announcementRepository.GetAllAnnouncementByPagedAsync(paginationParams);
        }
        public async Task<PagedResult<Announcement>> GetAnnouncementByDateAsync(PaginationParams paginationParams, DateTime dateTime) { 
            return await _announcementRepository.GetAnnouncementByDateByPagedAsync(paginationParams, dateTime);
        }

        public async Task<bool> AddAnnouncementAttendeeAsync(AnnouncementAttendee announcementAttendee) {
            return await _announcementRepository.AddAnnouncementAttendeeAsync(announcementAttendee);
        }
        public async Task<bool> AddAnnouncementDetailAsync(AnnouncementDetail announcementDetail) {
            return await _announcementRepository.AddAnnouncementDetailAsync(announcementDetail);
        }
        public async Task<bool> UpdateAnnouncementAttendeeAsync(AnnouncementAttendee announcementAttendee) {
            return await _announcementRepository.UpdateAnnouncementAttendeeAsync(announcementAttendee);
        }
        public async Task<bool> DeleteAnnouncementDetailAsync(AnnouncementDetail announcementDetail) {
            return await _announcementRepository.DeleteAnnouncementDetailAsync(announcementDetail);
        }
    }
}
