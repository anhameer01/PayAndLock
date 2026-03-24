namespace PayAndLock_Backend.DTOs
{
    public class CreateEmployeeDto
    {
        public string FullName { get; set; } = string.Empty;
        public string LoginId { get; set; } = string.Empty;
        public string Mobile { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string? Address { get; set; }
        public string? State { get; set; }
        public string? City { get; set; }
        public int MonthlyTarget { get; set; }
        public Guid? ManagerId { get; set; }
    }

    public class EmployeeListDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Mobile { get; set; } = string.Empty;
        public string? State { get; set; }
        public string? City { get; set; }
        public int MonthlyTarget { get; set; }
        public string? ManagerName { get; set; }
        public string? ProfilePictureUrl { get; set; }
        public bool IsActive { get; set; }
    }
}