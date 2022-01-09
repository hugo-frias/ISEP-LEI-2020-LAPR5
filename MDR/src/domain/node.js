const AggregateRoot = require('../core/domain/AggregateRoot');

module.exports = class Node extends AggregateRoot {

    constructor(nodeName, nodeShortName, nodeLatitude, nodeLongitude, nodeIsDepot, nodeIsReliefPoint, nodeModel) {
        super(nodeName, nodeShortName, nodeLatitude, nodeLongitude, nodeIsDepot, nodeIsReliefPoint, nodeModel);

    }

    get ShortName() {
        return this._id;
    }

    get Name() {
        return this._props.Name;
    }

    get Latitude() {
        return this._props.Latitude;
    }

    get Longitude() {
        return this._props.Longitude;
    }

    get IsDepot() {
        return this._props.IsDepot;
    }

    get IsReliefPoint() {
        return this._props.IsReliefPoint;
    }
    get Model() {
        return this._props.Model;
    }

    create(nodeDTO) {
        let ShortName = nodeDTO.ShortName;
        let Name = nodeDTO.Name;
        let Latitude = nodeDTO.Latitude;
        let Longitude = nodeDTO.Longitude;
        let IsDepot = nodeDTO.IsDepot;
        let IsReliefPoint = nodeDTO.IsReliefPoint;
        let Model = nodeDTO.Model

        return new Node({Name, Latitude, Longitude, IsDepot, IsReliefPoint, Model}, ShortName);
    }
}