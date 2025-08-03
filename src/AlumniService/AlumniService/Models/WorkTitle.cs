using System;
using System.Collections.Generic;

namespace AlumniService.Models;

public partial class WorkTitle
{
    public int WorkId { get; set; }

    public string WorkName { get; set; } = null!;

    public int SectorId { get; set; }

    public virtual Sector Sector { get; set; } = null!;
}
