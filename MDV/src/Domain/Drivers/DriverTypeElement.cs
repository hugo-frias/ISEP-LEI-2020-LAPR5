using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Drivers
{
    public class DriverTypeElement
    {
        public string Value { get; private set; }

        private DriverTypeElement()
        {

        }

        public DriverTypeElement(string value)
        {
            this.Value = value;
        }
    }
}