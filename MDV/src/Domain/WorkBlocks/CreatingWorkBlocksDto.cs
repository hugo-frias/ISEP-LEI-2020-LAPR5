using System;

namespace DDDSample1.Domain.WorkBlocks
{
    public class CreatingWorkBlocksDto
    {

        public string Code { get; set; }
        public int StartTime { get; set; }

        public int EndTime {get; set;}

        public string StartNode { get; set; }

        public string EndNode { get; set; }

        public bool IsCrewTravelTime { get; set; }

        public bool IsActive { get; set; }

        public string[] Trips { get; set; }

        public CreatingWorkBlocksDto(string code, int startTime, int endTime, string startNode, string endNode, string[] trips, bool isCrewTravelTime, bool isActive)
        {
            this.Code = code;
            this.StartTime = startTime;
            this.EndTime = endTime;
            this.StartNode = startNode;
            this.EndNode = endNode;
            this.IsCrewTravelTime = isCrewTravelTime;
            this.IsActive = isActive;
            this.Trips = trips;
        }
    }
}