using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using System;
using DDDSample1.Domain.WorkBlocks;
using DDDSample1.Domain.Trips;

namespace DDDSample1.Domain.VehicleDuties
{
    public class VehicleDutyService : IVehicleDutyService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IVehicleDutyRepository _repo;
        private readonly ITripRepository _tripsRepo;

        public VehicleDutyService(IUnitOfWork unitOfWork, IVehicleDutyRepository repo, ITripRepository tripsRepo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._tripsRepo = tripsRepo;
        }

        public async Task<VehicleDutyDto> AddAsync(VehicleDutyDto dto)
        {
            var vehicleDuty = VehicleDutyMapper.toDomain(dto);

            await this._repo.AddAsync(vehicleDuty);

            await this._unitOfWork.CommitAsync();

            return VehicleDutyMapper.toDTO(vehicleDuty);
        }

        public async Task<VehicleDutyDto> GetByIdAsync(VehicleDutyId id)
        {
            var vehicleDuty = await this._repo.GetByIdAsync(id);
            if (vehicleDuty == null)
                return null;

            return VehicleDutyMapper.toDTO(vehicleDuty);
        }

        public async Task<List<VehicleDutyDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<VehicleDutyDto> listDto = list.ConvertAll<VehicleDutyDto>(vehicleDuty => VehicleDutyMapper.toDTO(vehicleDuty));
            return listDto;
        }

        public async Task<List<WorkBlock>> UpdateAsync(CreatingMultiWorkBlocksDto obj)
        {
            List<WorkBlock> workBlockList = new List<WorkBlock>();
            VehicleDuty vd = await _repo.getVehicleDutyWithWorkblocks(new VehicleDutyId(obj.VehicleDuty));
            if (vd == null)
            {
                return null;
            }

            int workLoad = 0;
            foreach (var workBlock in vd.WorkBlocks)
            {

                workLoad += workBlock.EndTime - workBlock.StartTime;
            }

            if (workLoad + (obj.BlockDuration * 60 * obj.NumMaxBlocks) > 24 * 60 * 60)
            {

                obj.NumMaxBlocks = (24 * 60 * 60 - workLoad) / (obj.BlockDuration * 60);
                if (obj.NumMaxBlocks == 0)
                {
                    return workBlockList;
                }
            }

            for (var i = 0; i < obj.NumMaxBlocks; i++)
            {

                int endTime = (obj.BlockDuration * 60) + obj.StartTime;
                List<Trip> tripsToAdd = new List<Trip>();
                foreach (var tripId in obj.Trips)
                {

                    Trip tripToAdd = await _tripsRepo.GetByIdAsync(new TripId(tripId));
                    tripsToAdd.Add(tripToAdd);
                }
                WorkBlockDto workBlockToPost = WorkBlockMapper.toDTO(obj, endTime, tripsToAdd);
                WorkBlock workBlockToPostDomain = WorkBlockMapper.toDomain(workBlockToPost);
                workBlockList.Add(workBlockToPostDomain);
                obj.StartTime = endTime;
            }
            vd.AddWorkBlocks(workBlockList);
            await this._unitOfWork.CommitAsync();

            return workBlockList;
        }

        public async Task<VehicleDutyDto> AddWithouCommitAsync(VehicleDutyDto dto)
        {
            var vehicleDuty = VehicleDutyMapper.toDomain(dto);

            await this._repo.AddAsync(vehicleDuty);

            return VehicleDutyMapper.toDTO(vehicleDuty);
        }

        public async Task<Int32> CommitChanges() {
            return await this._unitOfWork.CommitAsync();
        }
    }
}