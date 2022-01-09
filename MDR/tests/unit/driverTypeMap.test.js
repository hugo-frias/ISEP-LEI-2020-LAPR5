const sinon = require('sinon');
const DriverTypeMapClass = require('../../src/mappers/DriverTypeMap');
const DriverTypeClass = require('../../src/domain/driverType');
const driverTypeInstance = new DriverTypeClass();

describe('driver type map', function() {

    afterEach(function() {
        sinon.restore();
    })

    it('toDTO: returns dto with code+description values', function() {

        let dto = {
            code: "DT01",
            description: "One driver type"
        }

        let object = driverTypeInstance.create(dto);

        let mapInstance = new DriverTypeMapClass();
        const result = mapInstance.toDTO(object);

        sinon.assert.match(result, dto);
    })

    it('toDomain: returns domain object with code+description values', function() {

        let dto = {
            code: "DT01",
            description: "One driver type"
        }

        let object = driverTypeInstance.create(dto);

        let mapInstance = new DriverTypeMapClass();
        const result = mapInstance.toDomain(dto);

        sinon.assert.match(result, object);
    })

    it('toPersistence: returns raw object with code+description values', function() {

        let raw = {
            code: "DT01",
            description: "One driver type"
        }

        let dto = {
            code: "DT01",
            description: "One driver type"
        }

        let object = driverTypeInstance.create(dto);

        let mapInstance = new DriverTypeMapClass();
        const result = mapInstance.toPersistence(object);

        sinon.assert.match(result, raw);
    })


})