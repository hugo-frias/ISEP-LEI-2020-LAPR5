const DriverTypeServiceClass = require('../services/driverTypeService');
const DriverTypeServiceInstance = new DriverTypeServiceClass();
const LineServiceClass = require('../services/lineService');
const LineServiceInstance = new LineServiceClass();
const LinePathServiceClass = require('../services/linePathService');
const LinePathServiceInstance = new LinePathServiceClass();
const NodeServiceClass = require('../services/nodeService');
const NodeServiceInstance = new NodeServiceClass();
const PathServiceClass = require('../services/pathService');
const PathServiceInstance = new PathServiceClass();
const pathNodeServiceClass = require('../services/pathNodeService');
const pathNodeServiceInstance = new pathNodeServiceClass();
const VehicleTypeServiceClass = require('../services/vehicleTypeService');
const VehicleTypeServiceInstance = new VehicleTypeServiceClass();

const LinesDTO = require('../dto/lineDTO');
let lineDTO = Object.create(LinesDTO);

const LinePathsDTO = require('../dto/linePathDTO');
let linePathDTO = Object.create(LinePathsDTO);

const PathsDTO = require('../dto/pathDTO');
let pathDTO = Object.create(PathsDTO);

const PathNodesDTO = require('../dto/pathNodeDTO');
let pathNodeDTO = Object.create(PathNodesDTO);

const NodeMap = require('../mappers/NodeMap');
let nodeInstance = new NodeMap();

var config = require('../config');
const axios = require('axios');
const https = require('https');
const xml2js = require('xml2js');
const convert = require('xml-js');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');


