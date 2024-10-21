using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ThesisStudentPortfolio2024.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedRelationShipsTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentSkills_StudentUsers_UserId",
                table: "StudentSkills");

            migrationBuilder.DropIndex(
                name: "IX_StudentSkills_UserId",
                table: "StudentSkills");

            migrationBuilder.AddColumn<int>(
                name: "StudentUserUserId",
                table: "StudentSkills",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_StudentSkills_StudentUserUserId",
                table: "StudentSkills",
                column: "StudentUserUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentSkills_StudentUsers_StudentUserUserId",
                table: "StudentSkills",
                column: "StudentUserUserId",
                principalTable: "StudentUsers",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
