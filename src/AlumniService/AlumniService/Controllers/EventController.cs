using alumniService.DTOs;
using alumniService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace alumniService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {

        [HttpGet]
        public IActionResult GetEventsWithAlumniInfo()
        {
            using( var db = new P22AlumniportalContext()) { 
                var events = db.Events
                    .Include(e => e.Alumni)                  // Include Alumnus
                    .ThenInclude(a => a.User)                // Include User from Alumnus
                    .Where(e => e.Alumni != null)
                    .Select(e => new
                    {
                        e.EventName,
                        e.Date,
                        e.Time,
                        e.Link,
                        e.Description,
                        e.AlumniId,
                        AlumniName = e.Alumni.User.UserName, // Access UserName through Alumni.User
                        SectorName = e.Alumni.Sector.SectorName, // Optional: if you want more details
                    })
                    .ToList();

                return Ok(events);
            }
        }




        [HttpPost]
        public IActionResult CreateEvent([FromBody] EventDTO dto)
        {
            using (var db = new P22AlumniportalContext())
            {
                
                var alumni = db.Alumni.FirstOrDefault(a => a.AlumniId == dto.AlumniId);
                if (alumni == null)
                {
                    return BadRequest($"No alumni found with ID {dto.AlumniId}");
                }

                
                var newEvent = new Event
                {
                    EventName = dto.EventName,
                    Date = dto.Date,
                    Time = dto.Time,
                    Link = dto.Link,
                    AlumniId = dto.AlumniId,
                    Description = dto.Description,
                    Alumni = alumni
                };

                db.Events.Add(newEvent);
                db.SaveChanges();

                return Ok("Event created successfully.");
            }
        }



    }
}
