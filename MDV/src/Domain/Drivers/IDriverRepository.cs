using DDDSample1.Domain.Shared;
using System.Threading.Tasks;

namespace DDDSample1.Domain.Drivers
{
    public interface IDriverRepository: IRepository<Driver,DriverId>
    {

    }

}