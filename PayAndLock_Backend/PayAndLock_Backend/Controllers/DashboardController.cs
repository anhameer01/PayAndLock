using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using PayAndLock_Backend.Data;
using PayAndLock_Backend.DTOs;

namespace PayAndLock_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _db;

        public DashboardController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<IActionResult> GetDashboard()
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var role = User.FindFirst(ClaimTypes.Role)!.Value;
            var now = DateTime.UtcNow;

            var visitsQuery = _db.Visits.AsQueryable();
            var targetQuery = _db.SalesTargets.AsQueryable();

            if (role == "BDM")
            {
                visitsQuery = visitsQuery.Where(v => v.EmployeeId == userId);
                targetQuery = targetQuery.Where(t => t.EmployeeId == userId);
            }

            var totalVisits = await visitsQuery.CountAsync();
            var totalRetailers = await _db.Retailers.CountAsync();

            var targets = await targetQuery
                .Where(t => t.Month == now.Month && t.Year == now.Year)
                .ToListAsync();

            var monthlyTarget = targets.Sum(t => t.Target);
            var achieved = targets.Sum(t => t.Achieved);

            var salesByEmployee = await _db.SalesTargets
                .Include(t => t.Employee)
                .Where(t => t.Month == now.Month && t.Year == now.Year)
                .Select(t => new EmployeeSalesDto
                {
                    EmployeeName = t.Employee != null ? t.Employee.FullName : "",
                    Target = t.Target,
                    Achieved = t.Achieved
                })
                .ToListAsync();

            var monthlySales = await _db.SalesTargets
                .Where(t => t.Year == now.Year)
                .GroupBy(t => t.Month)
                .Select(g => new MonthlySalesDto
                {
                    Month = g.Key.ToString(),
                    Sales = g.Sum(t => t.Achieved)
                })
                .ToListAsync();

            return Ok(new DashboardDto
            {
                TotalVisits = totalVisits,
                TotalRetailers = totalRetailers,
                MonthlyTarget = monthlyTarget,
                TargetAchieved = achieved,
                RemainingTarget = monthlyTarget - achieved,
                SalesByEmployee = salesByEmployee,
                MonthlySalesTrend = monthlySales
            });
        }
    }
}