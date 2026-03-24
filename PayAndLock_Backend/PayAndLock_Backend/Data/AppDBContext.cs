using Microsoft.EntityFrameworkCore;
using PayAndLock_Backend.Models;

namespace PayAndLock_Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Visit> Visits { get; set; }
        public DbSet<Retailer> Retailers { get; set; }
        public DbSet<Billing> Billings { get; set; }
        public DbSet<SalesTarget> SalesTargets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .Property(u => u.Id)
                .HasDefaultValueSql("NEWID()");

            modelBuilder.Entity<Visit>()
                .Property(v => v.Id)
                .HasDefaultValueSql("NEWID()");

            modelBuilder.Entity<Retailer>()
                .Property(r => r.Id)
                .HasDefaultValueSql("NEWID()");

            modelBuilder.Entity<Billing>()
                .Property(b => b.Id)
                .HasDefaultValueSql("NEWID()");

            modelBuilder.Entity<SalesTarget>()
                .Property(s => s.Id)
                .HasDefaultValueSql("NEWID()");

            modelBuilder.Entity<User>()
                .HasOne(u => u.Manager)
                .WithMany()
                .HasForeignKey(u => u.ManagerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Visit>()
                .HasOne(v => v.Employee)
                .WithMany()
                .HasForeignKey(v => v.EmployeeId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Billing>()
                .HasOne(b => b.Retailer)
                .WithMany()
                .HasForeignKey(b => b.RetailerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Visit>()
                .Property(v => v.Latitude)
                .HasColumnType("decimal(10,8)");

            modelBuilder.Entity<Visit>()
                .Property(v => v.Longitude)
                .HasColumnType("decimal(11,8)");

            modelBuilder.Entity<Billing>()
                .Property(b => b.BillingAmount)
                .HasColumnType("decimal(10,2)");
        }
    }
}