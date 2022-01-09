const MapperClass = require('../core/infra/Mapper');
const LineDTO = require('../dto/lineDTO');
const LineDomain = require('../domain/line');

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

LineMapClass.prototype.toDTOs = function(lines) {
    let linesDTO = [], i = 0;
    while(lines[i] !== undefined) {
        linesDTO[i] = Object.assign({}, this.toDTO(lines[i]));
        i++;
    }
    return linesDTO;
}


LineMapClass.prototype.toDomain = function(lineSchema){
    return LineDomain.prototype.create(lineSchema);
}

LineMapClass.prototype.toPersistence = function(line){
    return{
        code: line.code,
        name: line.name,
        color: line.color,
        linePaths: line.linePaths,
        allowedVehicles: line.allowedVehicles,
        deniedVehicles: line.deniedVehicles,
        allowedDrivers: line.allowedDrivers,
        deniedDrivers: line.deniedDrivers
    }
}

module.exports = LineMapClass;