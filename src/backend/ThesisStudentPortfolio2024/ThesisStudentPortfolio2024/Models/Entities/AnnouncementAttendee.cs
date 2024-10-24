﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class AnnouncementAttendee
    {
        [Key]
        public int Id { get; set; }        
        public short StudentAttendanceStatus { get; set; } //0 = To confirm, 1 = Registered, 2 = Absent, 3 = Attended
        public DateTime CreatedDate { get; set; }
        public required string LastModifiedBy { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public int AnnouncementId { get; set; }
        public int UserId { get; set; }
        [JsonIgnore]
        public Announcement? Announcement { get; set; }
        public StudentUser StudentUser { get; set; }
    }
}
