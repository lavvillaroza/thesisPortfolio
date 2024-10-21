using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ThesisStudentPortfolio2024.Migrations
{
    /// <inheritdoc />
    public partial class FixingFKAllTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {            
            
            migrationBuilder.DropColumn(
                name: "StudentDetailId",
                table: "StudentUsers");

            migrationBuilder.CreateIndex(
                name: "IX_StudentInformations_UserId",
                table: "StudentInformations",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentDetails_StudentUsers_UserId",
                table: "StudentDetails",
                column: "UserId",
                principalTable: "StudentUsers",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentSubjectsTaken_Subjects_SubjectId",
                table: "StudentSubjectsTaken",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentDetails_StudentUsers_UserId",
                table: "StudentDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentSubjectsTaken_Subjects_SubjectId",
                table: "StudentSubjectsTaken");

            migrationBuilder.DropIndex(
                name: "IX_StudentInformations_UserId",
                table: "StudentInformations");

            migrationBuilder.AddColumn<int>(
                name: "StudentDetailId",
                table: "StudentUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_StudentInformations_UserId",
                table: "StudentInformations",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentDetails_StudentUsers_UserId",
                table: "StudentDetails",
                column: "UserId",
                principalTable: "StudentUsers",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentSubjectsTaken_Subjects_SubjectId",
                table: "StudentSubjectsTaken",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
