using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Vehicles
{
    public class Vehicle : Entity<VehicleId>, IAggregateRoot
    {
        public string Matricula { get; private set; }

        public string VIN { get; private set; }

        public string VehicleType { get; private set; }

        public DateTime EntryDateCompany { get; private set; }

        public bool Active { get; private set; }

        private Vehicle()
        {
            this.Active = true;
        }
        public Vehicle(string matricula, string vin, string vehicleType, DateTime entryDateCompany)
        {

            Regex rxMatricula = new Regex(@"^[A-Z]{2}-[0-9]{2}-[A-Z]{2}$");
            Regex rxMatricula2 = new Regex(@"^[0-9]{2}-[A-Z]{2}-[0-9]{2}$");

            if (matricula == null ||( !rxMatricula.IsMatch(matricula) && !rxMatricula2.IsMatch(matricula) ))
                throw new BusinessRuleValidationException("Registration shouldn't be null and have to match the criteria.");
            this.Matricula = matricula;

            this.Id = new VehicleId(Guid.NewGuid());

            if (vin == null)
                throw new BusinessRuleValidationException("VIN shouldn't be null.");
            this.VIN = vin;

            if (vehicleType == null)
                throw new BusinessRuleValidationException("Vehicle Type shouldn't be null.");
            this.VehicleType = vehicleType;

            verifyIfDateIsInferiorThanActual(entryDateCompany, "The entry date in the company shouldn't be null and should be less than the actual date.");
            this.EntryDateCompany = entryDateCompany;

            this.Active = false;
        }

        private void verifyIfDateIsInferiorThanActual(DateTime date, string message)
        {
            if (DateTime.Compare(date, DateTime.Now) >= 0)
                throw new BusinessRuleValidationException(message);
        }

    }
}