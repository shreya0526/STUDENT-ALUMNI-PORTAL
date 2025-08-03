using System;
using System.Collections.Generic;

namespace AlumniService.Models;

public partial class Sector
{
    public int SectorId { get; set; }

    public string SectorName { get; set; } = null!;

    public virtual ICollection<Alumnus> Alumni { get; set; } = new List<Alumnus>();

    public virtual ICollection<WorkTitle> WorkTitles { get; set; } = new List<WorkTitle>();
}
