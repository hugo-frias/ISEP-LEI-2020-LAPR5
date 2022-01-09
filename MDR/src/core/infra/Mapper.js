const MapperClass = function() {
    if (this.constructor === MapperClass) {  
        throw new Error("Can't instantiate abstract class!");  
    }
}

MapperClass.prototype.toDTO = function() {}
MapperClass.prototype.toDomain = function() {}
MapperClass.prototype.toPersistence = function() {}

module.exports = MapperClass;