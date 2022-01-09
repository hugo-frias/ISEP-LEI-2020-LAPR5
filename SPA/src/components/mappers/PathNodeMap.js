const MapperClass = require('../core/infra/Mapper');
const PathNodeDTO = require('../dto/PathNodeDTO');

const PathNodeMapClass = function() {
    MapperClass.apply(this, arguments);
};

PathNodeMapClass.prototype = Object.create(MapperClass.prototype);
PathNodeMapClass.prototype.constructor = PathNodeMapClass;

PathNodeMapClass.prototype.toDTO = function(pathNode) {

    try {
        PathNodeDTO.code = pathNode.code;
        PathNodeDTO.duration = pathNode.duration;
        PathNodeDTO.distance = pathNode.distance;
        PathNodeDTO.node = pathNode.node;
        return PathNodeDTO;
    } catch(error) {
        console.log(error.details[0].message);
        return null;
    }
}

module.exports = PathNodeMapClass;