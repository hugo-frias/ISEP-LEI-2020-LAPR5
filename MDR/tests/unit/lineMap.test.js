const sinon = require('sinon');
const LineMapClass = require('../../src/mappers/lineMap');
const LineClass = require('../../src/domain/line');
const lineInstance = new LineClass();

describe('line map', function() {

    afterEach(function() {
        sinon.restore();
    })

    it('toDTO: returns dto with values', function() {

        let dto = {
            code: "CODIGO7", name: "arouca", color: "RGB(0,0,0)", 
        linePaths:["path1","path2"],allowedVehicles:["V01"],allowedDrivers:["D01"]
        }

        let object = lineInstance.create(dto);

        let mapInstance = new LineMapClass();
        const result = mapInstance.toDTO(object);

        sinon.assert.match(result, dto);
    })

    it('toDomain: returns domain object with values', function() {

        let dto = {
            code: "CODIGO7", name: "arouca", color: "RGB(0,0,0)", 
        linePaths:["path1","path2"],allowedVehicles:["V01"],allowedDrivers:["D01"]
        }

        let object = lineInstance.create(dto);

        let mapInstance = new LineMapClass();
        const result = mapInstance.toDomain(dto);

        sinon.assert.match(result, object);
    })

    it('toPersistence: returns raw object with  values', function() {

        let raw = {
            code: "CODIGO7", name: "arouca", color: "RGB(0,0,0)", 
        linePaths:["path1","path2"],allowedVehicles:["V01"],allowedDrivers:["D01"]
        }

        let dto = {
            code: "CODIGO7", name: "arouca", color: "RGB(0,0,0)", 
        linePaths:["path1","path2"],allowedVehicles:["V01"],allowedDrivers:["D01"]
        }

        let object = lineInstance.create(dto);

        let mapInstance = new LineMapClass();
        const result = mapInstance.toPersistence(object);

        sinon.assert.match(result, raw);
    })


})