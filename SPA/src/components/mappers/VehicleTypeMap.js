const MapperClass = require("../core/infra/Mapper");
const VehicleTypeDTO = require("../dto/VehicleTypeDTO");

const VehicleTypeMapClass = function () {
  MapperClass.apply(this, arguments);
};

VehicleTypeMapClass.prototype = Object.create(MapperClass.prototype);
VehicleTypeMapClass.prototype.constructor = VehicleTypeMapClass;

VehicleTypeMapClass.prototype.toDTO = function (vehicleType) {
  try {
    VehicleTypeDTO.code = vehicleType.code;
    VehicleTypeDTO.name = vehicleType.name;
    VehicleTypeDTO.autonomy = vehicleType.autonomy;
    VehicleTypeDTO.cost = vehicleType.cost;
    VehicleTypeDTO.avgSpeed = vehicleType.avgSpeed;
    VehicleTypeDTO.energy = vehicleType.energy;
    VehicleTypeDTO.emission = vehicleType.emission;
    VehicleTypeDTO.consumption = vehicleType.consumption;

    return VehicleTypeDTO;
  } catch (error) {
    console.log(error.details[0].message);
    return null;
  }
};

module.exports = VehicleTypeMapClass;
