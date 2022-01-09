const MapperClass = require('../core/infra/Mapper');
const TripsDTO = require('../dto/TripsDTO');

const TripsMapClass = function () {
    MapperClass.apply(this, arguments);
};

TripsMapClass.prototype = Object.create(MapperClass.prototype);
TripsMapClass.prototype.constructor = TripsMapClass;

TripsMapClass.prototype.toDTO = function (trip) {
    try {

        TripsDTO.Line = trip.Line;
        TripsDTO.PathIda = trip.PathIda;
        TripsDTO.PathVolta = trip.PathVolta;
        TripsDTO.Time = trip.Time;
        TripsDTO.Frequence = trip.Frequence;
        TripsDTO.NrViagens = trip.NrViagens;
        TripsDTO.InParalell = trip.InParalell;
        return TripsDTO;
    }
    catch (error) {
        console.log("Entrou no erro");
        console.log(error.details[0].message);
        return null;
    }
}


module.exports = TripsMapClass;