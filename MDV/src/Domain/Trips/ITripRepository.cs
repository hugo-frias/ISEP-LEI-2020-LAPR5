using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Trips
{
    public interface ITripRepository: IRepository<Trip,TripId>

    {
        Task<List<Trip>> GetAllFromLineAsync(string lineId);

        Task<List<Trip>> GetAllByCodeAsync(List<string> listTripsCode);
    }

}
