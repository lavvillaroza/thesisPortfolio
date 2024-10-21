﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ThesisStudentPortfolio2024.Data;

#nullable disable

namespace ThesisStudentPortfolio2024.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20241021132459_FixingFKAllTables")]
    partial class FixingFKAllTables
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.AdminUser", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Deleted")
                        .IsRequired()
                        .HasColumnType("varchar(1)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("LastModifiedBy")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("LastModifiedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("MiddleName")
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Position")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Version")
                        .HasColumnType("int");

                    b.HasKey("UserId");

                    b.ToTable("AdminUsers");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.Announcement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<short>("AnnouncementType")
                        .HasColumnType("smallint");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("DateTimeFrom")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("DateTimeTo")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("LastModifiedBy")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("LastModifiedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Announcements");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.AnnouncementAttendee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AnnouncementId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("LastModifiedBy")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("LastModifiedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<short>("StudentAttendanceStatus")
                        .HasColumnType("smallint");

                    b.Property<int>("StudentUserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AnnouncementId");

                    b.ToTable("AnnouncementAttendees");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.AnnouncementDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AnnouncementId")
                        .HasColumnType("int");

                    b.Property<string>("AttachedImage")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("AttachedPath")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("AnnouncementId");

                    b.ToTable("AnnouncementDetails");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.Course", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CourseCode")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("CourseName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedBy")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("LastModifiedBy")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("LastModifiedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("TotalUnitsRequired")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Courses");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.Skill", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Deleted")
                        .IsRequired()
                        .HasColumnType("varchar(1)");

                    b.Property<string>("SkillName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Skills");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.StudentCertAndRecog", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<short>("CertRecogType")
                        .HasColumnType("smallint");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("LastModifiedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("StudentCertificationsAndRecognitions");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.StudentDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Course")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("LastModifiedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("MiddleName")
                        .HasColumnType("longtext");

                    b.Property<string>("PersonalEmail")
                        .HasColumnType("longtext");

                    b.Property<string>("PortfolioUrl")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ProfilePicture")
                        .HasColumnType("longtext");

                    b.Property<string>("SchoolEmail")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Section")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("StudentId")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("YearLevel")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("StudentDetails");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.StudentInformation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("AboutMe")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("LastModifiedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("StudentInformations");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.StudentInformationDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CoverPhoto")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("StudentInformationId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("StudentInformationId");

                    b.ToTable("StudentInformationDetails");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.StudentSeminar", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("DateAttendedFrom")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("DateAttendedTo")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Deleted")
                        .IsRequired()
                        .HasColumnType("varchar(1)");

                    b.Property<string>("Facilitator")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("LastModifiedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Reflection")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<short>("SeminarType")
                        .HasColumnType("smallint");

                    b.Property<DateTime>("TimeAttended")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("StudentSeminars");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.StudentSkill", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Deleted")
                        .IsRequired()
                        .HasColumnType("varchar(1)");

                    b.Property<int>("SkillId")
                        .HasColumnType("int");

                    b.Property<short>("SkillRating")
                        .HasColumnType("smallint");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SkillId");

                    b.HasIndex("UserId");

                    b.ToTable("StudentSkills");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.StudentSubjectTaken", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Deleted")
                        .IsRequired()
                        .HasColumnType("varchar(1)");

                    b.Property<DateTime>("LastModifiedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("SubjectId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SubjectId");

                    b.HasIndex("UserId");

                    b.ToTable("StudentSubjectsTaken");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.StudentUser", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Deleted")
                        .IsRequired()
                        .HasColumnType("varchar(1)");

                    b.Property<string>("LastModifiedBy")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("LastModifiedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Version")
                        .HasColumnType("int");

                    b.HasKey("UserId");

                    b.ToTable("StudentUsers");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.Subject", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<short>("Hrs")
                        .HasColumnType("smallint");

                    b.Property<short>("Lab")
                        .HasColumnType("smallint");

                    b.Property<string>("LastModifiedBy")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("LastModifiedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<short>("Lec")
                        .HasColumnType("smallint");

                    b.Property<string>("Prereq")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("SubjectDescription")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("SubjectName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<short>("Term")
                        .HasColumnType("smallint");

                    b.Property<short>("Units")
                        .HasColumnType("smallint");

                    b.Property<short>("Year")
                        .HasColumnType("smallint");

                    b.HasKey("Id");

                    b.ToTable("Subjects");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.AnnouncementAttendee", b =>
                {
                    b.HasOne("ThesisStudentPortfolio2024.Models.Entities.Announcement", "Announcement")
                        .WithMany("AnnouncementAttendees")
                        .HasForeignKey("AnnouncementId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Announcement");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.AnnouncementDetail", b =>
                {
                    b.HasOne("ThesisStudentPortfolio2024.Models.Entities.Announcement", "Announcement")
                        .WithMany("AnnouncementDetails")
                        .HasForeignKey("AnnouncementId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Announcement");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.StudentCertAndRecog", b =>
                {
                    b.HasOne("ThesisStudentPortfolio2024.Models.Entities.StudentUser", "StudentUser")
                        .WithMany("StudentCertAndRecogs")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("StudentUser");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.StudentDetail", b =>
                {
                    b.HasOne("ThesisStudentPortfolio2024.Models.Entities.StudentUser", "StudentUser")
                        .WithOne("StudentDetail")
                        .HasForeignKey("ThesisStudentPortfolio2024.Models.Entities.StudentDetail", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("StudentUser");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.StudentInformation", b =>
                {
                    b.HasOne("ThesisStudentPortfolio2024.Models.Entities.StudentUser", "StudentUser")
                        .WithOne("StudentInformation")
                        .HasForeignKey("ThesisStudentPortfolio2024.Models.Entities.StudentInformation", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("StudentUser");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.StudentInformationDetail", b =>
                {
                    b.HasOne("ThesisStudentPortfolio2024.Models.Entities.StudentInformation", "StudentInformation")
                        .WithMany("StudentInformationDetails")
                        .HasForeignKey("StudentInformationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("StudentInformation");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.StudentSeminar", b =>
                {
                    b.HasOne("ThesisStudentPortfolio2024.Models.Entities.StudentUser", "StudentUser")
                        .WithMany("StudentSeminars")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("StudentUser");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.StudentSkill", b =>
                {
                    b.HasOne("ThesisStudentPortfolio2024.Models.Entities.Skill", "Skill")
                        .WithMany("StudentSkills")
                        .HasForeignKey("SkillId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ThesisStudentPortfolio2024.Models.Entities.StudentUser", "StudentUser")
                        .WithMany("StudentSkills")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Skill");

                    b.Navigation("StudentUser");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.StudentSubjectTaken", b =>
                {
                    b.HasOne("ThesisStudentPortfolio2024.Models.Entities.Subject", "Subject")
                        .WithMany("StudentSubjectTakens")
                        .HasForeignKey("SubjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ThesisStudentPortfolio2024.Models.Entities.StudentUser", "StudentUser")
                        .WithMany("StudentSubjectTakens")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("StudentUser");

                    b.Navigation("Subject");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.Announcement", b =>
                {
                    b.Navigation("AnnouncementAttendees");

                    b.Navigation("AnnouncementDetails");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.Skill", b =>
                {
                    b.Navigation("StudentSkills");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.StudentInformation", b =>
                {
                    b.Navigation("StudentInformationDetails");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.StudentUser", b =>
                {
                    b.Navigation("StudentCertAndRecogs");

                    b.Navigation("StudentDetail")
                        .IsRequired();

                    b.Navigation("StudentInformation")
                        .IsRequired();

                    b.Navigation("StudentSeminars");

                    b.Navigation("StudentSkills");

                    b.Navigation("StudentSubjectTakens");
                });

            modelBuilder.Entity("ThesisStudentPortfolio2024.Models.Entities.Subject", b =>
                {
                    b.Navigation("StudentSubjectTakens");
                });
#pragma warning restore 612, 618
        }
    }
}
