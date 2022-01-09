using System;

namespace DDDSample1.Domain.WorkBlocks
{
    public class CreatingMultiWorkBlocksDto
    {

        public int StartTime { get; set; }

        public string StartNode { get; set; }

        public string EndNode { get; set; }

        public bool IsCrewTravelTime { get; set; }

        public bool IsActive { get; set; }

        public string[] Trips { get; set; }

        public string VehicleDuty { get; set; }
        public int NumMaxBlocks { get; set; }
        public int BlockDuration { get; set; }

        public CreatingMultiWorkBlocksDto(int startTime, string startNode, string endNode, string vehicleDuty, string[] trips, bool isCrewTravelTime, bool isActive, 
           int numMaxBlocks, int blockDuration)
        {
            this.StartTime = startTime;
            this.StartNode = startNode;
            this.EndNode = endNode;
            this.IsCrewTravelTime = isCrewTravelTime;
            this.IsActive = isActive;
            this.Trips = trips;
            this.VehicleDuty = vehicleDuty;
            this.NumMaxBlocks = numMaxBlocks;
            this.BlockDuration = blockDuration;
        }
    }
}