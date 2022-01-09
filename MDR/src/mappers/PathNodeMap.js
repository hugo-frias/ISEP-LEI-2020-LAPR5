const MapperClass = require('../core/infra/Mapper');
const pathNodeDomain = require('../domain/pathNode');
const pathNodeDTO = require('../dto/pathNodeDTO');

const pathNodeMapClass = function () {
    MapperClass.apply(this, arguments);
};

pathNodeMapClass.prototype = Object.create(MapperClass.prototype);
pathNodeMapClass.prototype.constructor = pathNodeMapClass;

pathNodeMapClass.prototype.toDTO = function (pathNode) {
    pathNodeDTO.code = pathNode.code;
    pathNodeDTO.duration = pathNode.duration;
    pathNodeDTO.distance = pathNode.distance;
    pathNodeDTO.node = pathNode.node;
    return pathNodeDTO;
}

pathNodeMapClass.prototype.toDomain = function (pathNodeSchema) {
    return pathNodeDomain.prototype.create(pathNodeSchema);
}

pathNodeMapClass.prototype.toPersistence = function (ns) {
    return {
        code: ns.code,
        duration: ns.duration,
        distance: ns.distance,
        node: ns.node
    }
}

module.exports = pathNodeMapClass;