module.exports = class GLXFileController {

    vetor = [];

    constructor(newInstance) {
        if (newInstance == undefined) {
            this.serviceInstance = null;
        } else {
            this.serviceInstance = newInstance;
        }
    }

    async importGLX(req, res, next) {
        try {

            let glx = require('fs').readFileSync(req.file.destination + req.file.filename, 'utf-8');
            let json1 = JSON.parse(convert.xml2json(glx, { compact: true, spaces: 3 }));

            this.importNodes(json1,res);
            this.importLinesAndLinePaths(json1,res);
            this.importPathsAndPathNodes(json1,res);
            this.importTrips(json1);
            return res.status(200).send("Import Successfull");

        } catch (err) {
            next(err);
            this.showError(err,res);
        }
    }

    showError(message, res) {
        return res.status(400).send(message);
    }

    importNodes(json1, res) {
        this.vetor = [];
        Promise.all(json1.GlDocumentInfo.world.GlDocument.GlDocumentNetwork.Network.Nodes.Node.map(async node => {
            let nodeString = JSON.stringify(node._attributes, ["Name", "ShortName", "Latitude", "Longitude", "IsDepot", "IsReliefPoint"]);
            let nodeKey = JSON.stringify(node._attributes, ["key"]); //import path e pathnodes
            let nJSON = JSON.parse(nodeKey);
            let nodeJSON = JSON.parse(nodeString);
            this.vetor.push([nJSON.key, nodeJSON.ShortName]); //import paths e pathNodes
            nodeJSON.IsDepot = nodeJSON.IsDepot !== 'False';
            nodeJSON.IsReliefPoint = nodeJSON.IsReliefPoint !== 'False';
            let nodeDTO = nodeInstance.toDTO(nodeJSON);
            if (NodeServiceInstance.createNode(nodeDTO) == null) {
                this.showError("Error while importing nodes", res);
            }

        }));
    }

    importLinesAndLinePaths(json1, res) {
        Promise.all(json1.GlDocumentInfo.world.GlDocument.GlDocumentNetwork.Network.Lines.Line.map(async line => {
            let lineString = JSON.stringify(line._attributes, ["key", "Name", "Color", "LinePaths", "AllowedVehicles", "DeniedVehicles", "AllowedDrivers", "DeniedDrivers"])
            let linePathString = JSON.stringify(line.LinePaths)
            let lineJSON = JSON.parse(lineString);
            let linePathJSON = JSON.parse(linePathString);
            lineDTO.code = lineJSON.key;
            lineDTO.name = lineJSON.Name;
            lineDTO.color = lineJSON.Color;
            var linePathsAux = [];
            for (var i = 0; i < linePathJSON.LinePath.length; i++) {
                var linePathStringAux;
                linePathStringAux = JSON.stringify(linePathJSON.LinePath[i]._attributes, ["key", "Path", "Orientation"]);
                var linePathJSONAux = JSON.parse(linePathStringAux);
                linePathDTO.code = linePathJSONAux.key;
                linePathDTO.path = linePathJSONAux.Path;
                linePathDTO.orientation = linePathJSONAux.Orientation;
                linePathDTO.line = lineJSON.Name;
                linePathsAux.push(linePathDTO.code);
                if (LinePathServiceInstance.createLinePathService(linePathDTO) == null) {
                    this.showError("Error while importing line paths", res);
                }
            }
            lineDTO.linePaths = linePathsAux;
            lineDTO.allowedVehicles = lineJSON.AllowedVehicles;
            lineDTO.deniedVehicles = lineJSON.DeniedVehicles;
            lineDTO.allowedDrivers = lineJSON.AllowedDrivers;
            lineDTO.deniedDrivers = lineJSON.DeniedDrivers;
            if (LineServiceInstance.createLineService(lineDTO) == null) {
                this.showError("Error while importing lines", res);
            }
        }));
    }

    async importPathsAndPathNodes(json1, res) {
        Promise.all(json1.GlDocumentInfo.world.GlDocument.GlDocumentNetwork.Network.Paths.Path.map(async path => {
            let pathString = JSON.stringify(path._attributes, ["key", "IsEmpty", "PathNodes"]);
            let pathNodeString = JSON.stringify(path.PathNodes);
            let pathJSON = JSON.parse(pathString);
            let pathNodeJSON = JSON.parse(pathNodeString);
            pathDTO.code = pathJSON.key;
            if (pathJSON.IsEmpty == 'True') {
                pathDTO.isEmpty = true;
            }
            else {
                pathDTO.isEmpty = false;
            }
            let nome = '';
            for (var i = 0; i < pathNodeJSON.PathNode.length; i++) {
                pathNodeString = JSON.stringify(pathNodeJSON.PathNode[i]._attributes, ["key", "Node", "Duration", "Distance"]);
                var pathNodeJSONAux = JSON.parse(pathNodeString);
                for (var j = 0; j < this.vetor.length; j++) {
                    if (pathNodeJSONAux.Node == this.vetor[j][0]) {
                        nome = this.vetor[j][1];
                    }
                }
                if (!pathNodeJSONAux.hasOwnProperty("Distance") && !pathNodeJSONAux.hasOwnProperty("Duration")) {
                    pathNodeDTO.code = pathNodeJSONAux.key;
                    pathNodeDTO.node = nome;
                    pathNodeDTO.distance = null;
                    pathNodeDTO.duration = null;
                } else {
                    pathNodeDTO.code = pathNodeJSONAux.key;
                    pathNodeDTO.duration = parseInt(pathNodeJSONAux.Duration);
                    pathNodeDTO.distance = parseInt(pathNodeJSONAux.Distance);
                    pathNodeDTO.node = nome;
                }
                if (pathNodeServiceInstance.createpathNode(pathNodeDTO) == null) {               
                    this.showError("Error while importing path nodes", res);
                }
                pathDTO.pathNodes[i] = pathNodeJSON.PathNode[i]._attributes.key;
            }
            if (PathServiceInstance.createPath(pathDTO) == null) {
                this.showError("Error while importing paths", res);
            }
            pathDTO.pathNodes = [];
        }));
    }

    async importTrips(json1) {
        let trips = [];

        Promise.all(json1.GlDocumentInfo.world.GlDocument.GlDocumentSchedule.Schedule.Trips.Trip.map(async trip => {
            let passingTimesString = JSON.stringify(trip.PassingTimes);
            let tripJSON = JSON.parse(JSON.stringify(trip._attributes, ["key", "Orientation", "PassingTimes", "Line", "Path"]));
            let passingTimesJSON = JSON.parse(passingTimesString);
            if (tripJSON.Line != null) {
                let passingTimeString = JSON.stringify(passingTimesJSON.PassingTime[0]._attributes, ["Time"]);
                let passingTimeJSON = JSON.parse(passingTimeString);

                let defaultTimeNow = new Date();
                let day = defaultTimeNow.getUTCDate() + 1;
                let date = new Date(defaultTimeNow.getFullYear(), defaultTimeNow.getMonth(), day);
                let timestamp = date.getTime() + passingTimeJSON.Time * 1000;

                let JSONToSend = {
                    Code: tripJSON.key,
                    Orientation: tripJSON.Orientation,
                    Line: tripJSON.Line,
                    Path: tripJSON.Path,
                    Time: timestamp
                }

                trips.push(JSONToSend);
            }
        }));

        let TripsJSON = {
            Trips: trips
        }

        let response = await this.sendPostMDV('Trips/GLX', TripsJSON);

        console.log(response.status);

        if(response.status == 200) {
            this.importWorkBlocks(json1); 
        }
    }

    async importWorkBlocks(json1) {

        let workBlocks = [];

        Promise.all(json1.GlDocumentInfo.world.GlDocument.GlDocumentSchedule.Schedule.WorkBlocks.WorkBlock.map(async workBlock => {
            let tripsString = JSON.stringify(workBlock.Trips);
            let workBlockJSON = JSON.parse(JSON.stringify(workBlock._attributes, ["key", "StartTime", "EndTime", "StartNode", "EndNode", "IsCrewTravelTime", "IsActive"]));
            let tripsJSON = JSON.parse(tripsString);
            let trips = [];
            if (tripsJSON.ref != undefined) {
                for (var i = 0; i < tripsJSON.ref.length; i++) {
                    var tripStringAux;
                    tripStringAux = JSON.stringify(tripsJSON.ref[i]._attributes, ["key"]);
                    let tripJSONAux = JSON.parse(tripStringAux);
                    trips.push(tripJSONAux.key);
                }
            }

            workBlockJSON.IsCrewTravelTime = workBlockJSON.IsCrewTravelTime !== 'False';
            workBlockJSON.IsActive = workBlockJSON.IsActive !== 'False';

            let JSONToSend = {
                Code: workBlockJSON.key,
                StartTime: workBlockJSON.StartTime,
                EndTime: workBlockJSON.EndTime,
                StartNode: workBlockJSON.StartNode,
                EndNode: workBlockJSON.EndNode,
                IsCrewTravelTime: workBlockJSON.IsCrewTravelTime,
                IsActive: workBlockJSON.IsActive,
                Trips: trips
            }

            workBlocks.push(JSONToSend);

        }));

        let WorkBlocksJSON = {
            WorkBlocks: workBlocks
        }

        let response = await this.sendPostMDV('WorkBlocks/GLX', WorkBlocksJSON);

        console.log(response.status);

        if(response.status == 200) {
            this.importVehicleDuties(json1);
        }

    }

    async importVehicleDuties(json1) {

        let vehicleDuties = [];

        Promise.all(json1.GlDocumentInfo.world.GlDocument.GlDocumentSchedule.Schedule.VehicleDuties.VehicleDuty.map(async vehicleDuty => {
            let workBlocksString = JSON.stringify(vehicleDuty.WorkBlocks);
            let vehicleDutyJSON = JSON.parse(JSON.stringify(vehicleDuty._attributes, ["key", "Name", "Color"]));
            let workBlocksJSON = JSON.parse(workBlocksString);
            let workBlocks = [];
            if (workBlocksJSON.ref != undefined) {
                for (var i = 0; i < workBlocksJSON.ref.length; i++) {
                    var workBlockStringAux;
                    workBlockStringAux = JSON.stringify(workBlocksJSON.ref[i]._attributes, ["key"]);
                    let workBlockJSONAux = JSON.parse(workBlockStringAux);
                    workBlocks.push(workBlockJSONAux.key);
                }
            }

            let JSONToSend = {
                Code: vehicleDutyJSON.key,
                Name: vehicleDutyJSON.Name,
                Color: vehicleDutyJSON.Color,
                WorkBlocks: workBlocks
            }

            vehicleDuties.push(JSONToSend);

        }));

        let VehicleDutiesJSON = {
            VehicleDuties: vehicleDuties
        }

        let response = await this.sendPostMDV('VehicleDuties/GLX', VehicleDutiesJSON);

        console.log(response.status);

        if(response.status == 200) {
            this.importDriverDuties(json1);
        }
    }

    async importDriverDuties(json1) {

        let driverDuties = [];

        Promise.all(json1.GlDocumentInfo.world.GlDocument.GlDocumentSchedule.Schedule.DriverDuties.DriverDuty.map(async driverDuty => {
            let workBlocksString = JSON.stringify(driverDuty.WorkBlocks);
            let driverDutyJSON = JSON.parse(JSON.stringify(driverDuty._attributes, ["key", "Name", "Color"]));
            let workBlocksJSON = JSON.parse(workBlocksString);
            let workBlocks = [];
            if (workBlocksJSON.ref != undefined) {
                for (var i = 0; i < workBlocksJSON.ref.length; i++) {
                    var workBlockStringAux;
                    workBlockStringAux = JSON.stringify(workBlocksJSON.ref[i]._attributes, ["key"]);
                    let workBlockJSONAux = JSON.parse(workBlockStringAux);
                    workBlocks.push(workBlockJSONAux.key);
                }
            }

            let JSONToSend = {
                Code: driverDutyJSON.key,
                Name: driverDutyJSON.Name,
                Color: driverDutyJSON.Color,
                WorkBlocks: workBlocks
            }

            driverDuties.push(JSONToSend);

        }));

        let DriverDutiesJSON = {
            DriverDuties: driverDuties
        }

        this.sendPostMDV('DriverDuties/GLX', DriverDutiesJSON);
    }

    async sendPostMDV(URL, JSONToSend) {
        try {
            const instance = axios.create({
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                })
            });

            let response = await instance({
                url: config.MDVURL + URL,
                method: 'post',
                data: JSONToSend
            });
            return response;
        } catch (err) {
            console.log(err.message);
        }
    }
}