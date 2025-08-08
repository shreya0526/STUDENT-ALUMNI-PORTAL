using alumniService.DTOs;
using alumniService.Models;
using Microsoft.AspNetCore.Cors;
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



        [HttpPut("update/{eventId}")]
        public IActionResult UpdateEvent(int eventId, [FromBody] EventDTO updatedEventDto)
        {
            // Find the event by EventId and AlumniId
            using (var db = new P22AlumniportalContext())
            {
                var existingEvent = db.Events.FirstOrDefault(e =>
                    e.EventId == eventId && e.AlumniId == updatedEventDto.AlumniId);

                if (existingEvent == null)
                {
                    return NotFound("Event not found or you are not the creator.");
                }

                // Update event fields
                existingEvent.EventName = updatedEventDto.EventName;
                existingEvent.Date = updatedEventDto.Date;
                existingEvent.Time = updatedEventDto.Time;
                existingEvent.Link = updatedEventDto.Link;
                existingEvent.Description = updatedEventDto.Description;

                db.SaveChanges();

                return Ok("Event updated successfully.");
            }
        }

        


        [HttpDelete("delete/{eventId}")]
        public IActionResult DeleteEvent(int eventId)
        {
            using (var db = new P22AlumniportalContext())
            {
                // Step 1: Find the event
                var existingEvent = db.Events
                    .FirstOrDefault(e => e.EventId == eventId);

                if (existingEvent == null)
                {
                    return NotFound("Event not found or you are not the creator.");
                }

                // Step 2: Delete related register_event records
                var registeredUsers = db.RegisterEvents
                    .Where(r => r.EventId == eventId)
                    .ToList();

                db.RegisterEvents.RemoveRange(registeredUsers);

                // Step 3: Delete the event
                db.Events.Remove(existingEvent);

                db.SaveChanges();

                return Ok("Event and related registrations deleted successfully.");
            }
        }



        [HttpGet("registered-student-names/{eventId}")]
        public IActionResult GetRegisteredStudentNames(int eventId)
        {
            using (var db = new P22AlumniportalContext())
            {
                var studentNames = db.RegisterEvents
                    .Where(re => re.EventId == eventId)
                    .Include(re => re.Student)
                        .ThenInclude(s => s.User) // <-- include User through Student
                    .Select(re => re.Student.User.UserName) // <-- fetch name from User
                    .ToList();

                return Ok(studentNames);
            }
        }













    }
}
