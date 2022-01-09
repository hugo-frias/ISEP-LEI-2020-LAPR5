using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.WorkBlocks;

namespace DDDSample1.Domain.VehicleDuties
{
    public class VehicleDuty : Entity<VehicleDutyId>, IAggregateRoot
    {
        public string Code { get; private set; }

        public string Name { get; private set; }

        public string Color { get; private set; }

        public List<WorkBlock> WorkBlocks { get; private set; }

        public bool Active { get; private set; }

        private VehicleDuty()
        {
            this.Active = true;
        }

        public VehicleDuty(string code, string name, string color, List<WorkBlock> workBlocks)
        {
            if(this.WorkBlocks == null){
                this.WorkBlocks = new List<WorkBlock>();
            }

            AddWorkBlocks(workBlocks);
            
            if (code == null)
                throw new BusinessRuleValidationException("Code shouldn't be null and have to match the criteria.");
            this.Code = code;

            this.Id = new VehicleDutyId(Guid.NewGuid());

            if (name == null)
                throw new BusinessRuleValidationException("Name shouldn't be null.");
            this.Name = name;

             if (color == null)
                throw new BusinessRuleValidationException("Color shouldn't be null.");
            this.Color = color;


            this.Active = false;
        }

        public VehicleDuty(VehicleDutyId id, string code, string name, string color, List<WorkBlock> workBlocks)
        {
            if(this.WorkBlocks == null){
                this.WorkBlocks = new List<WorkBlock>();
            }

            AddWorkBlocks(workBlocks);
            
            if (code == null)
                throw new BusinessRuleValidationException("Code shouldn't be null and have to match the criteria.");
            this.Code = code;

            this.Id = id;

            if (name == null)
                throw new BusinessRuleValidationException("Name shouldn't be null.");
            this.Name = name;

             if (color == null)
                throw new BusinessRuleValidationException("Color shouldn't be null.");
            this.Color = color;


            this.Active = false;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }

        public void AddWorkBlocks(List<WorkBlock> WorkBlocksList){
            foreach (WorkBlock workBlock in WorkBlocksList)
            {
                this.WorkBlocks.Add(workBlock);
            }
        }
    }
}