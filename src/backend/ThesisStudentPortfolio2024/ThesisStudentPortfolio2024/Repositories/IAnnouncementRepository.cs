using ThesisStudentPortfolio2024.Models.Dtos;
using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{
    public interface IAnnouncementRepository
    {                                
        Task<IEnumerable<Announcement>> GetAnnouncementsByDateAsync(DateTime dateTime);
        Task<IEnumerable<Announcement>> GetSeminarsByYearAsync(int year);
        Task<IEnumerable<Announcement>> GetSeminarsBySearchAsync(string search);
        Task<IEnumerable<AnnouncementAttendee>> GetSeminarAttendeesAsync(int announcementId);
        Task<IEnumerable<AnnouncementAttendee>> GetSeminarAttendeesAsync(int announcementId, int userId);
        Task<IEnumerable<AnnouncementDetail>> GetAnnouncementDetailsAsync(int announcementId);
        Task<bool> AddAnnouncementAsync(Announcement announcement, List<AnnouncementDetail> announcementDetails);
        Task<bool> UpdateAnnouncementAsync(Announcement announcement);
        Task<bool> DeleteAnnouncementAsync(Announcement announcement);
        Task<bool> AddAnnouncementAttendeeAsync(AnnouncementAttendee announcementAttendee);        
        Task<bool> UpdateAnnouncementAttendeeAsync(AnnouncementAttendee announcementAttendee);        
        Task<bool> AddAnnouncementDetailAsync(AnnouncementDetail announcementDetail);                
    }
}
