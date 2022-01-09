using System;
using System.Collections.Generic;
using DDDSample1.Domain.Vehicles;

namespace DDDSample1.Domain.Vehicles
{
    public class VehicleMapper
    {
        public static VehicleDto toDTO(CreatingVehicleDto obj)
        {
            DateTime start = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            DateTime entryDateCompany = start.AddMilliseconds(obj.EntryDateCompany).ToLocalTime();
            
            return new VehicleDto(obj.Matricula, obj.VIN, obj.VehicleType, entryDateCompany);
        }
        public static VehicleDto toDTO(Vehicle obj)
        {

            return new VehicleDto(obj.Id.AsString(), obj.Matricula, obj.VIN,obj.VehicleType, obj.EntryDateCompany);
        }

        public static Vehicle toDomain(VehicleDto dto)
        {
            return new Vehicle(dto.Matricula, dto.VIN, dto.VehicleType, dto.EntryDateCompany);
        }
    }
}