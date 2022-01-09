using System;
using System.Collections.Generic;
using DDDSample1.Domain.Trips;

namespace DDDSample1.Domain.Trips
{
    public class TripMapper
    {
        public static TripDto ToDto(CreatingTripDto obj)
        {   
            DateTime initializedDate = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            DateTime leavingHour = initializedDate.AddMilliseconds(obj.Time).ToLocalTime();
            return new TripDto(obj.Code, obj.Orientation, obj.Line, obj.Path, leavingHour);
        }
        public static TripDto ToDto(Trip obj)
        {
            return new TripDto (obj.Id.AsString(), obj.Code, obj.Orientation, obj.Line, obj.Path, obj.Time);
        }

        public static Trip ToDomain (TripDto dto)
        {
            
            return new Trip (dto.Code, dto.Orientation, dto.Line, dto.Path, dto.Time);
        }

        public static TripDto ToDto(CreatingTripsDto obj, String code, String orientation, String path, long hour)
        {   
            DateTime initializedDate = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            DateTime leavingHour = initializedDate.AddMilliseconds(hour).ToLocalTime();
            return new TripDto(code, orientation, obj.Line, path, leavingHour);
        }

        public static TripsDto TripsToDto(CreatingTripsDto obj){
            DateTime initializedDate = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            DateTime leavingHour = initializedDate.AddMilliseconds(obj.Time).ToLocalTime();
            return new TripsDto(obj.NrViagens,obj.Frequence,obj.Line,obj.PathIda,obj.PathVolta,leavingHour, obj.InParalell);
        }
    }
}