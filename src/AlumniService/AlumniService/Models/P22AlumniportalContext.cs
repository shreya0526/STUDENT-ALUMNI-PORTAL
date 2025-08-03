using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace AlumniService.Models;

public partial class P22AlumniportalContext : DbContext
{
    public P22AlumniportalContext()
    {
    }

    public P22AlumniportalContext(DbContextOptions<P22AlumniportalContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AlumniCollege> AlumniColleges { get; set; }

    public virtual DbSet<Alumnus> Alumni { get; set; }

    public virtual DbSet<City> Cities { get; set; }

    public virtual DbSet<College> Colleges { get; set; }

    public virtual DbSet<Event> Events { get; set; }

    public virtual DbSet<RegisterEvent> RegisterEvents { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Sector> Sectors { get; set; }

    public virtual DbSet<Skillset> Skillsets { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    public virtual DbSet<StudentSkillset> StudentSkillsets { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<WorkTitle> WorkTitles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=root;database=p22_alumniportal", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.2.0-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<AlumniCollege>(entity =>
        {
            entity.HasKey(e => e.AlumniCollegeId).HasName("PRIMARY");

            entity.ToTable("alumni_college");

            entity.HasIndex(e => e.AlumniId, "alumni_id_idx");

            entity.HasIndex(e => e.CollegeId, "college_id_idx");

            entity.Property(e => e.AlumniCollegeId).HasColumnName("alumni_college_id");
            entity.Property(e => e.AlumniId).HasColumnName("alumni_id");
            entity.Property(e => e.CollegeId).HasColumnName("college_id");

            entity.HasOne(d => d.Alumni).WithMany(p => p.AlumniColleges)
                .HasForeignKey(d => d.AlumniId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("alumni_id2");

            entity.HasOne(d => d.College).WithMany(p => p.AlumniColleges)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("college_id2");
        });

        modelBuilder.Entity<Alumnus>(entity =>
        {
            entity.HasKey(e => e.AlumniId).HasName("PRIMARY");

            entity.ToTable("alumni");

            entity.HasIndex(e => e.SectorId, "sector_id_idx");

            entity.HasIndex(e => e.UserId, "user_id2_idx");

            entity.Property(e => e.AlumniId).HasColumnName("alumni_id");
            entity.Property(e => e.SectorId).HasColumnName("sector_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Sector).WithMany(p => p.Alumni)
                .HasForeignKey(d => d.SectorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("sector_id");

            entity.HasOne(d => d.User).WithMany(p => p.Alumni)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("user_id2");
        });

        modelBuilder.Entity<City>(entity =>
        {
            entity.HasKey(e => e.CityId).HasName("PRIMARY");

            entity.ToTable("city");

            entity.Property(e => e.CityId).HasColumnName("city_id");
            entity.Property(e => e.CityName)
                .HasMaxLength(100)
                .HasColumnName("city_name");
        });

        modelBuilder.Entity<College>(entity =>
        {
            entity.HasKey(e => e.CollegeId).HasName("PRIMARY");

            entity.ToTable("college");

            entity.HasIndex(e => e.CityId, "city_id_idx");

            entity.Property(e => e.CollegeId)
                .ValueGeneratedNever()
                .HasColumnName("college_id");
            entity.Property(e => e.CityId).HasColumnName("city_id");
            entity.Property(e => e.CollegeName)
                .HasMaxLength(100)
                .HasColumnName("college_name");

            entity.HasOne(d => d.City).WithMany(p => p.Colleges)
                .HasForeignKey(d => d.CityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("city_id2");
        });

        modelBuilder.Entity<Event>(entity =>
        {
            entity.HasKey(e => e.EventId).HasName("PRIMARY");

            entity.ToTable("event");

            entity.HasIndex(e => e.AlumniId, "alumni_id2_idx");

            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.AlumniId).HasColumnName("alumni_id");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.Description)
                .HasMaxLength(1000)
                .HasColumnName("description");
            entity.Property(e => e.EventName)
                .HasMaxLength(100)
                .HasColumnName("event_name");
            entity.Property(e => e.Link)
                .HasMaxLength(255)
                .HasColumnName("link");
            entity.Property(e => e.Time)
                .HasColumnType("time")
                .HasColumnName("time");

            entity.HasOne(d => d.Alumni).WithMany(p => p.Events)
                .HasForeignKey(d => d.AlumniId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("alumni_id_event");
        });

        modelBuilder.Entity<RegisterEvent>(entity =>
        {
            entity.HasKey(e => e.RegisterId).HasName("PRIMARY");

            entity.ToTable("register_event");

            entity.HasIndex(e => e.EventId, "event_id_idx");

            entity.HasIndex(e => e.StudentId, "student_id3_idx");

            entity.Property(e => e.RegisterId).HasColumnName("register_id");
            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.StudentId).HasColumnName("student_id");

            entity.HasOne(d => d.Event).WithMany(p => p.RegisterEvents)
                .HasForeignKey(d => d.EventId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("event_id");

            entity.HasOne(d => d.Student).WithMany(p => p.RegisterEvents)
                .HasForeignKey(d => d.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("student_id3");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PRIMARY");

            entity.ToTable("role");

            entity.HasIndex(e => e.RoleName, "role_name_UNIQUE").IsUnique();

            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.RoleName)
                .HasMaxLength(100)
                .HasColumnName("role_name");
        });

        modelBuilder.Entity<Sector>(entity =>
        {
            entity.HasKey(e => e.SectorId).HasName("PRIMARY");

            entity.ToTable("sector");

            entity.Property(e => e.SectorId)
                .ValueGeneratedNever()
                .HasColumnName("sector_id");
            entity.Property(e => e.SectorName)
                .HasMaxLength(100)
                .HasColumnName("sector_name");
        });

        modelBuilder.Entity<Skillset>(entity =>
        {
            entity.HasKey(e => e.SkillId).HasName("PRIMARY");

            entity.ToTable("skillset");

            entity.HasIndex(e => e.SkillName, "skill_name_UNIQUE").IsUnique();

            entity.Property(e => e.SkillId).HasColumnName("skill_id");
            entity.Property(e => e.SkillName)
                .HasMaxLength(100)
                .HasColumnName("skill_name");
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.StudentId).HasName("PRIMARY");

            entity.ToTable("student");

            entity.HasIndex(e => e.CollegeId, "college_id_idx");

            entity.HasIndex(e => e.UserId, "user_id_idx");

            entity.Property(e => e.StudentId).HasColumnName("student_id");
            entity.Property(e => e.CollegeId).HasColumnName("college_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.College).WithMany(p => p.Students)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("college_id");

            entity.HasOne(d => d.User).WithMany(p => p.Students)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("user_id");
        });

        modelBuilder.Entity<StudentSkillset>(entity =>
        {
            entity.HasKey(e => e.StudentSkillId).HasName("PRIMARY");

            entity.ToTable("student_skillset");

            entity.HasIndex(e => e.SkillId, "skill_id_idx");

            entity.HasIndex(e => e.StudentId, "student_id_idx");

            entity.Property(e => e.StudentSkillId).HasColumnName("student_skill_id");
            entity.Property(e => e.SkillId).HasColumnName("skill_id");
            entity.Property(e => e.StudentId).HasColumnName("student_id");

            entity.HasOne(d => d.Skill).WithMany(p => p.StudentSkillsets)
                .HasForeignKey(d => d.SkillId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("skill_id");

            entity.HasOne(d => d.Student).WithMany(p => p.StudentSkillsets)
                .HasForeignKey(d => d.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("student_id");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PRIMARY");

            entity.ToTable("user");

            entity.HasIndex(e => e.CityId, "city_id_idx");

            entity.HasIndex(e => e.RoleId, "role_id_idx");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.CityId).HasColumnName("city_id");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.PhoneNo)
                .HasMaxLength(100)
                .HasColumnName("phone_no");
            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.UserName)
                .HasMaxLength(100)
                .HasColumnName("user_name");

            entity.HasOne(d => d.City).WithMany(p => p.Users)
                .HasForeignKey(d => d.CityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("city_id");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("role_id");
        });

        modelBuilder.Entity<WorkTitle>(entity =>
        {
            entity.HasKey(e => e.WorkId).HasName("PRIMARY");

            entity.ToTable("work_title");

            entity.HasIndex(e => e.SectorId, "sector_id_idx");

            entity.Property(e => e.WorkId).HasColumnName("work_id");
            entity.Property(e => e.SectorId).HasColumnName("sector_id");
            entity.Property(e => e.WorkName)
                .HasMaxLength(100)
                .HasColumnName("work_name");

            entity.HasOne(d => d.Sector).WithMany(p => p.WorkTitles)
                .HasForeignKey(d => d.SectorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("sector_id3");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
