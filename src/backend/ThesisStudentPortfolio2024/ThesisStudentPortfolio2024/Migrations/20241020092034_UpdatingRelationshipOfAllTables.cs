using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ThesisStudentPortfolio2024.Migrations
{
    /// <inheritdoc />
    public partial class UpdatingRelationshipOfAllTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            
           
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentSkills_StudentUsers_StudentUserUserId",
                table: "StudentSkills");

            migrationBuilder.DropIndex(
                name: "IX_StudentSkills_StudentUserUserId",
                table: "StudentSkills");

            migrationBuilder.DropColumn(
                name: "StudentUserUserId",
                table: "StudentSkills");

            migrationBuilder.AddColumn<int>(
                name: "SubjectId1",
                table: "StudentSubjectsTaken",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_StudentSubjectsTaken_SubjectId1",
                table: "StudentSubjectsTaken",
                column: "SubjectId1");

            migrationBuilder.CreateIndex(
                name: "IX_StudentSkills_UserId",
                table: "StudentSkills",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentSkills_StudentUsers_UserId",
                table: "StudentSkills",
                column: "UserId",
                principalTable: "StudentUsers",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentSubjectsTaken_Subjects_SubjectId1",
                table: "StudentSubjectsTaken",
                column: "SubjectId1",
                principalTable: "Subjects",
                principalColumn: "Id");
        }
    }
}
