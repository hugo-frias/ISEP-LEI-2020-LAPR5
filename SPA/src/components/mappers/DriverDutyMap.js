const MapperClass = require('../core/infra/Mapper');
const DriverDutyDTO = require('../dto/DriverDutyDTO');

const DriverDutyMapClass = function() {
    MapperClass.apply(this, arguments);
};

DriverDutyMapClass.prototype = Object.create(MapperClass.prototype);
DriverDutyMapClass.prototype.constructor = DriverDutyMapClass;

DriverDutyMapClass.prototype.toDTO = function(driverDuty) {

    try {
        DriverDutyDTO.Code = driverDuty.code
        DriverDutyDTO.Name = driverDuty.name
        DriverDutyDTO.Color = driverDuty.color;
        DriverDutyDTO.WorkBlocks = driverDuty.workblocks;
        return DriverDutyDTO;
    } catch(error) {
        console.log(error.details[0].message);
        return null;
    }
}

module.exports = DriverDutyMapClass;