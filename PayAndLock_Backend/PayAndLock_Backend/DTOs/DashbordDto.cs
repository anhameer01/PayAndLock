namespace PayAndLock_Backend.DTOs
{
    public class DashboardDto
    {
        public int TotalVisits { get; set; }
        public int TotalRetailers { get; set; }
        public int MonthlyTarget { get; set; }
        public int TargetAchieved { get; set; }
        public int RemainingTarget { get; set; }
        public List<EmployeeSalesDto> SalesByEmployee { get; set; } = new();
        public List<MonthlySalesDto> MonthlySalesTrend { get; set; } = new();
    }

    public class EmployeeSalesDto
    {
        public string EmployeeName { get; set; } = string.Empty;
        public int Achieved { get; set; }
        public int Target { get; set; }
    }

    public class MonthlySalesDto
    {
        public string Month { get; set; } = string.Empty;
        public int Sales { get; set; }
    }
}