using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using DDDSample1.Domain.WorkBlocks;

namespace DDDSample1.Domain.DriverDuties
{
    public interface IDriverDutyService
    {
        Task<DriverDutyDto> AddAsync(CreatingDriverDutyDto dto);
        Task<DriverDutyDto> GetByIdAsync(DriverDutyId id);
        Task<List<DriverDutyDto>> GetAllAsync();
        Task<DriverDutyDto> AddWithouCommitAsync(DriverDutyDto dto);
        Task<Int32> CommitChanges();
    }

}