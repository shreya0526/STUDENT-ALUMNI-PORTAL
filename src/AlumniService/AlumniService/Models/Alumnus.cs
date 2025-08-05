using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace alumniService.Models;

public partial class Alumnus
{
    public int AlumniId { get; set; }

    public int SectorId { get; set; }

    public int WorkId { get; set; }

    public int UserId { get; set; }

    
    public virtual ICollection<AlumniCollege> AlumniColleges { get; set; } = new List<AlumniCollege>();

   
    public virtual ICollection<Event> Events { get; set; } = new List<Event>();

    
    public virtual Sector Sector { get; set; } = null!;

   
    public virtual User User { get; set; } = null!;

   
    public virtual WorkTitle Work { get; set; } = null!;
}
