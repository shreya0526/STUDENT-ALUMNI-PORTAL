using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace alumniService.Models;

public partial class Event
{
    public int EventId { get; set; }

    public string EventName { get; set; } = null!;

    public DateOnly Date { get; set; }

    public TimeOnly Time { get; set; }

    public string Link { get; set; } = null!;

    public int AlumniId { get; set; }

    public string Description { get; set; } = null!;

    
   // public virtual Alumnus? Alumni { get; set; }


      public virtual Alumnus Alumni { get; set; } = null!;

    
    public virtual ICollection<RegisterEvent> RegisterEvents { get; set; } = new List<RegisterEvent>();
}
