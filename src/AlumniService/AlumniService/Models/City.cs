using System;
using System.Collections.Generic;

namespace alumniService.Models;

public partial class City
{
    public int CityId { get; set; }

    public string CityName { get; set; } = null!;

    public virtual ICollection<College> Colleges { get; set; } = new List<College>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
