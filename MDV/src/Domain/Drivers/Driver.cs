using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Drivers
{
    public class Driver : Entity<DriverId>, IAggregateRoot
    {
        public string MechanographicNumber { get; private set; }

        public string Name { get; private set; }

        public DateTime DateBirth { get; private set; }

        public int CitizenCardNumber { get; private set; }

        public int NIF { get; private set; }

        public int DrivingLicenseNumber { get; private set; }

        public DateTime DrivingLicenseExpirationDate { get; private set; }

        public List<DriverTypeElement> DriverTypes { get; private set; }

        public DateTime EntryDateCompany { get; private set; }

        public DateTime DepartureDateCompany { get; private set; }

        public bool Active { get; private set; }

        private Driver()
        {
            this.Active = true;
        }

        public Driver(string mechanographicNumber, string name, DateTime dateBirth, int citizenCardNumber, int NIF, int drivingLicenseNumber, DateTime drivingLicenseExpirationDate, List<string> driverTypes, DateTime entryDateCompany, DateTime departureDateCompany)
        {

            Regex rxMechanographicNumber = new Regex(@"^[a-zA-Z0-9]{9}$");
            Regex rxCitizenCardNumber = new Regex(@"^[0-9]{8}$");
            Regex rxNIF = new Regex(@"^[0-9]{9}$");
            Regex rxDrivingLicenseNumber = new Regex(@"^[0-9]{9}$");

            if (mechanographicNumber == null || !rxMechanographicNumber.IsMatch(mechanographicNumber))
                throw new BusinessRuleValidationException("Mechanographic number shouldn't be null and have to match the criteria.");
            this.MechanographicNumber = mechanographicNumber;

            this.Id = new DriverId(Guid.NewGuid());

            if (name == null)
                throw new BusinessRuleValidationException("Name shouldn't be null.");
            this.Name = name;

            verifyIfDateIsInferiorThanActual(dateBirth, "Date birth shouldn't be null and should be less than the actual date.");
            this.DateBirth = dateBirth;

            verifyIntWithRegex(citizenCardNumber, rxCitizenCardNumber, "Citizen card number should be greater than 0 and have to match the criteria.");
            this.CitizenCardNumber = citizenCardNumber;

            verifyIntWithRegex(NIF, rxNIF, "NIF should be greater than 0 and have to match the criteria.");
            this.NIF = NIF;

            verifyIntWithRegex(drivingLicenseNumber, rxDrivingLicenseNumber, "Driving license number should be greater than 0 and have to match the criteria.");
            this.DrivingLicenseNumber = drivingLicenseNumber;

            verifyIfDateIsSuperiorThanActual(drivingLicenseExpirationDate, "Driving license expiration date shouldn't be null and should be greater than the actual date.");
            this.DrivingLicenseExpirationDate = drivingLicenseExpirationDate;

            verifyIfDateIsInferiorThanActual(entryDateCompany, "The entry date in the company shouldn't be null and should be less than the actual date.");
            this.EntryDateCompany = entryDateCompany;

            verifyIfDateIsInferiorThanActual(departureDateCompany, "The departure date in the company shouldn't be null and should be less than the actual date.");
            compareEntryDateWithDeparture(entryDateCompany, departureDateCompany, "The departure date must be superior than entry date.");
            this.DepartureDateCompany = departureDateCompany;

            addDriverTypes(driverTypes);

            this.Active = false;
        }

        private void addDriverTypes(List<string> driverTypes)
        {
            this.DriverTypes = new List<DriverTypeElement>();

            if (driverTypes.Count == 0)
            {
                throw new BusinessRuleValidationException("There must be at least one driver type associated.");
            }

            foreach (string driverType in driverTypes)
            {
                DriverTypeElement element = new DriverTypeElement(driverType);
                this.DriverTypes.Add(element);
            }
        }

        private void verifyIfDateIsInferiorThanActual(DateTime date, string message)
        {
            if (DateTime.Compare(date, DateTime.Now) >= 0)
                throw new BusinessRuleValidationException(message);
        }

        private void verifyIfDateIsSuperiorThanActual(DateTime date, string message)
        {
            if (DateTime.Compare(date, DateTime.Now) <= 0)
                throw new BusinessRuleValidationException(message);
        }

        private void verifyIntWithRegex(int number, Regex regex, string message)
        {
            if (number <= 0 || !regex.IsMatch(number.ToString()))
                throw new BusinessRuleValidationException(message);
        }

        private void compareEntryDateWithDeparture(DateTime entry, DateTime departure, string message)
        {
            DateTime start = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            if (DateTime.Compare(departure, start) > 0)
            {
                if (DateTime.Compare(departure, entry) <= 0)
                    throw new BusinessRuleValidationException(message);
            }
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}