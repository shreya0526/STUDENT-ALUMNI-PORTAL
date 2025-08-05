using System;
using System.Collections.Generic;

namespace alumniService.Models;

public partial class StudentSkillset
{
    public int StudentSkillId { get; set; }

    public int StudentId { get; set; }

    public int SkillId { get; set; }

    public virtual Skillset Skill { get; set; } = null!;

    public virtual Student Student { get; set; } = null!;
}
