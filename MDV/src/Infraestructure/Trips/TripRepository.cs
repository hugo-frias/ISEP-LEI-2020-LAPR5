using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.Trips;
using Microsoft.EntityFrameworkCore;
using DDDSample1.Infrastructure.Shared;


namespace DDDSample1.Infrastructure.Trips
{
    public class TripRepository : BaseRepository<Trip, TripId>, ITripRepository
    {   
        
        private readonly DbSet<Trip> _TripsObjs;
        
        
        public TripRepository(MDVDbContext context):base(context.Trips)
        {
            this._TripsObjs = context.Trips;
        }

        public async Task<List<Trip>> GetAllFromLineAsync(string lineId)
        {
            return await this._TripsObjs.Where(x => lineId.Equals(x.Line)).ToListAsync();
        }

        public async Task<List<Trip>> GetAllByCodeAsync(List<string> listTripsCode)
        {
            return await this._TripsObjs.Where(x => listTripsCode.Contains(x.Code)).ToListAsync();
        }
    }
}