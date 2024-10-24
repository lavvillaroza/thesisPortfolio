using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ThesisStudentPortfolio2024.Migrations
{
    /// <inheritdoc />
    public partial class AddingCourseSubjects : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StudentUserId",
                table: "AnnouncementAttendees",
                newName: "UserId");

            migrationBuilder.AddColumn<int>(
                name: "YearEnd",
                table: "StudentDetails",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "YearStart",
                table: "StudentDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "CourseLogo",
                table: "Courses",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "StudentUserUserId",
                table: "AnnouncementAttendees",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "SubjectDetail",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    SubjectId = table.Column<int>(type: "int", nullable: false),
                    CourseId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubjectDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubjectDetail_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SubjectDetail_Subjects_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "Subjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_AnnouncementAttendees_StudentUserUserId",
                table: "AnnouncementAttendees",
                column: "StudentUserUserId");

            migrationBuilder.CreateIndex(
                name: "IX_SubjectDetail_CourseId",
                table: "SubjectDetail",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_SubjectDetail_SubjectId",
                table: "SubjectDetail",
                column: "SubjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_AnnouncementAttendees_StudentUsers_StudentUserUserId",
                table: "AnnouncementAttendees",
                column: "StudentUserUserId",
                principalTable: "StudentUsers",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AnnouncementAttendees_StudentUsers_StudentUserUserId",
                table: "AnnouncementAttendees");

            migrationBuilder.DropTable(
                name: "SubjectDetail");

            migrationBuilder.DropIndex(
                name: "IX_AnnouncementAttendees_StudentUserUserId",
                table: "AnnouncementAttendees");

            migrationBuilder.DropColumn(
                name: "YearEnd",
                table: "StudentDetails");

            migrationBuilder.DropColumn(
                name: "YearStart",
                table: "StudentDetails");

            migrationBuilder.DropColumn(
                name: "CourseLogo",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "StudentUserUserId",
                table: "AnnouncementAttendees");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "AnnouncementAttendees",
                newName: "StudentUserId");
        }
    }
}
