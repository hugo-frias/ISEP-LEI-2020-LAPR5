const MapperClass = require('../core/infra/Mapper');
const  NodeDTO = require('../dto/NodeDTO');

const NodeMapClass = function() {
    MapperClass.apply(this, arguments);
};

NodeMapClass.prototype = Object.create(MapperClass.prototype);
NodeMapClass.prototype.constructor = NodeMapClass;

NodeMapClass.prototype.toDTO = function(node) {

    try {
        NodeDTO.Name = node.Name;
        NodeDTO.ShortName = node.ShortName;
        NodeDTO.Latitude = node.Latitude;
        NodeDTO.Longitude = node.Longitude;
        NodeDTO.IsDepot = node.IsDepot;
        NodeDTO.IsReliefPoint = node.IsReliefPoint;
        NodeDTO.Model = node.Model;
        return NodeDTO;
    } catch(error) {
        console.log(error.details[0].message);
        return null;
    }
}

NodeMapClass.prototype.toDTOs = function(nodes) {
    let nodesDTO = [], i = 0;

    while(nodes[i] !== undefined) {
        NodeDTO.Name = nodes[i].Name;
        NodeDTO.ShortName = nodes[i].ShortName;
        NodeDTO.Latitude = nodes[i].Latitude;
        NodeDTO.Longitude = nodes[i].Longitude;
        NodeDTO.IsDepot = nodes[i].IsDepot;
        NodeDTO.IsReliefPoint = nodes[i].IsReliefPoint;
        nodesDTO[i] = NodeDTO;
        i++;
    }
    return nodesDTO;
}

module.exports = NodeMapClass;