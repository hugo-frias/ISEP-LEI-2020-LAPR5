const sinon = require('sinon');
const VehicleTypeMapClass = require('../../src/mappers/VehicleTypeMap');
const VehicleTypeClass = require('../../src/domain/vehicleType');
const vehicleTypeInstance = new VehicleTypeClass();

describe('vehicle type map', function() {

    afterEach(function() {
        sinon.restore();
    })

    it('toDTO: returns dto with code+name+autonomy+cost+avgSpeed+energy+consumption+emission values', function() {

        let dto = {
            code: "12345678912345678900",
            name: "teste1",
            autonomy:10,
            cost: 10,
            avgSpeed:10,
            energy:1,
            consumption:10,
            emission:10
        }

        let resultDTO = {
            code: "12345678912345678900",
            name: "teste1",
            autonomy:10,
            cost: 10,
            avgSpeed:10,
            energy:"gasolina",
            consumption:10,
            emission:10
        }

       let object = vehicleTypeInstance.create(dto);

      let mapInstance = new VehicleTypeMapClass();
        const result = mapInstance.toDTO(object);

        sinon.assert.match(result, resultDTO);

    })

    it('toDomain: returns domain object with code+name+autonomy+cost+avgSpeed+energy+consumption+emission values', function() {

        let dto = {
            code: "12345678912345678900",
            name: "teste1",
            autonomy:10,
            cost: 10,
            avgSpeed: 10,
            energy:1,
            consumption:10,
            emission:10
        }

        let object = vehicleTypeInstance.create(dto);

        let mapInstance = new VehicleTypeMapClass();
        const result = mapInstance.toDomain(dto);

        sinon.assert.match(result, object);
    })

    it('toPersistence: returns raw object with code+name+autonomy+cost+avgSpeed+energy+consumption+emission values', function() {

        let raw = {
            code: "12345678912345678900",
            name: "teste1",
            autonomy:10,
            cost: 10,
            avgSpeed: 10,
            energy:"gasolina",
            consumption:10,
            emission:10
        }

        let dto = {
            code: "12345678912345678900",
            name: "teste1",
            autonomy:10,
            cost: 10,
            avgSpeed: 10,
            energy:1,
            consumption:10,
            emission:10
        }

        let object = vehicleTypeInstance.create(dto);

        let mapInstance = new VehicleTypeMapClass();
        const result = mapInstance.toPersistence(object);

        sinon.assert.match(result, raw);
    })


})