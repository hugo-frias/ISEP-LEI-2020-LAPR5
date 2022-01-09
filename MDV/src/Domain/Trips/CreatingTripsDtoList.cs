using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.Trips
{
    public class CreatingTripsDtoList
    {
        public CreatingTripDto[] Trips { get; private set; }

        public CreatingTripsDtoList(CreatingTripDto[] trips)
        {
            this.Trips = trips;
        }
    }
}