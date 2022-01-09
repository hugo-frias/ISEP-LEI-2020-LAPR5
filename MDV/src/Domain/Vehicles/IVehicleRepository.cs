using DDDSample1.Domain.Shared;
using System.Threading.Tasks;

namespace DDDSample1.Domain.Vehicles
{
    public interface IVehicleRepository: IRepository<Vehicle,VehicleId>
    {

    }

}