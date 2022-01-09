using System;
using System.Collections.Generic;
using DDDSample1.Domain.VehicleDuties;
using DDDSample1.Domain.WorkBlocks;
 

namespace DDDSample1.Domain.DriverDuties
{
    public class DriverDutyMapper
    {
        public static DriverDutyDto toDTO(CreatingDriverDutyDto obj)
        {   
            List<WorkBlock> workBlocks = new List<WorkBlock>();
            return new DriverDutyDto(obj.Code, obj.Name, obj.Color, workBlocks);
        }

        public static DriverDutyDto toDTO(DriverDuty obj)
        {
            List<WorkBlock> workBlocks = new List<WorkBlock>();

            return new DriverDutyDto(obj.Id.AsString(),  obj.Code, obj.Name, obj.Color, workBlocks);
        }
        
        public static DriverDutyDto toDTO(CreatingDriverDutyDto obj, List<WorkBlock> workBlocks )
        {

            return new DriverDutyDto( obj.Code, obj.Name, obj.Color, workBlocks);
        }



        public static DriverDuty toDomain(DriverDutyDto dto)
        {
            if(dto.Id==null){
            return new DriverDuty(dto.Code,dto.Name, dto.Color, dto.WorkBlocks);
            }
            return new DriverDuty(new DriverDutyId(dto.Id), dto.Code, dto.Name, dto.Color, dto.WorkBlocks);
        }
    }
}