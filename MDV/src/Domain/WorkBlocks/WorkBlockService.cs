using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.VehicleDuties;
using System.Linq;
using System.Net.Http;
using System;
using System.Text;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net.Http.Json;

namespace DDDSample1.Domain.WorkBlocks
{
    public class WorkBlockService: IWorkBlockService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWorkBlockRepository _repo;

        private readonly IVehicleDutyRepository _vdRepo;

        
        private static readonly HttpClient client = new HttpClient();

        public WorkBlockService(IUnitOfWork unitOfWork, IWorkBlockRepository repo, IVehicleDutyRepository vdRepo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._vdRepo = vdRepo;
        }

       

        public async Task<WorkBlockDto> GetByIdAsync(WorkBlockId id)
        {
            var workBlock = await this._repo.GetByIdAsync(id);
            if (workBlock == null)
                return null;

            return WorkBlockMapper.toDTO(workBlock);
        }

        public async Task<List<WorkBlockDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<WorkBlockDto> listDto = list.ConvertAll<WorkBlockDto>(workBlock => WorkBlockMapper.toDTO(workBlock));
            return listDto;
        }

        public async Task<List<WorkBlockDto>> getFilteredWorkblocks(WorkBlockId workblockId){
            List<WorkBlock> finalWorkBlocksList = new List<WorkBlock>();
            WorkBlock workBlockDomain = await this._repo.GetByIdAsync(workblockId);
            WorkBlockDto workBlockDto  =  WorkBlockMapper.toDTO(workBlockDomain);
            VehicleDuty vdWithoutWorkblocks =  await this._vdRepo.getVehicleDutyByWorkBlock(workblockId);
            VehicleDuty vdWithWorkblocks = await this._vdRepo.getVehicleDutyWithWorkblocks(vdWithoutWorkblocks.Id);
            //List<WorkBlock> workBlocksWithSameStartTime = await this._repo.getWorkBlocksByStartTime(workBlockDomain.EndTime);
            //List<WorkBlock> listWithoutDuplicates = workBlocksWithSameStartTime.Union(vdWithWorkblocks.WorkBlocks).ToList();

            HttpResponseMessage response = await client.GetAsync("http://localhost:8080/api/node?filter=specific&filterValue="+workBlockDomain.EndNode);
            string responseStr = await response.Content.ReadAsStringAsync();
            string[] responseSplitted = responseStr.Split(":");
            //Console.WriteLine(responseStr);
            string isReliefPointValue = responseSplitted[responseSplitted.Length-1]; 
            isReliefPointValue = isReliefPointValue.Remove(isReliefPointValue.Length-1);
            //Console.WriteLine(isReliefPointValue+"-true");
            if(isReliefPointValue == "true"){
            List<WorkBlock> workBlocksWithSameStartNode = await this._repo.getWorkBlocksByStartNode(workBlockDomain.EndNode);
            //Console.WriteLine(workBlocksWithSameStartNode.Count);
            finalWorkBlocksList = workBlocksWithSameStartNode.Union(vdWithWorkblocks.WorkBlocks).ToList();
            } else{
            //Console.WriteLine("Entrou");
                finalWorkBlocksList = vdWithWorkblocks.WorkBlocks;
            }
            vdWithWorkblocks.WorkBlocks.Remove(workBlockDomain);
            List<WorkBlockDto> listDto = finalWorkBlocksList.ConvertAll<WorkBlockDto>(workBlock => WorkBlockMapper.toDTO(workBlock));            
            return listDto;
        }

        public async Task<WorkBlockDto> AddWithouCommitAsync(WorkBlockDto dto)
        {
            var workBlock = WorkBlockMapper.toDomain(dto);

            await this._repo.AddAsync(workBlock);

            return WorkBlockMapper.toDTO(workBlock);
        }

        public async Task<Int32> CommitChanges() {
            return await this._unitOfWork.CommitAsync();
        }

        public async Task<List<WorkBlock>> GetAllByCodeAsync(List<string> listWorkBlocksCode)
        {
            var list = await this._repo.GetAllByCodeAsync(listWorkBlocksCode);   
            return list;
        }
    }
}