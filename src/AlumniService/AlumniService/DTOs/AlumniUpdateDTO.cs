namespace alumniService.DTOs
{
    public class AlumniUpdateDTO
    {
        public int AlumniId { get; set; }

        // Update fields from the User table
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? PhoneNo { get; set; }

        // Only update sectorId and workId
        public int SectorId { get; set; }
        public int WorkId { get; set; }
    }
}
