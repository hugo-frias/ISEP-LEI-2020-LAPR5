const MapperClass = require('../core/infra/Mapper');
const DriverTypeDTO = require('../dto/driverTypeDTO');
const DriverTypeDomain = require('../domain/driverType');

const DriverTypeMapClass = function() {  
  MapperClass.apply(this, arguments); 
};

DriverTypeMapClass.prototype = Object.create(MapperClass.prototype);  
DriverTypeMapClass.prototype.constructor = DriverTypeMapClass;

DriverTypeMapClass.prototype.toDTO = function(driverType) {
  let driverTypeDTO = Object.create(DriverTypeDTO);  
  driverTypeDTO.code = driverType.code;
  driverTypeDTO.description = driverType.description;
  return driverTypeDTO;
}

DriverTypeMapClass.prototype.toDomain = function(driverTypeSchema) {
  return DriverTypeDomain.prototype.create(driverTypeSchema);
}

DriverTypeMapClass.prototype.toPersistence = function(driverType) {
  return {
    code: driverType.code,
    description: driverType.description
  }
}

module.exports = DriverTypeMapClass;