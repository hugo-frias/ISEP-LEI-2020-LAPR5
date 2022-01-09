const MapperClass = require('../core/infra/Mapper');
const PathDTO = require('../dto/pathDTO');
const PathDomain = require('../domain/path');

const PathMapClass = function(){
    MapperClass.apply(this,arguments);
}

PathMapClass.prototype = Object.create(MapperClass.prototype);
PathMapClass.prototype.constructor = PathMapClass;

PathMapClass.prototype.toDTO = function(path){
    let pathDTO = Object.create(PathDTO);
    pathDTO.code = path.code;
    pathDTO.isEmpty = path.isEmpty,
    pathDTO.pathNodes = path.pathNodes;
    return pathDTO;
}

PathMapClass.prototype.toDomain = function(pathSchema){
    return PathDomain.prototype.create(pathSchema);
}

PathMapClass.prototype.toPersistence = function(path){
    return{
        code: path.code,
        isEmpty: path.isEmpty,
        pathNodes: path.pathNodes
    }
}

module.exports = PathMapClass;