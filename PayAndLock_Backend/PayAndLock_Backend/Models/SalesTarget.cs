using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PayAndLock_Backend.Models
{
    public class SalesTarget
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public User? Employee { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public int Target { get; set; } = 0;
        public int Achieved { get; set; } = 0;
    }
}