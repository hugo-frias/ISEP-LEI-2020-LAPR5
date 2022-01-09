const MapperClass = require('../core/infra/Mapper');
const DriverDTO = require('../dto/DriverDTO');

const DriverMapClass = function() {
    MapperClass.apply(this, arguments);
};

DriverMapClass.prototype = Object.create(MapperClass.prototype);
DriverMapClass.prototype.constructor = DriverMapClass;

DriverMapClass.prototype.toDTO = function(driver) {

    try {
        DriverDTO.MechanographicNumber = driver.mechanographicNumber;
        DriverDTO.Name = driver.name;
        DriverDTO.DateBirth = driver.dateBirth;
        DriverDTO.CitizenCardNumber = driver.citizenCardNumber;
        DriverDTO.NIF = driver.NIF;
        DriverDTO.DrivingLicenseNumber = driver.drivingLicenseNumber;
        DriverDTO.DrivingLicenseExpirationDate = driver.drivingLicenseExpirationDate;
        DriverDTO.DriverTypes = driver.driverTypes;
        DriverDTO.EntryDateCompany = driver.entryDateCompany;
        return DriverDTO;
    } catch(error) {
        console.log(error.details[0].message);
        return null;
    }
}

module.exports = DriverMapClass;