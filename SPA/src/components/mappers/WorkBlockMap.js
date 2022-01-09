const MapperClass = require('../core/infra/Mapper');
const WorkBlockDTO = require('../dto/WorkBlockDTO');

const WorkBlockMapClass = function() {
    MapperClass.apply(this, arguments);
};

WorkBlockMapClass.prototype = Object.create(MapperClass.prototype);
WorkBlockMapClass.prototype.constructor = WorkBlockMapClass;

WorkBlockMapClass.prototype.toDTO = function(workBlock) {

    try {

        WorkBlockDTO.StartTime = workBlock.startTime;
        WorkBlockDTO.StartNode = workBlock.startNode;
        WorkBlockDTO.EndNode = workBlock.endNode;
        WorkBlockDTO.VehicleDuty = workBlock.vehicleDuty;
        WorkBlockDTO.Trips = workBlock.trips;
        WorkBlockDTO.IsCrewTravelTime = workBlock.isCrewTravelTime;
        WorkBlockDTO.IsActive = workBlock.isActive;
        WorkBlockDTO.NumMaxBlocks = workBlock.numMaxBlocks;
        WorkBlockDTO.BlockDuration = workBlock.blockDuration;
        return WorkBlockDTO;
    }
        catch(error) {
        console.log(error.details[0].message);
        return null;
    }
}

WorkBlockMapClass.prototype.toDTO2 = function(workBlock) {

    try {

        WorkBlockDTO.startTime = workBlock.startTime;
        WorkBlockDTO.endTime = workBlock.endTime;
        WorkBlockDTO.startNode = workBlock.startNode;
        WorkBlockDTO.endNode = workBlock.endNode;
        WorkBlockDTO.isCrewTravelTime = workBlock.isCrewTravelTime;
        WorkBlockDTO.isActive = workBlock.isActive;

        return WorkBlockDTO;
    }
        catch(error) {
        console.log(error.details[0].message);
        return null;
    }
}

module.exports = WorkBlockMapClass;