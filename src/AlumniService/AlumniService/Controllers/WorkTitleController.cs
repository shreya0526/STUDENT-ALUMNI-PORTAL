using alumniService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace alumniService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkTitleController : ControllerBase
    {

        [HttpGet]
        public IActionResult GetWorkTitles()
        {
            using (var db = new P22AlumniportalContext())
            {
                var workTitles = db.WorkTitles
                    .Select(w => new
                    {
                        WorkId = w.WorkId,
                        WorkName = w.WorkName
                    })
                    .ToList();

                return Ok(workTitles);
            }
        }

    }
}
