const MapperClass = require('../core/infra/Mapper');
const LineDTO = require('../dto/LineDTO');

const LineMapClass = function () {
    MapperClass.apply(this, arguments);
};

LineMapClass.prototype = Object.create(MapperClass.prototype);
LineMapClass.prototype.constructor = LineMapClass;

LineMapClass.prototype.toDTO = function (line) {
    LineDTO.code = line.code;
    LineDTO.name = line.name;
    LineDTO.color = line.color;
    LineDTO.linePaths = line.linePaths;
    LineDTO.allowedVehicles = line.allowedVehicles;
    LineDTO.deniedVehicles = line.deniedVehicles;
    LineDTO.allowedDrivers = line.allowedDrivers;
    LineDTO.deniedDrivers = line.deniedDrivers;
    return LineDTO;
}

module.exports = LineMapClass;