﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ThesisStudentPortfolio2024.Models.Dtos;
using ThesisStudentPortfolio2024.Models.Entities;
using ThesisStudentPortfolio2024.Services;

namespace ThesisStudentPortfolio2024.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnnouncementController : ControllerBase
    {
        private readonly AnnouncementService _announcementService;
        public AnnouncementController(AnnouncementService announcementService)
        {
            _announcementService = announcementService;
        }
        
        [Authorize]
        [HttpGet("bydate")]
        public async Task<IActionResult> GetAnnouncementsAsync([FromQuery] PaginationParamsDto paginationParamsDto, [FromQuery] DateTime currentDate)
        {
            var pagedResult = await _announcementService.GetAnnouncementsWithDetailsAsync(paginationParamsDto, currentDate);

            return Ok(pagedResult);
        }

        [Authorize]
        [HttpGet("seminars/byyear")]
        public async Task<IActionResult> GetSeminarsByYearAsync([FromQuery] PaginationParamsDto paginationParamsDto, [FromQuery] int selectedYear)
        {
            var pagedResult = await _announcementService.GetSeminarsAsync(paginationParamsDto, selectedYear);

            return Ok(pagedResult);
        }

        [Authorize]
        [HttpGet("seminars/bysearch")]
        public async Task<IActionResult> GetSeminarsBySearchAsync([FromQuery] PaginationParamsDto paginationParamsDto, [FromQuery] string searchValue)
        {
            var pagedResult = await _announcementService.GetSeminarsBySearchAsync(paginationParamsDto, searchValue);

            return Ok(pagedResult);
        }

        [Authorize]
        [HttpGet("seminar/attendees")]
        public async Task<IActionResult> GetSeminarAttendeesAsync([FromQuery] PaginationParamsDto paginationParamsDto, [FromQuery] int announcementId)
        {
            var pagedResult = await _announcementService.GetSeminarAttendeesAsync(paginationParamsDto, announcementId);

            return Ok(pagedResult);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddAnnouncementAsync([FromForm] AnnouncementDto announcementDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var createdAnnouncement = await _announcementService.AddAnnouncementAsync(announcementDTO);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateAnnouncementAsync([FromBody] Announcement announcement)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var updatedAnnouncemnet = await _announcementService.UpdateAnnouncementAsync(announcement);

            return Ok("Success");
        }


        [Authorize]
        [HttpPost("addseminarattendee")]
        public async Task<IActionResult> AddSeminarAttendeeAsync([FromQuery] int announcementId, [FromQuery] int userId)
        {
            try
            {
                bool checkUserId = await _announcementService.CheckSeminarAttendeeAsync(announcementId, userId);
                if (!checkUserId)
                {
                    var createdAnnouncemnet = await _announcementService.AddSeminarAttendeeAsync(announcementId, userId);
                    return Ok("Success");
                }
                else {
                    return Ok("AlreadyRegistered");
                }                                
            }
            catch (Exception ex){ 
                return BadRequest(ex.Message);            
            }            
        }

        [Authorize]
        [HttpPost("adddetail")]
        public async Task<IActionResult> AddAnnouncementDetailAsync([FromBody] AnnouncementDetail announcementDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var createdAnnouncemnet = await _announcementService.AddAnnouncementDetailAsync(announcementDetail);

            return Ok("Success");
        }

        [Authorize]
        [HttpPut("updateattendee")]
        public async Task<IActionResult> UpdateAnnouncementAttendeeAsync([FromBody] AnnouncementAttendee announcementAttendee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var updatedAnnouncemnet = await _announcementService.UpdateAnnouncementAttendeeAsync(announcementAttendee);
            return Ok("Success");
        }       
    }
}
