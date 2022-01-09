using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.DriverDuties;
using System.Collections.Generic;

namespace DDDSample1.Infrastructure.DriverDuties
{
    internal class DriverDutyEntityTypeConfiguration : IEntityTypeConfiguration<DriverDuty>
    {
        public void Configure(EntityTypeBuilder<DriverDuty> builder)
        {
            builder.HasKey(b => b.Id);
            builder.HasAlternateKey(b => b.Code);
            builder.HasMany(b => b.WorkBlocks).WithOne();     
        }

    }
}
