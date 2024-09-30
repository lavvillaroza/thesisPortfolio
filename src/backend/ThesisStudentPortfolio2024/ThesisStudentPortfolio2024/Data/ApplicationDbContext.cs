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
        public DbSet<StudentInformationDetail> StudentInformationDetails { get; set; }
        public DbSet<StudentSkill> StudentSkills { get; set;}
        public DbSet<StudentCertAndRecog> StudentCertificationsAndRecognitions { get; set;}
        public DbSet<StudentSeminar> StudentSeminars { get; set; }
        public DbSet<StudentSubjectTaken> StudentSubjectsTaken { get; set;}
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<AnnouncementAttendee> AnnouncementAttendees { get; set; }
        public DbSet<AnnouncementDetail> AnnouncementDetails { get; set; }
        public DbSet<Skill> Skills { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Announcement>()
                .HasMany(a => a.AnnouncementAttendees)
                .WithOne(aa => aa.Announcement)
                .HasForeignKey(aa => aa.AnnouncementId);

            modelBuilder.Entity<Announcement>()
                .HasMany(a => a.AnnouncementDetail)
                .WithOne(aa => aa.Announcement)
                .HasForeignKey(aa => aa.AnnouncementId);

            // Configure relationships between Subject and StudentSubjectTaken
            modelBuilder.Entity<StudentSubjectTaken>()
                .HasOne(a => a.Subject)              // One StudentSubjectTaken has one Subject
                .WithMany()                          // One Subject can have many StudentSubjectTaken
                .HasForeignKey(s => s.SubjectId)     // Foreign key on StudentSubjectTaken is SubjectId
                .OnDelete(DeleteBehavior.Restrict);  // Handle delete behavior (Restrict, Cascade, etc.)

            modelBuilder.Entity<StudentUser>()
                .HasOne(a => a.StudentDetail)
                .WithOne(b => b.StudentUser)                
                .HasForeignKey<StudentDetail>(b => b.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
