const MapperClass = require('../core/infra/Mapper');
const TripDTO = require('../dto/TripDTO');

const TripMapClass = function() {
    MapperClass.apply(this, arguments);
};

TripMapClass.prototype = Object.create(MapperClass.prototype);
TripMapClass.prototype.constructor = TripMapClass;

TripMapClass.prototype.toDTO = function(trip) {

    try {
        
        TripDTO.Code = trip.Code;
        TripDTO.Orientation = trip.Orientation;
        TripDTO.Line = trip.Line;
        TripDTO.Path = trip.Path;
		TripDTO.Time = trip.Time;

        return TripDTO;
    }
        catch(error) {
        console.log(error.details[0].message);
        return null;
    }
}

TripMapClass.prototype.toDtoMDV = function(trip) {

    try {

        TripDTO.Code = trip.code;
        TripDTO.Orientation = trip.orientation;
        TripDTO.Line = trip.line;
        TripDTO.Path = trip.path;
        TripDTO.Time = trip.time;

        return TripDTO;
    }
    catch(error) {
        console.log(error.details[0].message);
        return null;
    }
}

TripMapClass.prototype.toDTOs = function(trips) {

    try {

        let tripsDTO = [], i = 0;

        while(trips[i] !== undefined) {
            tripsDTO[i] = Object.assign({}, this.toDtoMDV(trips[i]));
            i++;
        }

        return tripsDTO;
    }
    catch(error) {
        console.log(error.details[0].message);
        return undefined;
    }
}

TripMapClass.prototype.toDTO2 = function(trip) {

    try {

        TripDTO.Line = trip.Line;
        TripDTO.StartHour = trip.StartHour;
        TripDTO.Frequence = trip.Frequence;
        TripDTO.TripsNumber = trip.TripsNumber;
        TripDTO.Path = trip.Path;
        TripDTO.ReturnPath = trip.returnPath;

        return TripDTO;
    }
        catch(error) {
        console.log(error.details[0].message);
        return null;
    }
}

module.exports = TripMapClass;