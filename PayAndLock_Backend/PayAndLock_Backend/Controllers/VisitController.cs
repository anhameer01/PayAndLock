using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using PayAndLock_Backend.Data;
using PayAndLock_Backend.DTOs;
using PayAndLock_Backend.Models;

namespace PayAndLock_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class VisitController : ControllerBase
    {
        private readonly AppDbContext _db;

        public VisitController(AppDbContext db) => _db = db;

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateVisitDto dto)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var visit = new Visit
            {
                EmployeeId = userId,
                ShopName = dto.ShopName,
                OwnerName = dto.OwnerName,
                Mobile = dto.Mobile,
                AlternateMobile = dto.AlternateMobile,
                Address = dto.Address,
                City = dto.City,
                State = dto.State,
                Remarks = dto.Remarks,
                SoldKey = dto.SoldKey,
                Latitude = dto.Latitude,
                Longitude = dto.Longitude
            };

            _db.Visits.Add(visit);

            if (dto.SoldKey)
            {
                var target = await _db.SalesTargets.FirstOrDefaultAsync(t =>
                    t.EmployeeId == userId &&
                    t.Month == DateTime.UtcNow.Month &&
                    t.Year == DateTime.UtcNow.Year);

                if (target != null) target.Achieved++;
            }

            await _db.SaveChangesAsync();
            return Ok(new { message = "Visit recorded", id = visit.Id });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] VisitFilterDto filter)
        {
            var query = _db.Visits.Include(v => v.Employee).AsQueryable();

            if (filter.FromDate.HasValue)
                query = query.Where(v => v.VisitedAt >= filter.FromDate);
            if (filter.ToDate.HasValue)
                query = query.Where(v => v.VisitedAt <= filter.ToDate);
            if (filter.EmployeeId.HasValue)
                query = query.Where(v => v.EmployeeId == filter.EmployeeId);
            if (!string.IsNullOrEmpty(filter.City))
                query = query.Where(v => v.City == filter.City);
            if (!string.IsNullOrEmpty(filter.State))
                query = query.Where(v => v.State == filter.State);

            var total = await query.CountAsync();
            var visits = await query
                .OrderByDescending(v => v.VisitedAt)
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .Select(v => new
                {
                    v.Id,
                    v.ShopName,
                    v.OwnerName,
                    v.Mobile,
                    v.City,
                    v.State,
                    v.SoldKey,
                    v.Remarks,
                    v.PhotoUrl,
                    v.Latitude,
                    v.Longitude,
                    v.VisitedAt,
                    EmployeeName = v.Employee != null ? v.Employee.FullName : ""
                })
                .ToListAsync();

            return Ok(new { total, data = visits });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var visit = await _db.Visits
                .Include(v => v.Employee)
                .Where(v => v.Id == id)
                .Select(v => new
                {
                    v.Id,
                    v.ShopName,
                    v.OwnerName,
                    v.Mobile,
                    v.AlternateMobile,
                    v.Address,
                    v.City,
                    v.State,
                    v.PhotoUrl,
                    v.Remarks,
                    v.SoldKey,
                    v.Latitude,
                    v.Longitude,
                    v.VisitedAt,
                    v.EmployeeId,
                    EmployeeName = v.Employee != null ? v.Employee.FullName : ""
                })
                .FirstOrDefaultAsync();

            if (visit == null) return NotFound();
            return Ok(visit);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CreateVisitDto dto)
        {
            var visit = await _db.Visits.FindAsync(id);
            if (visit == null) return NotFound();

            visit.ShopName = dto.ShopName;
            visit.OwnerName = dto.OwnerName;
            visit.Mobile = dto.Mobile;
            visit.AlternateMobile = dto.AlternateMobile;
            visit.Address = dto.Address;
            visit.City = dto.City;
            visit.State = dto.State;
            visit.Remarks = dto.Remarks;
            visit.SoldKey = dto.SoldKey;
            visit.Latitude = dto.Latitude;
            visit.Longitude = dto.Longitude;

            await _db.SaveChangesAsync();
            return Ok(new { message = "Visit updated", id = visit.Id });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var visit = await _db.Visits.FindAsync(id);
            if (visit == null) return NotFound();

            _db.Visits.Remove(visit);
            await _db.SaveChangesAsync();
            return Ok(new { message = "Visit deleted", id });
        }
    }
}
