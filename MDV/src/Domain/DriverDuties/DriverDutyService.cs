using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using System;
using DDDSample1.Domain.WorkBlocks;
using DDDSample1.Domain.DriverDuties;

namespace DDDSample1.Domain.DriverDuties
{
    public class DriverDutyService : IDriverDutyService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDriverDutyRepository _repo;
        private readonly IWorkBlockRepository _workBlockRepo;

        public DriverDutyService(IUnitOfWork unitOfWork, IDriverDutyRepository repo, IWorkBlockRepository workBlockRepo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._workBlockRepo = workBlockRepo;
        }

        public async Task<DriverDutyDto> AddAsync(CreatingDriverDutyDto obj)
        {
            
            List<WorkBlock> workBlockList = new List<WorkBlock>();

            foreach (var workBlockId in obj.WorkBlocks)
            {   
                workBlockList.Add(await this._workBlockRepo.GetByIdAsync(new WorkBlockId(workBlockId)));
                Console.WriteLine(workBlockList.Count);
            }

            int workLoad = 0;
            foreach (WorkBlock workBlock in workBlockList)
            {
                Console.WriteLine(workLoad);
                workLoad += workBlock.EndTime - workBlock.StartTime;
            }

            if(workLoad>8*60*60){
                return null;
            }

            var dto = DriverDutyMapper.toDTO(obj,workBlockList);
           

            var driverDuty = DriverDutyMapper.toDomain(dto);
             

            await this._repo.AddAsync(driverDuty);

            await this._unitOfWork.CommitAsync();

            return DriverDutyMapper.toDTO(driverDuty);
        }

        public async Task<DriverDutyDto> GetByIdAsync(DriverDutyId id)
        {
            var driverDuty = await this._repo.GetByIdAsync(id);
            if (driverDuty == null)
                return null;

            return DriverDutyMapper.toDTO(driverDuty);
        }

        public async Task<List<DriverDutyDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<DriverDutyDto> listDto = list.ConvertAll<DriverDutyDto>(driverDuty => DriverDutyMapper.toDTO(driverDuty));
            return listDto;
        }

        public async Task<DriverDutyDto> AddWithouCommitAsync(DriverDutyDto dto)
        {
            var driverDuty = DriverDutyMapper.toDomain(dto);

            await this._repo.AddAsync(driverDuty);

            return DriverDutyMapper.toDTO(driverDuty);
        }

        public async Task<Int32> CommitChanges() {
            return await this._unitOfWork.CommitAsync();
        }

    }
}