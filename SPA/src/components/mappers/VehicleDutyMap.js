const MapperClass = require('../core/infra/Mapper');
const VehicleDutyDTO = require('../dto/VehicleDutyDTO');

const VehicleDutyMapClass = function() {
    MapperClass.apply(this, arguments);
};

VehicleDutyMapClass.prototype = Object.create(MapperClass.prototype);
VehicleDutyMapClass.prototype.constructor = VehicleDutyMapClass;

VehicleDutyMapClass.prototype.toDTO = function(vehicleDuty) {

    try {
        VehicleDutyDTO.code = vehicleDuty.code
        VehicleDutyDTO.description = vehicleDuty.description;
        return VehicleDutyDTO;
    } catch(error) {
        console.log(error.details[0].message);
        return null;
    }
}

module.exports = VehicleDutyMapClass;