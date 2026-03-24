using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PayAndLock_Backend.Models
{
    public class Visit
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid EmployeeId { get; set; }

        [ForeignKey("EmployeeId")]
        public User? Employee { get; set; }

        public string ShopName { get; set; } = string.Empty;
        public string OwnerName { get; set; } = string.Empty;
        public string Mobile { get; set; } = string.Empty;
        public string? AlternateMobile { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? PhotoUrl { get; set; }
        public string? Remarks { get; set; }
        public bool SoldKey { get; set; } = false;
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public DateTime VisitedAt { get; set; } = DateTime.UtcNow;
    }
}