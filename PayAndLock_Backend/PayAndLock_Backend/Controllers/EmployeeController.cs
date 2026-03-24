using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PayAndLock_Backend.Data;
using PayAndLock_Backend.DTOs;
using PayAndLock_Backend.Models;

namespace PayAndLock_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class EmployeeController : ControllerBase
    {
        private readonly AppDbContext _db;

        public EmployeeController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var employees = await _db.Users
                .Include(u => u.Manager)
                .Where(u => u.Role != "SuperAdmin")
                .Select(u => new EmployeeListDto
                {
                    Id = u.Id,
                    FullName = u.FullName,
                    Role = u.Role,
                    Mobile = u.Mobile,
                    State = u.State,
                    City = u.City,
                    MonthlyTarget = u.MonthlyTarget,
                    ManagerName = u.Manager != null ? u.Manager.FullName : null,
                    ProfilePictureUrl = u.ProfilePictureUrl,
                    IsActive = u.IsActive
                })
                .ToListAsync();

            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var user = await _db.Users.Include(u => u.Manager)
                .FirstOrDefaultAsync(u => u.Id == id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin,StateHead,ASM")]
        public async Task<IActionResult> Create([FromBody] CreateEmployeeDto dto)
        {
            var exists = await _db.Users.AnyAsync(u =>
                u.LoginId == dto.LoginId || u.Mobile == dto.Mobile);
            if (exists)
                return BadRequest(new { message = "Login ID or Mobile already exists" });

            var user = new User
            {
                FullName = dto.FullName,
                LoginId = dto.LoginId,
                Mobile = dto.Mobile,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = dto.Role,
                Address = dto.Address,
                State = dto.State,
                City = dto.City,
                MonthlyTarget = dto.MonthlyTarget,
                ManagerId = dto.ManagerId
            };

            _db.Users.Add(user);

            _db.SalesTargets.Add(new SalesTarget
            {
                EmployeeId = user.Id,
                Month = DateTime.UtcNow.Month,
                Year = DateTime.UtcNow.Year,
                Target = dto.MonthlyTarget,
                Achieved = 0
            });

            await _db.SaveChangesAsync();
            return Ok(new { message = "Employee created", id = user.Id });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdmin,StateHead,ASM")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CreateEmployeeDto dto)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return NotFound();

            user.FullName = dto.FullName;
            user.Mobile = dto.Mobile;
            user.Role = dto.Role;
            user.Address = dto.Address;
            user.State = dto.State;
            user.City = dto.City;
            user.MonthlyTarget = dto.MonthlyTarget;
            user.ManagerId = dto.ManagerId;

            await _db.SaveChangesAsync();
            return Ok(new { message = "Updated successfully" });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return NotFound();
            user.IsActive = false;
            await _db.SaveChangesAsync();
            return Ok(new { message = "Employee deactivated" });
        }

        [HttpGet("managers/{role}")]
        public async Task<IActionResult> GetManagers(string role)
        {
            var managers = await _db.Users
                .Where(u => u.Role == role && u.IsActive)
                .Select(u => new { u.Id, u.FullName, u.Mobile })
                .ToListAsync();
            return Ok(managers);
        }
    }
}