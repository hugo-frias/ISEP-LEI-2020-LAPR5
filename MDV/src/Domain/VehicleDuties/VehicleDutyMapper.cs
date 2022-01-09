using System;
using System.Collections.Generic;
using DDDSample1.Domain.VehicleDuties;
using DDDSample1.Domain.WorkBlocks;
 

namespace DDDSample1.Domain.VehicleDuties
{
    public class VehicleDutyMapper
    {
        public static VehicleDutyDto toDTO(CreatingVehicleDutyDto obj)
        {   
            List<WorkBlock> workBlocks = new List<WorkBlock>();

            return new VehicleDutyDto(obj.Code, obj.Name, obj.Color, workBlocks);
        }

        public static VehicleDutyDto toDTO(CreatingVehicleDutiesDto obj, List<WorkBlock> workBlocks)
        {
            return new VehicleDutyDto(obj.Code, obj.Name, obj.Color, workBlocks);
        }

        public static VehicleDutyDto toDTO(VehicleDuty obj)
        {
            List<WorkBlock> workBlocks = new List<WorkBlock>();

            return new VehicleDutyDto(obj.Id.AsString(), obj.Code, obj.Name, obj.Color, workBlocks);
        }



        public static VehicleDuty toDomain(VehicleDutyDto dto)
        {
            if(dto.Id==null){
            return new VehicleDuty(dto.Code, dto.Name, dto.Color, dto.WorkBlocks);
            }
            return new VehicleDuty(new VehicleDutyId(dto.Id), dto.Code, dto.Name, dto.Color, dto.WorkBlocks);
        }
    }
}