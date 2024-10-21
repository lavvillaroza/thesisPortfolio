
using Microsoft.EntityFrameworkCore;
using Serilog;
using System;
using ThesisStudentPortfolio2024.Data;
using ThesisStudentPortfolio2024.Models;
using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{
    public class AnnouncementRepository : IAnnouncementRepository<Announcement>
    {
        private readonly ApplicationDbContext _context;        
        public AnnouncementRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        async Task<bool> IAnnouncementRepository<Announcement>.AddAnnouncementAsync(Announcement announcement)
        {
            bool ret = false;
            try
            {
                await _context.Announcements.AddAsync(announcement);
                await _context.SaveChangesAsync();
                ret = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
            return ret;
        }

        async Task<bool> IAnnouncementRepository<Announcement>.AddAnnouncementAttendeeAsync(AnnouncementAttendee announcementAttendee)
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

        async Task<bool> IAnnouncementRepository<Announcement>.AddAnnouncementDetailAsync(AnnouncementDetail announcementDetail)
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

        async Task<PagedResult<Announcement>> IAnnouncementRepository<Announcement>.GetAllAnnouncementByPagedAsync(PaginationParams paginationParams)
        {
            var query = _context.Announcements.AsQueryable();
            var totalCount = await query.CountAsync();
            var announcements = await query
                .Skip((paginationParams.PageNumber - 1) * paginationParams.PageSize)
                .Take(paginationParams.PageSize)
                .ToListAsync();
            
            return new PagedResult<Announcement>
            {
                Items = announcements,
                TotalCount = totalCount,
                PageNumber = paginationParams.PageNumber,
                PageSize = paginationParams.PageSize
            };
            
        }

        async Task<PagedResult<Announcement>> IAnnouncementRepository<Announcement>.GetAnnouncementByDateByPagedAsync(PaginationParams paginationParams, DateTime dateTime)
        {
            var query = _context.Announcements.Where(u => u.DateTimeFrom >= dateTime && u.DateTimeTo <= dateTime.AddDays(1))
                        .Include(a => a.AnnouncementDetails)
                        .AsQueryable();

            var totalCount = await query.CountAsync();
            var announcements = await query
                .Skip((paginationParams.PageNumber - 1) * paginationParams.PageSize)
                .Take(paginationParams.PageSize)
                .ToListAsync();

            //// Define the base URL (you might want to make this more dynamic)
            //var baseUrl = "https://localhost:5050/"; // Replace with your actual domain

            //// Update the AttachedPath for each AnnouncementDetail
            //foreach (var announcement in announcements)
            //{
            //    foreach (var detail in announcement.AnnouncementDetails)
            //    {
            //        // Assuming AttachedPath holds the relative path to the image
            //        detail.AttachedPath = Path.Combine(baseUrl, detail.AttachedPath);
            //    }
            //}

               return new PagedResult<Announcement>
            {
                Items = announcements,
                TotalCount = totalCount,
                PageNumber = paginationParams.PageNumber,
                PageSize = paginationParams.PageSize
            };            
        }

        async Task<Announcement?> IAnnouncementRepository<Announcement>.GetAnnouncementByIdAsync(int id)
        {
            return await _context.Announcements.SingleOrDefaultAsync(u => u.Id == id);
        }

        async Task<bool> IAnnouncementRepository<Announcement>.UpdateAnnouncementAsync(Announcement announcement)
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
            existingAnnouncement.DateTimeFrom = announcement.DateTimeFrom;
            existingAnnouncement.DateTimeTo = announcement.DateTimeTo;
            existingAnnouncement.AnnouncementType = announcement.AnnouncementType;
            existingAnnouncement.LastModifiedBy = announcement.LastModifiedBy;
            existingAnnouncement.LastModifiedDate = announcement.LastModifiedDate;

            // Save changes to the database
            await _context.SaveChangesAsync();

            return true;
        }

        async Task<bool> IAnnouncementRepository<Announcement>.UpdateAnnouncementAttendeeAsync(AnnouncementAttendee announcementAttendee)
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

        async Task<bool> IAnnouncementRepository<Announcement>.DeleteAnnouncementDetailAsync(AnnouncementDetail announcementDetail)
        {
            bool ret = false;
            try
            {
                _context.AnnouncementDetails.Remove(announcementDetail);
                await _context.SaveChangesAsync();
                ret = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
            return ret;
        }       
    }
}
