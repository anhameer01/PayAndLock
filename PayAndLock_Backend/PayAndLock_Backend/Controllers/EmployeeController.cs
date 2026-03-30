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
                    ManagerId= u.ManagerId,
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
            var dbName = _db.Database.GetDbConnection().Database;
            return Ok(new { message = "Employee created", id = user.Id });
               
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdmin,StateHead,ASM")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CreateEmployeeDto dto)
        {
            if (dto == null)
                return BadRequest("Invalid data");

            var user = await _db.Users.FindAsync(id);
            if (user == null)
                return NotFound("User not found");

            if (dto.ManagerId == id)
                return BadRequest("User cannot be their own manager");

            var errors = new List<string>();
            bool isUpdated = false;

            // FullName
            if (dto.FullName != user.FullName)
            {
                user.FullName = dto.FullName;
                isUpdated = true;
            }
            else errors.Add("FullName is same as previous");

            // Mobile
            if (dto.Mobile != user.Mobile)
            {
                user.Mobile = dto.Mobile;
                isUpdated = true;
            }
            else errors.Add("Mobile is same as previous");

            // Role
            if (dto.Role != user.Role)
            {
                user.Role = dto.Role;
                isUpdated = true;
            }
            else errors.Add("Role is same as previous");

            // Address
            if (dto.Address != user.Address)
            {
                user.Address = dto.Address;
                isUpdated = true;
            }
            else errors.Add("Address is same as previous");

            // State
            if (dto.State != user.State)
            {
                user.State = dto.State;
                isUpdated = true;
            }
            else errors.Add("State is same as previous");

            // City
            if (dto.City != user.City)
            {
                user.City = dto.City;
                isUpdated = true;
            }
            else errors.Add("City is same as previous");

            // MonthlyTarget
            if (dto.MonthlyTarget != user.MonthlyTarget)
            {
                user.MonthlyTarget = dto.MonthlyTarget;
                isUpdated = true;
            }
            else errors.Add("MonthlyTarget is same as previous");

            // ManagerId
            if (dto.ManagerId != user.ManagerId)
            {
                user.ManagerId = dto.ManagerId;
                isUpdated = true;
            }
            else errors.Add("ManagerId is same as previous");

            //  If nothing changed
            if (!isUpdated)
                return BadRequest(new { message = "No changes detected", details = errors });

            try
            {
                await _db.SaveChangesAsync();

                return Ok(new
                {
                    message = "Updated successfully",
                    skipped = errors // shows unchanged fields
                });
            }
            catch (DbUpdateException)
            {
                return Conflict(new { message = "Update failed. Possible duplicate or invalid ManagerId." });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Something went wrong" });
            }
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