using alumniService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace alumniService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollegeController : ControllerBase
    {

        [HttpGet]
        public IActionResult GetColleges()
        {
            using (var db = new P22AlumniportalContext())
            {
                var colleges = db.Colleges
                    .Select(c => new
                    {
                        CollegeId = c.CollegeId,
                        CollegeName = c.CollegeName,
                        CityName = c.City.CityName
                    })
                    .ToList();

                return Ok(colleges);
            }
        }

    }
}
