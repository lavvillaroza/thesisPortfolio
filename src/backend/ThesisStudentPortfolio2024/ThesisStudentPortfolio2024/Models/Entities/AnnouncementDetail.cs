﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ThesisStudentPortfolio2024.Models.Entities
{
    public class AnnouncementDetail
    {
        [Key]
        public int Id { get; set; }        
        public string AttachedImage { get; set; }
        public string AttachedPath { get; set; }
        public int AnnouncementId { get; set; }

        [JsonIgnore]        
        public Announcement Announcement { get; set; }
    }
}
