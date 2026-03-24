using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PayAndLock_Backend.Data;

namespace PayAndLock_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ReportController : ControllerBase
    {
        private readonly AppDbContext _db;

        public ReportController(AppDbContext db) => _db = db;

        [HttpGet("visits")]
        public async Task<IActionResult> VisitReport(
            [FromQuery] DateTime? fromDate,
            [FromQuery] DateTime? toDate,
            [FromQuery] string? state,
            [FromQuery] string? city,
            [FromQuery] Guid? employeeId)
        {
            var query = _db.Visits.Include(v => v.Employee).AsQueryable();

            if (fromDate.HasValue) query = query.Where(v => v.VisitedAt >= fromDate);
            if (toDate.HasValue) query = query.Where(v => v.VisitedAt <= toDate);
            if (!string.IsNullOrEmpty(state)) query = query.Where(v => v.State == state);
            if (!string.IsNullOrEmpty(city)) query = query.Where(v => v.City == city);
            if (employeeId.HasValue) query = query.Where(v => v.EmployeeId == employeeId);

            var data = await query.OrderByDescending(v => v.VisitedAt).ToListAsync();
            return Ok(data);
        }

        [HttpGet("sales")]
        public async Task<IActionResult> SalesReport(
            [FromQuery] int? month,
            [FromQuery] int? year)
        {
            var now = DateTime.UtcNow;
            var m = month ?? now.Month;
            var y = year ?? now.Year;

            var data = await _db.SalesTargets
                .Include(t => t.Employee)
                .Where(t => t.Month == m && t.Year == y)
                .Select(t => new
                {
                    EmployeeName = t.Employee != null ? t.Employee.FullName : "",
                    t.Employee!.Role,
                    t.Target,
                    t.Achieved,
                    Percentage = t.Target > 0
                        ? Math.Round((double)t.Achieved / t.Target * 100, 1)
                        : 0
                })
                .ToListAsync();

            return Ok(data);
        }
    }
}