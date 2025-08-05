using static System.Runtime.InteropServices.JavaScript.JSType;

namespace alumniService.DTOs
{
    public class EventDTO
    {

        public string  EventName { get; set; }


        public DateOnly Date { get; set; }

        public TimeOnly Time { get; set; }

        public string Link {get; set; }

        public int AlumniId { get; set; }

        public string Description { get; set; } = null!;
    }
}
