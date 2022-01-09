const MapperClass = require('../core/infra/Mapper');
const DriverTypeDTO = require('../dto/DriverTypeDTO');

const DriverTypeMapClass = function() {
    MapperClass.apply(this, arguments);
};

DriverTypeMapClass.prototype = Object.create(MapperClass.prototype);
DriverTypeMapClass.prototype.constructor = DriverTypeMapClass;

DriverTypeMapClass.prototype.toDTO = function(driverType) {

    try {
        DriverTypeDTO.code = driverType.code
        DriverTypeDTO.description = driverType.description;
        return DriverTypeDTO;
    } catch(error) {
        console.log(error.details[0].message);
        return null;
    }
}

module.exports = DriverTypeMapClass;