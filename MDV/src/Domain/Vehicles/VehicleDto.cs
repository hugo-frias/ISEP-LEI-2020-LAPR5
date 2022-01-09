using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.Vehicles
{
    public class VehicleDto
    {
        public string Id { get; set; }   

        public string Matricula { get; set; }

        public string VIN { get; set; }

        public string VehicleType { get; set; }

        public DateTime EntryDateCompany { get; set; }

        public VehicleDto(string matricula, string vin,  string vehicleType, DateTime entryDateCompany)
        {
            
            this.Matricula = matricula;
            this.VIN = vin;
            this.VehicleType = vehicleType;
            this.EntryDateCompany = entryDateCompany;
        }

        public VehicleDto(string id, string matricula, string vin, string vehicleType, DateTime entryDateCompany)
        {
            this.Id = id;
            this.Matricula = matricula;
            this.VIN = vin;
            this.VehicleType = vehicleType;
            this.EntryDateCompany = entryDateCompany;
            
        }
    }
}