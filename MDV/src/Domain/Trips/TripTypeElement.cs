using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Trips
{
    public class TripTypeElement
    {
        public string Value { get; private set; }

        private TripTypeElement()
        {

        }

        public TripTypeElement(string value)
        {
            this.Value = value;
        }
    }
}