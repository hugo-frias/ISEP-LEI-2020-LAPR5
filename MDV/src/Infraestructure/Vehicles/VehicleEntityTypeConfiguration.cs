using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Vehicles;
using System.Collections.Generic;

namespace DDDSample1.Infrastructure.Vehicles
{
    internal class VehicleEntityTypeConfiguration : IEntityTypeConfiguration<Vehicle>
    {
        public void Configure(EntityTypeBuilder<Vehicle> builder)
        {
            builder.HasKey(b => b.Id);
            builder.HasAlternateKey(b => b.Matricula);
            builder.HasAlternateKey(b => b.VIN);
            builder.Property(b => b.VIN).HasMaxLength(17);
            }
        }
    }