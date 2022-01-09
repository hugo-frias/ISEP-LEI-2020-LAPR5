using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using DDDSample1.Domain.WorkBlocks;

namespace DDDSample1.Domain.WorkBlocks
{
    public interface IWorkBlockService
    {
        Task<WorkBlockDto> GetByIdAsync(WorkBlockId id);
        Task<List<WorkBlockDto>> GetAllAsync();
        Task<List<WorkBlockDto>> getFilteredWorkblocks(WorkBlockId workblockId);
        Task<WorkBlockDto> AddWithouCommitAsync(WorkBlockDto dto);
        Task<Int32> CommitChanges();
        Task<List<WorkBlock>> GetAllByCodeAsync(List<string> listWorkBlocksCode);
    }

}