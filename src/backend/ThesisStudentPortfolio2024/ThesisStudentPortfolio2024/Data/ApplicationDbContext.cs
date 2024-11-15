using Microsoft.EntityFrameworkCore;
using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        { 
        
        }
        public DbSet<AdminUser> AdminUsers { get; set; }
        public DbSet<StudentUser> StudentUsers { get; set; }
        public DbSet<StudentDetail> StudentDetails { get; set; }
        public DbSet<StudentInformation> StudentInformations { get; set; }        
        public DbSet<StudentSkill> StudentSkills { get; set;}
        public DbSet<StudentCertAndRecog> StudentCertifsAndRecogs { get; set;}
        public DbSet<StudentSeminar> StudentSeminars { get; set; }
        public DbSet<StudentSubjectTaken> StudentSubjectsTaken { get; set;}
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<SubjectDetail> SubjectDetails { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<AnnouncementAttendee> AnnouncementAttendees { get; set; }
        public DbSet<AnnouncementDetail> AnnouncementDetails { get; set; }        
        public DbSet<Course> Courses { get; set; }        
    }
}
