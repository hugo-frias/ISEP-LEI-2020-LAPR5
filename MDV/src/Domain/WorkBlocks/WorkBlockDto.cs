using System;
using System.Collections.Generic;
using DDDSample1.Domain.Trips;

namespace DDDSample1.Domain.WorkBlocks
{
    public class WorkBlockDto
    {
        public string Id { get; private set; }

        public string Code { get; private set; }
        public int StartTime { get; private set; }

        public int EndTime { get; private set; }

        public string StartNode { get; private set; }

        public string EndNode { get; private set; }

        public bool IsCrewTravelTime { get; private set; }

        public bool IsActive { get; private set; }

        public List<Trip> Trips { get; private set; }

        public WorkBlockDto(int startTime, int endTime, string startNode, string endNode, bool isCrewTravelTime, bool isActive, List<Trip> trips)
        {
            this.Trips = new List<Trip>();
            this.StartTime = startTime;
            this.EndTime = endTime;
            this.StartNode = startNode;
            this.EndNode = endNode;
            this.IsCrewTravelTime = isCrewTravelTime;
            this.IsActive = isActive;
            this.Trips = trips;
        }

        public WorkBlockDto(string id, string code, int startTime, int endTime, string startNode, string endNode, bool isCrewTravelTime, bool isActive, List<Trip> trips)
        {
            this.Id = id;
            this.Code = code;
            this.StartTime = startTime;
            this.EndTime = endTime;
            this.StartNode = startNode;
            this.EndNode = endNode;
            this.IsCrewTravelTime = isCrewTravelTime;
            this.IsActive = isActive;
            this.Trips = trips;
        }

        public WorkBlockDto(string code, int startTime, int endTime, string startNode, string endNode, bool isCrewTravelTime, bool isActive, List<Trip> trips)
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