using System;
using System.Collections.Generic;

namespace alumniService.Models;

public partial class AlumniCollege
{
    public int AlumniCollegeId { get; set; }

    public int AlumniId { get; set; }

    public int CollegeId { get; set; }

    public virtual Alumnus Alumni { get; set; } = null!;

    public virtual College College { get; set; } = null!;
}
