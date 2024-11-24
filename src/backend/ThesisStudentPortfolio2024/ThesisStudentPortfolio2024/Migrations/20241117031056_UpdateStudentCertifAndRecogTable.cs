using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ThesisStudentPortfolio2024.Migrations
{
    /// <inheritdoc />
    public partial class UpdateStudentCertifAndRecogTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "StudentCertifsAndRecogs",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "StudentCertifsAndRecogs",
                newName: "Attachment");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "StudentCertifsAndRecogs",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "StudentCertifsAndRecogs");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "StudentCertifsAndRecogs",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "Attachment",
                table: "StudentCertifsAndRecogs",
                newName: "Description");
        }
    }
}
