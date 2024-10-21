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
        public DbSet<StudentCertAndRecog> StudentCertifsAndRecogs { get; set;}
        public DbSet<StudentSeminar> StudentSeminars { get; set; }
        public DbSet<StudentSubjectTaken> StudentSubjectsTaken { get; set;}
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<AnnouncementAttendee> AnnouncementAttendees { get; set; }
        public DbSet<AnnouncementDetail> AnnouncementDetails { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<Course> Courses { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Announcement>()
                .HasMany(a => a.AnnouncementAttendees)
                .WithOne(aa => aa.Announcement)
                .HasForeignKey(aa => aa.AnnouncementId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Announcement>()
                .HasMany(a => a.AnnouncementDetails)
                .WithOne(ad => ad.Announcement)
                .HasForeignKey(ad => ad.AnnouncementId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<StudentUser>()
               .HasOne(su => su.StudentDetail)
               .WithOne(sd => sd.StudentUser)
               .HasForeignKey<StudentDetail>(sd => sd.UserId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<StudentUser>()
               .HasOne(su => su.StudentInformation)
               .WithOne(si => si.StudentUser)
               .HasForeignKey<StudentInformation>(si => si.UserId)
               .OnDelete(DeleteBehavior.Cascade);
            
            modelBuilder.Entity<StudentUser>()
                .HasMany(su => su.StudentSeminars)
                .WithOne(ss => ss.StudentUser)
                .HasForeignKey(ss => ss.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<StudentUser>()
                .HasMany(su => su.StudentSkills)
                .WithOne(ss => ss.StudentUser)
                .HasForeignKey(ss => ss.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<StudentUser>()
                .HasMany(su => su.StudentSubjectTakens)
                .WithOne(ss => ss.StudentUser)
                .HasForeignKey(ss => ss.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<StudentUser>()
                .HasMany(scr => scr.StudentCertAndRecogs)
                .WithOne(ss => ss.StudentUser)
                .HasForeignKey(ss => ss.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<StudentInformation>()
                .HasMany(si => si.StudentInformationDetails)
                .WithOne(sid => sid.StudentInformation)
                .HasForeignKey(sid => sid.StudentInformationId)
                .OnDelete(DeleteBehavior.Cascade);
            
            modelBuilder.Entity<StudentSubjectTaken>()
                .HasOne(ss => ss.Subject)              
                .WithMany(s => s.StudentSubjectTakens)                          
                .HasForeignKey(s => s.SubjectId)     
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<StudentSkill>()
                .HasOne(s => s.Skill)
                .WithMany(ss => ss.StudentSkills)
                .HasForeignKey(ss => ss.SkillId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
