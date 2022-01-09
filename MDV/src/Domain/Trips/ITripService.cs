using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.Trips
{
    public interface ITripService
    {
        Task<TripDto> AddAsync(TripDto dto);
        Task<TripDto> GetByIdAsync(TripId id);

        Task<List<TripDto>> GetAllAsync();

        Task<List<TripDto>> GetAllFromLineAsync(string lineId);

        Task<List<TripDto>> AddManyAsync(List<TripDto> list);

        Task<TripDto> AddWithouCommitAsync(TripDto dto);

        Task<Int32> CommitChanges();

        Task<Int32> getDurationPath(string pathCode);

        Task<List<Trip>> GetAllByCodeAsync(List<string> listTripsCode);

    }

}