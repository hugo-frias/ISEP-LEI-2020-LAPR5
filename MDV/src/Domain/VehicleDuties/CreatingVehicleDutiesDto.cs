using System;

namespace DDDSample1.Domain.VehicleDuties
{
    public class CreatingVehicleDutiesDto
    {

        public string Code { get; set; }

        public string Name { get; set; }

        public string Color { get; set; }

        public string[] WorkBlocks { get; set; }
        

        public CreatingVehicleDutiesDto(string code, string name, string color, string[] workBlocks)
        {
            this.Code = code;
            this.Name = name;
            this.Color = color;
            this.WorkBlocks = workBlocks;
        }
    }
}