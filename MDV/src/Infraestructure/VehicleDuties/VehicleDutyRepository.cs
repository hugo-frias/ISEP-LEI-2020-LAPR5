using DDDSample1.Domain.VehicleDuties;
using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.WorkBlocks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.VehicleDuties
{
    public class VehicleDutyRepository : BaseRepository<VehicleDuty, VehicleDutyId>, IVehicleDutyRepository
    {
        private readonly DbSet<VehicleDuty> _VehicleDutiesObjs;
    
        public VehicleDutyRepository(MDVDbContext context):base(context.VehicleDuties)
        {
            this._VehicleDutiesObjs = context.VehicleDuties;
           
        }
        public async Task<VehicleDuty> getVehicleDutyWithWorkblocks(VehicleDutyId vehicleDutyId)
        {
            return await this._VehicleDutiesObjs.Include(b => b.WorkBlocks).Where(x => vehicleDutyId.Equals(x.Id)).FirstOrDefaultAsync();
        }

        public async Task<VehicleDuty> getVehicleDutyByWorkBlock(WorkBlockId workBlockId)
        {
            return  this._VehicleDutiesObjs.FromSqlRaw("select [MDV].[VehicleDuties].* from [MDV].[VehicleDuties] INNER JOIN [MDV].[WorkBlocks] ON [MDV].[VehicleDuties].Id = [MDV].[WorkBlocks].VehicleDutyId where [MDV].[WorkBlocks].Id={0}",workBlockId).FirstOrDefault();
            // return await this._VehicleDutiesObjs.Include(b => b.WorkBlocks).Where(x => x.WorkBlocks.Find(x => x.Id ==workBlockId)).FirstOrDefaultAsync();
        }

    }
}