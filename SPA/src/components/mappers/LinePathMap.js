const MapperClass = require('../core/infra/Mapper');
const LinePathDTO = require('../dto/linePathDTO');
const LinePathDomain = require('../domain/linePath');

const LinePathMapClass = function () {
    MapperClass.apply(this, arguments);
};

LinePathMapClass.prototype = Object.create(MapperClass.prototype);
LinePathMapClass.prototype.constructor = LinePathMapClass;

LinePathMapClass.prototype.toDTO = function (linePath) {
    LinePathDTO.code = linePath.code;
    LinePathDTO.path = linePath.path;
    LinePathDTO.orientation = linePath.orientation;
    LinePathDTO.line = linePath.line;
    return LinePathDTO;
}



module.exports = LinePathMapClass;