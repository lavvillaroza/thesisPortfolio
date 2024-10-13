using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ThesisStudentPortfolio2024.Models;
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
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAnnouncementByIdAsync(int id)
        {
            var pagedResult = await _announcementService.GetAnnouncementByIdAsync(id);
            return Ok(pagedResult);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddAnnouncementAsync([FromForm] AnnouncementRequest announcementRequest)
        {
            // Log the incoming request for debugging
            Console.WriteLine($"Title: {announcementRequest.Title}");
            Console.WriteLine($"Description: {announcementRequest.Description}");
            Console.WriteLine($"DateTimeFrom: {announcementRequest.DateTimeFrom}");
            Console.WriteLine($"DateTimeTo: {announcementRequest.DateTimeTo}");
            Console.WriteLine($"AnnouncementType: {announcementRequest.AnnouncementType}");
            Console.WriteLine($"CreatedBy: {announcementRequest.CreatedBy}");
            Console.WriteLine($"Images Count: {announcementRequest.Images?.Count}");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var announcement = new Announcement
            {
                Title = announcementRequest.Title,
                Description = announcementRequest.Description,
                DateTimeFrom = announcementRequest.DateTimeFrom,
                DateTimeTo = announcementRequest.DateTimeTo,
                AnnouncementType = (short) announcementRequest.AnnouncementType,
                CreatedBy = announcementRequest.CreatedBy, // Username from form data
                CreatedDate = DateTime.Now,
                LastModifiedBy = announcementRequest.CreatedBy,
                LastModifiedDate = DateTime.Now
            };

            // Check if images are provided
            if (announcementRequest.Images != null && announcementRequest.Images.Count > 0)
            {
                ICollection<AnnouncementDetail> announcementDetails = new List<AnnouncementDetail>();

                foreach (var image in announcementRequest.Images)
                {
                    var fileName = Path.GetFileNameWithoutExtension(image.FileName);
                    var extension = Path.GetExtension(image.FileName);
                    var filePath = Path.Combine("Uploads", $"{fileName}_{Guid.NewGuid()}{extension}");

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }

                    var announcementDetail = new AnnouncementDetail
                    {
                        AttachedImage = fileName,
                        AttachedPath = filePath,
                        Announcement = announcement
                    };

                    announcementDetails.Add(announcementDetail);
                }

                announcement.AnnouncementDetail = announcementDetails;
            }

            var createdAnnouncement = await _announcementService.AddAnnouncementAsync(announcement);
            return Ok("Success");
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
        [HttpGet]
        public async Task<IActionResult> GetAnnouncementsAsync([FromQuery] PaginationParams paginationParams)
        {
            var pagedResult = await _announcementService.GetAllAnnouncementAsync(paginationParams);
            return Ok(pagedResult);
        }

        [Authorize]
        [HttpGet("ByDate/{currentDate}")]
        public async Task<IActionResult> GetAnnouncementsByDateAsync([FromQuery] PaginationParams paginationParams, DateTime currentDate)
        {
            var pagedResult = await _announcementService.GetAnnouncementByDateAsync(paginationParams, currentDate);
            return Ok(pagedResult);
        }

        [Authorize]
        [HttpPost("AddAttendee")]
        public async Task<IActionResult> AddAnnouncementAttendeeAsync([FromBody] AnnouncementAttendee announcementAttendee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var createdAnnouncemnet = await _announcementService.AddAnnouncementAttendeeAsync(announcementAttendee);

            return Ok("Success");
        }

        [Authorize]
        [HttpPost("AddDetail")]
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
        [HttpPut("UpdateAttendee")]
        public async Task<IActionResult> UpdateAnnouncementAttendeeAsync([FromBody] AnnouncementAttendee announcementAttendee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var updatedAnnouncemnet = await _announcementService.UpdateAnnouncementAttendeeAsync(announcementAttendee);

            return Ok("Success");
        }

        [Authorize]
        [HttpPut("DeleteDetail")]
        public async Task<IActionResult> DeleteAnnouncementDetailAsync([FromBody] AnnouncementDetail announcementDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var updatedAnnouncemnet = await _announcementService.DeleteAnnouncementDetailAsync(announcementDetail);

            return Ok("Success");
        }
    }
}
