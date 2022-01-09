using System;

namespace DDDSample1.Domain.WorkBlocks
{
    public class CreatingWorkBlocksDtoList
    {

        public CreatingWorkBlocksDto[] WorkBlocks { get; private set; }

        public CreatingWorkBlocksDtoList(CreatingWorkBlocksDto[] workBlocks)
        {
            this.WorkBlocks = workBlocks;
        }
    }
}