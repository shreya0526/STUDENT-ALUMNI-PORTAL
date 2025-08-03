using System;
using System.Collections.Generic;

namespace AlumniService.Models;

public partial class Student
{
    public int StudentId { get; set; }

    public int UserId { get; set; }

    public int CollegeId { get; set; }

    public virtual College College { get; set; } = null!;

    public virtual ICollection<RegisterEvent> RegisterEvents { get; set; } = new List<RegisterEvent>();

    public virtual ICollection<StudentSkillset> StudentSkillsets { get; set; } = new List<StudentSkillset>();

    public virtual User User { get; set; } = null!;
}
