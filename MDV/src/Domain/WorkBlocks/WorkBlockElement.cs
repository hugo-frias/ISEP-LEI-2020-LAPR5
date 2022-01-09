using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.WorkBlocks
{
    public class WorkBlockElement
    {
        public string Value { get; private set; }

        private WorkBlockElement()
        {

        }

        public WorkBlockElement(string value)
        {
            this.Value = value;
        }
    }
}