using alumniService.DTOs;
using alumniService.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace alumniService.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AlumniController : ControllerBase
    {
        [HttpGet("/all")]
        public IActionResult GetAlumniDetails()

        {
            using (var db = new P22AlumniportalContext())
            {
                var alumniDetails = db.Alumni
                    .Include(a => a.User)
                    .Include(a => a.Sector)
                    .Include(a => a.Work)
                    .Include(a => a.AlumniColleges)
                        .ThenInclude(ac => ac.College)
                    .Select(a => new
                    {
                        AlumniId = a.AlumniId,
                        UserName = a.User.UserName,
                        Email = a.User.Email,
                        Phone = a.User.PhoneNo,
                        Sector = a.Sector.SectorName,
                        WorkTitle = a.Work.WorkName,
                        Colleges = a.AlumniColleges
                                    .Select(ac => ac.College.CollegeName)
                                    .ToList()
                    })
                    .ToList();

                return Ok(alumniDetails);
            }

        }

       
        [HttpPost("/register")]
        public IActionResult CreateAlumnus([FromBody] Alumni dto)
        {
            using (var db = new P22AlumniportalContext())
            {
                // Check if User exists
                if (!db.Users.Any(u => u.UserId == dto.UserId))
                    return NotFound($"User with ID {dto.UserId} not found.");

                // Create new Alumnus
                var alumnus = new Alumnus
                {
                    UserId = dto.UserId,
                    SectorId = dto.SectorId,
                    WorkId = dto.WorkId
                };

                db.Alumni.Add(alumnus);
                db.SaveChanges();  // Save to get AlumniId

                // Optional: Save AlumniCollege mappings
                if (dto.CollegeIds != null && dto.CollegeIds.Any())
                {
                    foreach (var collegeId in dto.CollegeIds)
                    {
                        db.AlumniColleges.Add(new AlumniCollege
                        {
                            AlumniId = alumnus.AlumniId,
                            CollegeId = collegeId
                        });
                    }
                    db.SaveChanges();
                }

                return Ok($"Alumnus created with AlumniId {alumnus.AlumniId}");
            }
        }


        [HttpGet("getevents/{userId}")]
        public ActionResult<IEnumerable<EventDTO>> GetEventsByAlumni(int userId)
        {
            using (var db = new P22AlumniportalContext())
            {
                var alumnus = db.Alumni
                   .FirstOrDefault(a => a.UserId == userId);

                if (alumnus == null)
                {
                    return NotFound("Alumnus not found for the given userId.");
                }
               var alumniId = alumnus.AlumniId;
                var events = db.Events
                    .Where(e => e.AlumniId == alumniId)
                    .Select(e => new EventDTO
                    {
                        EventId = e.EventId,
                        EventName = e.EventName,
                        Date = (e.Date),
                        Time = (e.Time),
                        Link = e.Link,
                        AlumniId = e.AlumniId,
                        Description = e.Description
                    })
                    .ToList();

                if (events == null || !events.Any())
                {
                    return NotFound($"No events found for Alumni ID {alumniId}.");
                }

                return Ok(events);
            }
        }


        [HttpGet("get-alumni-id-by-userid/{userId}")]
        public IActionResult GetAlumniIdByUserId(int userId)
        {
            using (var db = new P22AlumniportalContext())
            {
                var alumnus = db.Users
                    .FirstOrDefault(a => a.UserId == userId);

                if (alumnus == null)
                {
                    return NotFound("Alumnus not found for the given userId.");
                }

                return Ok(new { alumnus});
            }
        }


        [HttpPut("update")]
        public IActionResult UpdateAlumnusByAlumniId([FromBody] AlumniUpdateDTO dto)
        {
            using (var db=new P22AlumniportalContext()) { 
                // Step 1: Find the alumnus using alumniId
                var alumnus = db.Alumni
                    .Include(a => a.User)
                    .FirstOrDefault(a => a.UserId == dto.AlumniId);

            if (alumnus == null)
                return NotFound("Alumnus not found");

            // Step 2: Update User details (but do not change UserId)
            if (alumnus.User != null)
            {
                alumnus.User.UserName = dto.UserName ?? alumnus.User.UserName;
                alumnus.User.Password = dto.Password ?? alumnus.User.Password;
                alumnus.User.Email = dto.Email ?? alumnus.User.Email;
                alumnus.User.PhoneNo = dto.PhoneNo ?? alumnus.User.PhoneNo;
            }

            // Step 3: Update sectorId and workId in Alumnus
            //alumnus.SectorId = dto.SectorId;
            //alumnus.WorkId = dto.WorkId;

            // Step 4: Save changes
            db.SaveChanges();

            return Ok("Alumnus and user details updated successfully");

         
            }
        }
    }
}
