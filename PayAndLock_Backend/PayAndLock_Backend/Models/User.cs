using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PayAndLock_Backend.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public string FullName { get; set; } = string.Empty;
        public string LoginId { get; set; } = string.Empty;
        public string Mobile { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string? Address { get; set; }
        public string? State { get; set; }
        public string? City { get; set; }
        public string? IdProofUrl { get; set; }
        public string? ProfilePictureUrl { get; set; }
        public int MonthlyTarget { get; set; } = 0;
        public Guid? ManagerId { get; set; }
        [ForeignKey("ManagerId")]
        public User? Manager { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}