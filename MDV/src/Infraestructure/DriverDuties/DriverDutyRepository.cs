using DDDSample1.Domain.DriverDuties;
using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.WorkBlocks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.DriverDuties
{
    public class DriverDutyRepository : BaseRepository<DriverDuty, DriverDutyId>, IDriverDutyRepository
    {
        private readonly DbSet<DriverDuty> _DriverDutiesObjs;
    
        public DriverDutyRepository(MDVDbContext context):base(context.DriverDuties)
        {
            this._DriverDutiesObjs = context.DriverDuties;
           
        }

    }
}