using System;

namespace DDDSample1.Domain.VehicleDuties
{
    public class CreatingVehicleDutyDto
    {

        public string Code { get; set; }

        public string Name { get; set; }

        public string Color { get; set; }
        

        public CreatingVehicleDutyDto(string code, string name, string color)
        {
            this.Code = code;
            this.Name = name;
            this.Color = color;
        }
    }
}