using System;
using System.Collections.Generic;
using DDDSample1.Domain.WorkBlocks;
using DDDSample1.Domain.Trips;

namespace DDDSample1.Domain.WorkBlocks
{
    public class WorkBlockMapper
    {
        public static WorkBlockDto toDTO(CreatingMultiWorkBlocksDto obj, int endTime, List<Trip> trips)
        {
            return new WorkBlockDto(obj.StartTime, endTime, obj.StartNode, obj.EndNode, obj.IsCrewTravelTime, obj.IsActive, trips);
        }

        public static WorkBlockDto toDTO(CreatingWorkBlocksDto obj, List<Trip> trips)
        {
            return new WorkBlockDto(obj.Code, obj.StartTime, obj.EndTime, obj.StartNode, obj.EndNode, obj.IsCrewTravelTime, obj.IsActive, trips);
        }


        public static WorkBlockDto toDTO(WorkBlock obj)
        {

            List<Trip> trips = new List<Trip>();

            return new WorkBlockDto(obj.Id.AsString(), obj.Code, obj.StartTime, obj.EndTime, obj.StartNode, obj.EndNode, obj.IsCrewTravelTime, obj.IsActive, trips);
        }

        public static WorkBlock toDomain(WorkBlockDto dto)
        {
            if(dto.Code == null) {
                return new WorkBlock(dto.StartTime, dto.EndTime, dto.StartNode, dto.EndNode, dto.IsCrewTravelTime, dto.IsActive, dto.Trips);
            } else {
                return new WorkBlock(dto.Code, dto.StartTime, dto.EndTime, dto.StartNode, dto.EndNode, dto.IsCrewTravelTime, dto.IsActive, dto.Trips);
            }
        }
    }
}