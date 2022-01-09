const sinon = require('sinon');
const PathMapClass = require('../../src/mappers/PathMap');
const PathClass = require('../../src/domain/path');
const pathInstance = new PathClass();

describe('path map', function () {

    afterEach(function () {
        sinon.restore();
    })

    it('toDTO: returns dto with code+isEmpty+pathNodes values', function () {

        let dto = {
            code: "P01",
            isEmpty: true,
            pathNodes: ["NS01", "NS02"]   
        }


        let object = pathInstance.create(dto);

        let mapInstance = new PathMapClass();
        const result = mapInstance.toDTO(object);

        sinon.assert.match(result, dto);
    })

    it('toDomain: returns domain object with code+isEmpty+pathNodes values', function () {

        let dto = {
            code: "P01",
            isEmpty: true,
            pathNodes: ["NS01", "NS02"]   
        }

        let object = pathInstance.create(dto);

        let mapInstance = new PathMapClass();
        const result = mapInstance.toDomain(dto);

        sinon.assert.match(result, object);
    })

    it('toPersistence: returns raw object with code+isEmpty+pathNodes values', function () {

        let raw = {
            code: "P01",
            isEmpty: true,
            pathNodes: ["NS01", "NS02"]   
        }

        let dto = {
            code: "P01",
            isEmpty: true,
            pathNodes: ["NS01", "NS02"]   
        }

        let object = pathInstance.create(dto);

        let mapInstance = new PathMapClass();
        const result = mapInstance.toPersistence(object);

        sinon.assert.match(result, raw);
    })


})