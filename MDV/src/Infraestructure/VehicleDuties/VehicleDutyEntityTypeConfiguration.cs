using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.VehicleDuties;
using System.Collections.Generic;

namespace DDDSample1.Infrastructure.VehicleDuties
{
    internal class VehicleDutyEntityTypeConfiguration : IEntityTypeConfiguration<VehicleDuty>
    {
        public void Configure(EntityTypeBuilder<VehicleDuty> builder)
        {
            builder.HasKey(b => b.Id);
            builder.HasAlternateKey(b => b.Code);
            builder.HasAlternateKey(b => b.Name);
            builder.HasAlternateKey(b => b.Color);
            builder.Property(b => b.Code).HasMaxLength(20);
            builder.HasMany(b => b.WorkBlocks).WithOne();     
        }

    }
}
