const MapperClass = require('../core/infra/Mapper');
const PathDTO = require('../dto/PathDTO');

const PathMapClass = function() {
    MapperClass.apply(this, arguments);
};

PathMapClass.prototype = Object.create(MapperClass.prototype);
PathMapClass.prototype.constructor = PathMapClass;

PathMapClass.prototype.toDTO = function(path) {

    try {
        PathDTO.code = path.code;
        PathDTO.isEmpty = path.isEmpty;
        PathDTO.pathNodes = path.pathNodes;
        return PathDTO;
    } catch(error) {
        console.log(error.details[0].message);
        return null;
    }
}

module.exports = PathMapClass;