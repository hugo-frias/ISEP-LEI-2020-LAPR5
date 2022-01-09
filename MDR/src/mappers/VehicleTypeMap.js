const MapperClass = require('../core/infra/Mapper');
const VehicleTypeDTO = require('../dto/vehicleTypeDTO');
const VehicleTypeDomain = require('../domain/vehicleType');

const VehicleTypeMapClass = function () {
    MapperClass.apply(this, arguments);
};

VehicleTypeMapClass.prototype = Object.create(MapperClass.prototype);
VehicleTypeMapClass.prototype.constructor = VehicleTypeMapClass;

VehicleTypeMapClass.prototype.toDTO = function (vehicleType) {
    VehicleTypeDTO.code = vehicleType.code;
    VehicleTypeDTO.name = vehicleType.name;
    VehicleTypeDTO.autonomy = vehicleType.autonomy;
    VehicleTypeDTO.cost = vehicleType.cost;
    VehicleTypeDTO.avgSpeed = vehicleType.avgSpeed;
    VehicleTypeDTO.energy = vehicleType.energy;
    VehicleTypeDTO.emission = vehicleType.emission;
    VehicleTypeDTO.consumption = vehicleType.consumption;

    return VehicleTypeDTO;
}

VehicleTypeMapClass.prototype.toDomain = function (vehicleTypeSchema) {
    return VehicleTypeDomain.prototype.create(vehicleTypeSchema);
}

VehicleTypeMapClass.prototype.toPersistence = function (vehicleType) {
    return {
        code: vehicleType.code,
        name: vehicleType.name,
        autonomy: vehicleType.autonomy,
        cost: vehicleType.cost,
        avgSpeed: vehicleType.avgSpeed,
        energy: vehicleType.energy,
        consumption: vehicleType.consumption,
        emission: vehicleType.emission
    }
}

module.exports = VehicleTypeMapClass;