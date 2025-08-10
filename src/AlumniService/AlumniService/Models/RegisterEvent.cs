using System;
using System.Collections.Generic;

namespace alumniService.Models;

public partial class RegisterEvent
{
    public int RegisterId { get; set; }

    public int EventId { get; set; }

    public int StudentId { get; set; }

    public virtual Event Event { get; set; } = null!;

    public virtual Student Student { get; set; } = null!;
}
