using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using System;
using System.Net.Http;
using Echovoice.JSON;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Trips
{
    public class TripService : ITripService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITripRepository _repo;
        private static readonly HttpClient client = new HttpClient();

        public TripService(IUnitOfWork unitOfWork, ITripRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<TripDto> AddAsync(TripDto dto)
        {
            var trip = TripMapper.ToDomain(dto);

            await this._repo.AddAsync(trip);

            await this._unitOfWork.CommitAsync();

            return TripMapper.ToDto(trip);
        }

        public async Task<TripDto> GetByIdAsync(TripId id)
        {
            var trip = await this._repo.GetByIdAsync(id);

            if (trip == null)
                return null;

            return TripMapper.ToDto(trip);
        }

        public async Task<List<TripDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<TripDto> listDto = list.ConvertAll<TripDto>(trip => TripMapper.ToDto(trip));
            return listDto;
        }

        public async Task<List<Trip>> GetAllByCodeAsync(List<string> listTripsCode)
        {
            var list = await this._repo.GetAllByCodeAsync(listTripsCode);   
            return list;
        }
        
        public async Task<List<TripDto>> GetAllFromLineAsync(string lineId)
        {
            var list = await this._repo.GetAllFromLineAsync(lineId);
            List<TripDto> listDto = list.ConvertAll<TripDto>(trip => TripMapper.ToDto(trip));
            Console.WriteLine("DTO");
            return listDto;
        }
        
        public async Task<List<TripDto>> AddManyAsync(List<TripDto> list)
        {
            for(var i = 0; i < list.Count; i++){
                var trip = TripMapper.ToDomain(list[i]);
                await this._repo.AddAsync(trip);
            }
            await this._unitOfWork.CommitAsync();
            return list;
        }

        public async Task<TripDto> AddWithouCommitAsync(TripDto dto)
        {
            var trip = TripMapper.ToDomain(dto);

            await this._repo.AddAsync(trip);

            return TripMapper.ToDto(trip);
        }

        public async Task<Int32> CommitChanges() {
            return await this._unitOfWork.CommitAsync();
        }

        public async Task<Int32> getDurationPath(string pathCode){
            HttpResponseMessage response = await client.GetAsync("https://okapi-project-isep.herokuapp.com/api/path/"+pathCode);
            string responseStr = await response.Content.ReadAsStringAsync();
            string[] pathNodesCodes = JSONDecoders.DecodeJsStringArray(responseStr);
            int durationTotal = 0;int duration=0;
            for(int i=1;i<pathNodesCodes.Length;i++){
                string code = pathNodesCodes[i].Trim('\"','"');
                HttpResponseMessage response2 = await client.GetAsync("https://okapi-project-isep.herokuapp.com/api/pathNode/"+code);
                string responseStr2 = await response2.Content.ReadAsStringAsync();
                if(responseStr2.Equals("null")){
                    duration = 0;
                }else{
                    duration=Int32.Parse(responseStr2);
                }
                durationTotal += duration;
            }
            return durationTotal;
        }
    }
}