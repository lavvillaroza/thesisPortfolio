
using Microsoft.EntityFrameworkCore;
using Serilog;
using System;
using ThesisStudentPortfolio2024.Data;
using ThesisStudentPortfolio2024.Models.Dtos;
using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{
    public class AnnouncementRepository : IAnnouncementRepository
    {
        private readonly ApplicationDbContext _context;        
        public AnnouncementRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        async Task<IEnumerable<Announcement>> IAnnouncementRepository.GetAnnouncementsByDateAsync(DateTime dateTime)
        {                        
            var announcements = await _context.Announcements
                                    .Where(a => a.DateAnnounced.Date == dateTime.Date && a.Delete == 0)
                                    .ToListAsync();
            return announcements;

        }

        async Task<IEnumerable<Announcement>> IAnnouncementRepository.GetSeminarsByYearAsync(int year)
        {
            var announcements = await _context.Announcements
                                    .Where(a => a.DateAnnounced.Year == year && a.AnnouncementType == 1  && a.Delete == 0)
                                    .ToListAsync();
            return announcements;

        }

        async Task<IEnumerable<Announcement>> IAnnouncementRepository.GetSeminarsBySearchAsync(string search)
        {
            var announcements = await _context.Announcements
                                    .Where(a => EF.Functions.Like(a.Title, $"%{search}%") && a.AnnouncementType == 1 && a.Delete == 0)
                                    .ToListAsync();
            return announcements;
        }

        async Task<IEnumerable<AnnouncementAttendee>> IAnnouncementRepository.GetSeminarAttendeesAsync(int announcementId)
        {
            var AnnouncementAttendees = await _context.AnnouncementAttendees
                                        .Where(aa => aa.AnnouncementId == announcementId)
                                        .ToListAsync();
            return AnnouncementAttendees;
        }

        async Task<IEnumerable<AnnouncementAttendee>> IAnnouncementRepository.GetSeminarAttendeesAsync(int announcementId, int userId)
        {
            var AnnouncementAttendees = await _context.AnnouncementAttendees
                                        .Where(aa => aa.AnnouncementId == announcementId && aa.StudentUserId == userId)
                                        .ToListAsync();
            return AnnouncementAttendees;
        }

        async Task<IEnumerable<AnnouncementDetail>> IAnnouncementRepository.GetAnnouncementDetailsAsync(int announcementId)
        {
            var announcementDetails = await _context.AnnouncementDetails
                                    .Where(aa => aa.AnnouncementId == announcementId)
                                    .ToListAsync();
            return announcementDetails;
        }

        async Task<bool> IAnnouncementRepository.AddAnnouncementAsync(Announcement announcement, List<AnnouncementDetail> announcementsDetail)
        {
            bool ret = false;
            try
            {
                await _context.Announcements.AddAsync(announcement);
                await _context.SaveChangesAsync();
                foreach (AnnouncementDetail dtl in announcementsDetail) {
                    dtl.AnnouncementId = announcement.Id;
                    await _context.AnnouncementDetails.AddAsync(dtl);
                }                
               await _context.SaveChangesAsync();
               ret = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
            return ret;
        }
        async Task<bool> IAnnouncementRepository.UpdateAnnouncementAsync(Announcement announcement)
        {
            var existingAnnouncement = await _context.Announcements.FindAsync(announcement.Id);

            if (existingAnnouncement == null)
            {
                // Announcement not found
                return false;
            }

            // Update fields (you can add any other fields you want to update)
            existingAnnouncement.Title = announcement.Title;
            existingAnnouncement.Description = announcement.Description;
            existingAnnouncement.DateAnnounced = announcement.DateAnnounced;
            existingAnnouncement.AnnouncementType = announcement.AnnouncementType;
            existingAnnouncement.LastModifiedBy = announcement.LastModifiedBy;
            existingAnnouncement.LastModifiedDate = announcement.LastModifiedDate;

            // Save changes to the database
            await _context.SaveChangesAsync();

            return true;
        }
        async Task<bool> IAnnouncementRepository.DeleteAnnouncementAsync(Announcement announcement) {
            bool ret = false;
            try
            {
                var existingAnnouncement = await _context.Announcements.FindAsync(announcement.Id);
                if (existingAnnouncement == null)
                {
                    // Announcement not found
                    return ret;
                }
                existingAnnouncement.Delete = 1;                
                await _context.SaveChangesAsync();
                ret = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
            return ret;
        }
        async Task<bool> IAnnouncementRepository.AddAnnouncementAttendeeAsync(AnnouncementAttendee announcementAttendee)
        {
            bool ret = false;
            try
            {
                await _context.AnnouncementAttendees.AddAsync(announcementAttendee);
                await _context.SaveChangesAsync();
                ret = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
            return ret;
        }        
        async Task<bool> IAnnouncementRepository.UpdateAnnouncementAttendeeAsync(AnnouncementAttendee announcementAttendee)
        {
            var eAnnouncementAttendee = await _context.AnnouncementAttendees.FindAsync(announcementAttendee.Id);

            if (eAnnouncementAttendee == null)
            {
                // Announcement not found
                return false;
            }
            // Update fields (you can add any other fields you want to update)
            eAnnouncementAttendee.StudentAttendanceStatus = announcementAttendee.StudentAttendanceStatus;
            eAnnouncementAttendee.LastModifiedBy = announcementAttendee.LastModifiedBy;
            eAnnouncementAttendee.LastModifiedDate = announcementAttendee.LastModifiedDate;

            // Save changes to the database
            await _context.SaveChangesAsync();

            return true;
        }       
        async Task<bool> IAnnouncementRepository.AddAnnouncementDetailAsync(AnnouncementDetail announcementDetail)
        {
            bool ret = false;
            try
            {
                await _context.AnnouncementDetails.AddAsync(announcementDetail);
                await _context.SaveChangesAsync();
                ret = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
            return ret;
        }

        async Task<IEnumerable<Announcement>> IAnnouncementRepository.GetSeminarsByAttendeesAsync(int userId)
        {
            var seminarsAttended = await _context.AnnouncementAttendees
                                        .Where(aa => aa.StudentUserId == userId)
                                        .Select(aa => aa.Id)
                                        .ToListAsync();

            var seminar = await _context.Announcements.Where(a => seminarsAttended.Contains(a.Id)).ToListAsync();

            return seminar;
        }
    }
}
