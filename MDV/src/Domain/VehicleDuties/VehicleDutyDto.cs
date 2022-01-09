using System;
using System.Collections.Generic;
using DDDSample1.Domain.WorkBlocks;

namespace DDDSample1.Domain.VehicleDuties
{
    public class VehicleDutyDto
    {
        public string Id { get; set; }   

        public string Code { get; set; }

        public string Name { get; set; }

        public string Color { get; set; }

        public List<WorkBlock> WorkBlocks { get; set; }

        public VehicleDutyDto(string code, string name, string color, List<WorkBlock> workBlocks)
        {
            this.WorkBlocks = new List<WorkBlock>();
            this.Code = code;
            this.Name = name;
            this.Color = color;
            this.WorkBlocks = workBlocks;
        }

        public VehicleDutyDto(string id, string code, string name,  string color, List<WorkBlock> workBlocks)
        {
            this.Id = id;
            this.Code = code;
            this.Name = name;
            this.Color = color;
            this.WorkBlocks = workBlocks;
        }
    }
}