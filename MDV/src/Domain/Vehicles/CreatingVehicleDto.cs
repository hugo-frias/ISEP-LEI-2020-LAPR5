using System;

namespace DDDSample1.Domain.Vehicles
{
    public class CreatingVehicleDto
    {

        public string Matricula { get; set; }

        public string VIN { get; set; }

        public string VehicleType { get; set; }

        public long EntryDateCompany { get; set; }

        public CreatingVehicleDto(string matricula, string vin, string vehicleType, long entryDateCompany)
        {
            this.Matricula = matricula;
            this.VIN = vin;
            this.VehicleType = vehicleType;
            this.EntryDateCompany = entryDateCompany;
        }
    }
}