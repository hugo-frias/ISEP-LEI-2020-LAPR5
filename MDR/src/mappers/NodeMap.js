const MapperClass = require('../core/infra/Mapper');
const NodeDTO = require('../dto/NodeDTO');
const NodeDomain = require('../domain/node');
let defaultModel = "https://raw.githubusercontent.com/hugo-frias/testelapr/master/busstop/scene.gltf"
let defaultModelDepot = 'https://raw.githubusercontent.com/hugo-frias/testelapr/master/officeBuildingLowPoly/scene.gltf'
const NodeMapClass = function() {
    MapperClass.apply(this, arguments);
};

NodeMapClass.prototype = Object.create(MapperClass.prototype);
NodeMapClass.prototype.constructor = NodeMapClass;


NodeMapClass.prototype.toDTO = function(node) {
    NodeDTO.Name = node.Name;
    NodeDTO.ShortName = node.ShortName;
    NodeDTO.Latitude = node.Latitude;
    NodeDTO.Longitude = node.Longitude;
    NodeDTO.IsDepot = node.IsDepot;
    NodeDTO.IsReliefPoint = node.IsReliefPoint;
    if(node.Model == undefined){
        if(node.IsDepot){
            NodeDTO.Model = defaultModelDepot;
        } else{
            NodeDTO.Model = defaultModel;
        }
    } else{
        NodeDTO.Model = node.Model;
    }
    return NodeDTO;
}

NodeMapClass.prototype.toDTOs = function(nodes) {
    let nodesDTO = [], i = 0;
    while(nodes[i] !== undefined) {
        nodesDTO[i] = Object.assign({}, this.toDTO(nodes[i]));
        i++;
    }
    return nodesDTO;
}

NodeMapClass.prototype.toDomain = function(nodeSchema) {
  return NodeDomain.prototype.create(nodeSchema);
}

NodeMapClass.prototype.toPersistence = function(node) {
    return {
        Name: node.Name,
        ShortName : node.ShortName,
        Latitude : node.Latitude,
        Longitude : node.Longitude,
        IsDepot : node.IsDepot,
        IsReliefPoint : node.IsReliefPoint,
        Model : node.Model
    }
}

module.exports = NodeMapClass;