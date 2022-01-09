using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Drivers;
using DDDSample1.Domain.Trips;
using DDDSample1.Infrastructure.Drivers;
using DDDSample1.Infrastructure.Trips;
using DDDSample1.Domain.Vehicles;
using DDDSample1.Infrastructure.Vehicles;
using DDDSample1.Domain.VehicleDuties;
using DDDSample1.Infrastructure.VehicleDuties;
using DDDSample1.Domain.DriverDuties;
using DDDSample1.Infrastructure.DriverDuties;
using DDDSample1.Domain.WorkBlocks;
using DDDSample1.Infrastructure.WorkBlocks;


namespace DDDSample1.Infrastructure
{
    public class MDVDbContext : DbContext
    {
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }  
        public DbSet<VehicleDuty> VehicleDuties { get; set; } 
        public DbSet<DriverDuty> DriverDuties { get; set; } 
        public DbSet<Trip> Trips { get; set; }
        public DbSet<WorkBlock> WorkBlocks { get; set; }
        
        
        public MDVDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("MDV");
            modelBuilder.ApplyConfiguration(new DriverEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new TripEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new VehicleEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new VehicleDutyEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new DriverDutyEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new WorkBlockEntityTypeConfiguration());
        }
    }
}