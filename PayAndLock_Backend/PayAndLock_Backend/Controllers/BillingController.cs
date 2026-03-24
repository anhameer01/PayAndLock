using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using PayAndLock_Backend.Data;
using PayAndLock_Backend.Models;

namespace PayAndLock_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BillingController : ControllerBase
    {
        private readonly AppDbContext _db;

        public BillingController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var billings = await _db.Billings
                .Include(b => b.Retailer)
                .OrderByDescending(b => b.BillingDate)
                .ToListAsync();
            return Ok(billings);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var billing = await _db.Billings.Include(b => b.Retailer)
                .FirstOrDefaultAsync(b => b.Id == id);
            if (billing == null) return NotFound();
            return Ok(billing);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Billing dto)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            dto.Id = Guid.NewGuid();
            dto.CreatedBy = userId;
            dto.CreatedAt = DateTime.UtcNow;

            _db.Billings.Add(dto);
            await _db.SaveChangesAsync();
            return Ok(new { message = "Billing created", id = dto.Id });
        }
    }
}