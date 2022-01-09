using DDDSample1.Domain.Shared;
using System.Threading.Tasks;
using DDDSample1.Domain.WorkBlocks;
using System.Collections.Generic;

namespace DDDSample1.Domain.WorkBlocks
{
    public interface IWorkBlockRepository: IRepository<WorkBlock,WorkBlockId>
    {
         Task<List<WorkBlock>> getWorkBlocksByStartNode(string EndNode);
         Task<List<WorkBlock>> GetAllByCodeAsync(List<string> listWorkBlocksCode);
    }

    
}