using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PayAndLock_Backend.Data;
using PayAndLock_Backend.Models;

namespace PayAndLock_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class RetailerController : ControllerBase
    {
        private readonly AppDbContext _db;

        public RetailerController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] string? city,
            [FromQuery] string? state,
            [FromQuery] string? search,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20)
        {
            var query = _db.Retailers.Include(r => r.AssignedBdm).AsQueryable();

            if (!string.IsNullOrEmpty(city))
                query = query.Where(r => r.City == city);
            if (!string.IsNullOrEmpty(state))
                query = query.Where(r => r.State == state);
            if (!string.IsNullOrEmpty(search))
                query = query.Where(r =>
                    r.ShopName.Contains(search) ||
                    r.OwnerName.Contains(search) ||
                    r.Mobile.Contains(search));

            var total = await query.CountAsync();
            var data = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new { total, data });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var retailer = await _db.Retailers.Include(r => r.AssignedBdm)
                .FirstOrDefaultAsync(r => r.Id == id);
            if (retailer == null) return NotFound();
            return Ok(retailer);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Retailer retailer)
        {
            retailer.Id = Guid.NewGuid();
            retailer.RetailerCode = "RET" + DateTime.UtcNow.Ticks.ToString()[^6..];
            retailer.CreatedAt = DateTime.UtcNow;
            _db.Retailers.Add(retailer);
            await _db.SaveChangesAsync();
            return Ok(new { message = "Retailer created", id = retailer.Id });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] Retailer dto)
        {
            var retailer = await _db.Retailers.FindAsync(id);
            if (retailer == null) return NotFound();

            retailer.ShopName = dto.ShopName;
            retailer.OwnerName = dto.OwnerName;
            retailer.Mobile = dto.Mobile;
            retailer.City = dto.City;
            retailer.State = dto.State;
            retailer.Status = dto.Status;
            retailer.AssignedBdmId = dto.AssignedBdmId;

            await _db.SaveChangesAsync();
            return Ok(new { message = "Updated" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var retailer = await _db.Retailers.FindAsync(id);
            if (retailer == null) return NotFound();

            _db.Retailers.Remove(retailer);
            await _db.SaveChangesAsync();
            return Ok(new { message = "Retailer deleted", id });
        }
    }
}
