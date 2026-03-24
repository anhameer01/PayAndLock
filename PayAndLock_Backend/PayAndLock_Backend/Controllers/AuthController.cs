using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using PayAndLock_Backend.Data;
using PayAndLock_Backend.DTOs;
using PayAndLock_Backend.Models;

namespace PayAndLock_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u =>
                u.LoginId == dto.LoginId || u.Mobile == dto.LoginId);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized(new { message = "Invalid credentials" });

            if (!user.IsActive)
                return Unauthorized(new { message = "Account is disabled" });

            var token = GenerateToken(user);

            return Ok(new LoginResponseDto
            {
                Token = token,
                Role = user.Role,
                FullName = user.FullName,
                UserId = user.Id
            });
        }

        [HttpPost("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] LoginDto dto)
        {
            var exists = await _db.Users.AnyAsync(u => u.LoginId == dto.LoginId);
            if (exists) return BadRequest(new { message = "Admin already exists" });

            var admin = new User
            {
                FullName = "Super Admin",
                LoginId = dto.LoginId,
                Mobile = dto.LoginId,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "SuperAdmin",
                IsActive = true
            };

            _db.Users.Add(admin);
            await _db.SaveChangesAsync();
            return Ok(new { message = "Admin created successfully" });
        }

        private string GenerateToken(User user)
        {
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.FullName),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim("mobile", user.Mobile)
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(
                    double.Parse(_config["Jwt:ExpiryHours"]!)),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}