using System;
using System.Collections.Generic;

namespace alumniService.Models;

public partial class WorkTitle
{
    public int WorkId { get; set; }

    public string WorkName { get; set; } = null!;

    public virtual ICollection<Alumnus> Alumni { get; set; } = new List<Alumnus>();
}
