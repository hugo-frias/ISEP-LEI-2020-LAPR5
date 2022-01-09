using DDDSample1.Domain.Shared;
using System.Threading.Tasks;
using DDDSample1.Domain.WorkBlocks;
using System.Collections.Generic;

namespace DDDSample1.Domain.VehicleDuties
{
    public interface IVehicleDutyRepository: IRepository<VehicleDuty,VehicleDutyId>
    {

        Task<VehicleDuty> getVehicleDutyWithWorkblocks(VehicleDutyId vehicleDutyId);
        Task<VehicleDuty> getVehicleDutyByWorkBlock(WorkBlockId workBlockId);
        
    }

}