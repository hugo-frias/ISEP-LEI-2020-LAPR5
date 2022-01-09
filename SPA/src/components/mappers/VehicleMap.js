const MapperClass = require("../core/infra/Mapper");
const VehicleDTO = require("../dto/VehicleDTO");

const VehicleMapClass = function () {
  MapperClass.apply(this, arguments);
};

VehicleMapClass.prototype = Object.create(MapperClass.prototype);
VehicleMapClass.prototype.constructor = VehicleMapClass;

VehicleMapClass.prototype.toDTO = function (vehicle) {
  try {
    VehicleDTO.matricula = vehicle.matricula;
    VehicleDTO.vin = vehicle.vin;
    VehicleDTO.vehicleType = vehicle.vehicleTypes;

    return VehicleDTO;
  } catch (error) {
    console.log(error.details[0].message);
    return null;
  }
};

module.exports = VehicleMapClass;
