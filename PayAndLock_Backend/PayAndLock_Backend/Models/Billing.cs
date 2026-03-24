using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PayAndLock_Backend.Models
{
    public class Billing
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid? RetailerId { get; set; }
        [ForeignKey("RetailerId")]
        public Retailer? Retailer { get; set; }
        public string ShopName { get; set; } = string.Empty;
        public string OwnerName { get; set; } = string.Empty;
        public string Mobile { get; set; } = string.Empty;
        public string? City { get; set; }
        public string? State { get; set; }
        public string? DeviceDetails { get; set; }
        public decimal BillingAmount { get; set; }
        public string PaymentMode { get; set; } = "Cash";
        public DateTime BillingDate { get; set; } = DateTime.UtcNow;
        public bool IsRebilling { get; set; } = false;
        public Guid? CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}