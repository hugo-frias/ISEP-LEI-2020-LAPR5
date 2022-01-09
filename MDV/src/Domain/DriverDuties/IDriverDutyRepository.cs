using DDDSample1.Domain.Shared;
using System.Threading.Tasks;
using DDDSample1.Domain.DriverDuties;
using System.Collections.Generic;

namespace DDDSample1.Domain.DriverDuties
{
    public interface IDriverDutyRepository: IRepository<DriverDuty,DriverDutyId>
    {
        
    }

}