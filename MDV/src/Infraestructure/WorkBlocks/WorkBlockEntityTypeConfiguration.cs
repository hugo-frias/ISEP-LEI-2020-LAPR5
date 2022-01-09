using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.WorkBlocks;
using System.Collections.Generic;

namespace DDDSample1.Infrastructure.WorkBlocks
{
    internal class WorkBlockEntityTypeConfiguration : IEntityTypeConfiguration<WorkBlock>
    {
        public void Configure(EntityTypeBuilder<WorkBlock> builder)
        {
            builder.HasKey(b => b.Id);
            builder.HasMany(b => b.Trips).WithOne();
        }

    }
}
