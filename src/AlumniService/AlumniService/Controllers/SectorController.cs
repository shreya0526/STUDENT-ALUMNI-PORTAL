using alumniService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace alumniService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SectorController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetSectors()
        {
            using (var db = new P22AlumniportalContext())
            {
                var sectors = db.Sectors
                    .Select(s => new
                    {
                        SectorId = s.SectorId,
                        SectorName = s.SectorName
                    })
                    .ToList();

                return Ok(sectors);
            }
        }

    }
}
