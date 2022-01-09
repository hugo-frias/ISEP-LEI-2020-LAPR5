using DDDSample1.Domain.WorkBlocks;
using DDDSample1.Infrastructure.Shared;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace DDDSample1.Infrastructure.WorkBlocks
{
    public class WorkBlockRepository : BaseRepository<WorkBlock, WorkBlockId>, IWorkBlockRepository
    {
        private readonly DbSet<WorkBlock> _WorkBlocksObjs;

        public WorkBlockRepository(MDVDbContext context) : base(context.WorkBlocks)
        {
            this._WorkBlocksObjs = context.WorkBlocks;
        }

        public async Task<List<WorkBlock>> getWorkBlocksByStartNode(string EndNode)
        {   
            return  this._WorkBlocksObjs.Where(x => EndNode == x.StartNode).ToList();
        }

        public async Task<List<WorkBlock>> GetAllByCodeAsync(List<string> listWorkBlocksCode)
        {
            return await this._WorkBlocksObjs.Where(x => listWorkBlocksCode.Contains(x.Code)).ToListAsync();
        }
     }
}