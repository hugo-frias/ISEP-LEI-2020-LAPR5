using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.WorkBlocks;
using System.Linq;

namespace DDDSample1.Domain.DriverDuties
{
    public class DriverDuty : Entity<DriverDutyId>, IAggregateRoot
    {

        private static Random random = new Random();
        public string Code { get; private set; }
        public string Name { get; private set; }

        public string Color { get; private set; }

        public List<WorkBlock> WorkBlocks { get; private set; }

        public DriverDuty()
        {

        }

        public DriverDuty(string code, string name, string color, List<WorkBlock> workBlocks)
        {
            this.Id = new DriverDutyId(Guid.NewGuid());



            this.Code = code;

            if (name == null)
                throw new BusinessRuleValidationException("Name shouldn't be null.");
            this.Name = name;

            if (color == null)
                throw new BusinessRuleValidationException("Color shouldn't be null.");
            this.Color = color;
            if (workBlocks == null)
                throw new BusinessRuleValidationException("WorkBlock list shouldn't be null and have to match the criteria.");
            this.WorkBlocks = workBlocks;
        }

        public DriverDuty(DriverDutyId id,string code, string name, string color, List<WorkBlock> workBlocks)
        {
            this.Id = id;

            this.Code = code;


            if (name == null)
                throw new BusinessRuleValidationException("Name shouldn't be null.");
            this.Name = name;

            if (color == null)
                throw new BusinessRuleValidationException("Color shouldn't be null.");
            this.Color = color;
            if (workBlocks == null)
                throw new BusinessRuleValidationException("WorkBlock list shouldn't be null and have to match the criteria.");
            this.WorkBlocks = workBlocks;
        }

    }

}