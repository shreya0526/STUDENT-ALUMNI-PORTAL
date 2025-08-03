using System;
using System.Collections.Generic;

namespace AlumniService.Models;

public partial class College
{
    public int CollegeId { get; set; }

    public int CityId { get; set; }

    public string CollegeName { get; set; } = null!;

    public virtual ICollection<AlumniCollege> AlumniColleges { get; set; } = new List<AlumniCollege>();

    public virtual City City { get; set; } = null!;

    public virtual ICollection<Student> Students { get; set; } = new List<Student>();
}
