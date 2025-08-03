using System;
using System.Collections.Generic;

namespace AlumniService.Models;

public partial class User
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PhoneNo { get; set; } = null!;

    public int CityId { get; set; }

    public int RoleId { get; set; }

    public virtual ICollection<Alumnus> Alumni { get; set; } = new List<Alumnus>();

    public virtual City City { get; set; } = null!;

    public virtual Role Role { get; set; } = null!;

    public virtual ICollection<Student> Students { get; set; } = new List<Student>();
}
