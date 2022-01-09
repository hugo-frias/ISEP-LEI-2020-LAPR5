using System;

namespace DDDSample1.Domain.DriverDuties
{
    public class CreatingDriverDutyDtoList
    {

        public CreatingDriverDutyDto[] DriverDuties { get; private set; }
        

        public CreatingDriverDutyDtoList(CreatingDriverDutyDto[] driverDuties)
        {
            this.DriverDuties = driverDuties;
        }
    }
}