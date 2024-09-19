using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ThesisStudentPortfolio2024.Migrations
{
    /// <inheritdoc />
    public partial class AddingStudentInformationAndStudentDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "StudentUsers");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "StudentUsers");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "StudentUsers");

            migrationBuilder.DropColumn(
                name: "MiddleName",
                table: "StudentUsers");

            migrationBuilder.DropColumn(
                name: "Position",
                table: "StudentUsers");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "StudentUsers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "StudentUsers",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "StudentUsers",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "StudentUsers",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "MiddleName",
                table: "StudentUsers",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Position",
                table: "StudentUsers",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "StudentId",
                table: "StudentUsers",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
