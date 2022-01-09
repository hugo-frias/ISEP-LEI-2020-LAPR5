using System;

namespace DDDSample1.Domain.VehicleDuties
{
    public class CreatingVehicleDutiesDtoList
    {

        public CreatingVehicleDutiesDto[] VehicleDuties { get; private set; }
        

        public CreatingVehicleDutiesDtoList(CreatingVehicleDutiesDto[] vehicleDuties)
        {
            this.VehicleDuties = vehicleDuties;
        }
    }
}