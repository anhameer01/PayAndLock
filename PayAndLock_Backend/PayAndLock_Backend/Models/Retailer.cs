using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PayAndLock_Backend.Models
{
    public class Retailer
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public string RetailerCode { get; set; } = string.Empty;
        public string ShopName { get; set; } = string.Empty;
        public string OwnerName { get; set; } = string.Empty;
        public string Mobile { get; set; } = string.Empty;
        public string? AlternateMobile { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public Guid? AssignedBdmId { get; set; }
        [ForeignKey("AssignedBdmId")]
        public User? AssignedBdm { get; set; }
        public DateTime? InstallDate { get; set; }
        public string Status { get; set; } = "Active";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}