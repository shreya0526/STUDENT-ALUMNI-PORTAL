using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace alumniService.Models;

public partial class Sector
{
    public int SectorId { get; set; }

    public string SectorName { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Alumnus> Alumni { get; set; } = new List<Alumnus>();
}
