using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.WorkBlocks;
using DDDSample1.Domain.Trips;
using System.Linq;

namespace DDDSample1.Domain.WorkBlocks
{
    public class WorkBlock : Entity<WorkBlockId>, IAggregateRoot
    {

        private static Random random = new Random();

        public string Code { get; private set; }
        public int StartTime { get; private set; }

        public int EndTime { get; private set; }

        public string StartNode { get; private set; }

        public string EndNode { get; private set; }

        public bool IsCrewTravelTime { get; private set; }

        public bool IsActive { get; private set; }

        public List<Trip> Trips { get; private set; }

        private WorkBlock()
        {
            this.IsActive = true;
        }

        public WorkBlock(int startTime, int endTime, string startNode, string endNode, bool isCrewTravelTime, bool isActive, List<Trip> trips)
        {
            if (this.Trips == null)
            {
                this.Trips = new List<Trip>();
            }

            AddTrips(trips);

            this.Id = new WorkBlockId(Guid.NewGuid());
            this.Code = "WorkBlock:"+ RandomString(10);
            this.StartTime = startTime;
            this.EndTime = endTime;
            this.StartNode = startNode;
            this.EndNode = endNode;
            this.IsCrewTravelTime = isCrewTravelTime;
            this.IsActive = isActive;
            this.Trips = trips;

        }
        
        public WorkBlock(string code, int startTime, int endTime, string startNode, string endNode, bool isCrewTravelTime, bool isActive, List<Trip> trips)
        {
            if (this.Trips == null)
            {
                this.Trips = new List<Trip>();
            }

            AddTrips(trips);

            this.Id = new WorkBlockId(Guid.NewGuid());
            this.Code = code;
            this.StartTime = startTime;
            this.EndTime = endTime;
            this.StartNode = startNode;
            this.EndNode = endNode;
            this.IsCrewTravelTime = isCrewTravelTime;
            this.IsActive = isActive;
            this.Trips = trips;

        }


        public bool toString()
        {
            Console.WriteLine("{ Id: " + this.Id + ", StartTime: " + this.StartTime + ", EndTime: " + this.EndTime + ", EndNode: " + this.EndNode +
            ", IsCrewTravelTime: " + this.IsCrewTravelTime + ", IsActive: " + this.IsActive + ", Trips: " + this.Trips + "}");
            return true;
        }

        public void AddTrips(List<Trip> TripList)
        {
            foreach (Trip trip in TripList)
            {
                this.Trips.Add(trip);
            }
        }
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

    }
}