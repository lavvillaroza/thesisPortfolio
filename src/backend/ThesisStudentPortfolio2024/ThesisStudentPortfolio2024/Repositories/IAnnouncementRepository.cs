using ThesisStudentPortfolio2024.Models;
using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{
    public interface IAnnouncementRepository<T> where T : class
    {        
        Task<Announcement?> GetAnnouncementByIdAsync(int id);
        Task<bool> AddAnnouncementAsync(Announcement announcement);
        Task<bool> UpdateAnnouncementAsync(Announcement announcement);
        Task<PagedResult<T>> GetAllAnnouncementByPagedAsync(PaginationParams paginationParams);
        Task<PagedResult<T>> GetAnnouncementByDateByPagedAsync(PaginationParams paginationParams, DateTime dateTime);
        Task<bool> AddAnnouncementAttendeeAsync(AnnouncementAttendee announcementAttendee);
        Task<bool> AddAnnouncementDetailAsync(AnnouncementDetail announcementDetail);
        Task<bool> UpdateAnnouncementAttendeeAsync(AnnouncementAttendee announcementAttendee);
        Task<bool> DeleteAnnouncementDetailAsync(AnnouncementDetail announcementDetail);

    }
}
