using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using DDDSample1.Domain.WorkBlocks;

namespace DDDSample1.Domain.VehicleDuties
{
    public interface IVehicleDutyService
    {
        Task<VehicleDutyDto> AddAsync(VehicleDutyDto dto);
        Task<VehicleDutyDto> GetByIdAsync(VehicleDutyId id);
        Task<List<VehicleDutyDto>> GetAllAsync();
        Task<List<WorkBlock>> UpdateAsync(CreatingMultiWorkBlocksDto dto);
        Task<VehicleDutyDto> AddWithouCommitAsync(VehicleDutyDto dto);
        Task<Int32> CommitChanges();
    }

}