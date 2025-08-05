using alumniService.DTOs;
using alumniService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace alumniService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        [HttpGet]
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

        [HttpPost]
        //        public IActionResult UpdateAlumniExtraData([FromBody] Alumni dto)
        //        {
        //            using (var db = new P22AlumniportalContext())
        //            {
        //                // Find the alumni
        //                var alumni = db.Alumni.FirstOrDefault(a => a.AlumniId == dto.AlumniId);
        //                if (alumni == null)
        //                {
        //                    return NotFound($"Alumni with ID {dto.AlumniId} not found.");
        //                }

        //                // Update Sector and WorkTitle using existing IDs
        //                alumni.SectorId = dto.SectorId;
        //                alumni.WorkId = dto.WorkId;

        //                // Remove existing college mappings if any (optional)
        //                var existingAlumniColleges = db.AlumniColleges
        //                    .Where(ac => ac.AlumniId == dto.AlumniId)
        //                    .ToList();

        //                db.AlumniColleges.RemoveRange(existingAlumniColleges);

        //                // Add new college mappings
        //                foreach (var collegeId in dto.CollegeIds)
        //                {
        //                    db.AlumniColleges.Add(new AlumniCollege
        //                    {
        //                        AlumniId = dto.AlumniId,
        //                        CollegeId = collegeId
        //                    });
        //                }

        //                db.SaveChanges();

        //                return Ok("Alumni extra data updated successfully.");
        //            }
        //        }
        //    }
        //}

        [HttpPost]

        [HttpPost]
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

    }
}
