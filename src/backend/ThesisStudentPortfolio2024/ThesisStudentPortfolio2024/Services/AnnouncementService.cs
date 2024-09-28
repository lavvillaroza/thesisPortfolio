using ThesisStudentPortfolio2024.Models;
using ThesisStudentPortfolio2024.Models.Entities;
using ThesisStudentPortfolio2024.Repositories;

namespace ThesisStudentPortfolio2024.Services
{
    public class AnnouncementService
    {
        private readonly IAnnouncementRepository<Announcement> _announcementRepository;

        public AnnouncementService(IAnnouncementRepository<Announcement> announcementRepository)
        {
            _announcementRepository = announcementRepository;
        }
        public async Task<Announcement?> GetAnnouncementByIdAsync(int id) { 
            return await _announcementRepository.GetAnnouncementByIdAsync(id);
        }
        public async Task<bool> AddAnnouncementAsync(Announcement announcement) { 
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
