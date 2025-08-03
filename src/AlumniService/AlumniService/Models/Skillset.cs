using System;
using System.Collections.Generic;

namespace AlumniService.Models;

public partial class Skillset
{
    public int SkillId { get; set; }

    public string SkillName { get; set; } = null!;

    public virtual ICollection<StudentSkillset> StudentSkillsets { get; set; } = new List<StudentSkillset>();
}
