const sinon = require('sinon');
const pathNodeMapClass = require('../../src/mappers/PathNodeMap');
const pathNodeClass = require('../../src/domain/pathNode');
const pathNodeInstance = new pathNodeClass();

describe('pathNode map', function () {

    afterEach(function () {
        sinon.restore();
    })

    it('toDTO: returns dto with code+duration+distance+node values', function () {

        let dto = {
            code: "NS01",
            duration: 100,
            distance: 100,
            node: "ALT"
        }


        let object = pathNodeInstance.create(dto);

        let mapInstance = new pathNodeMapClass();
        const result = mapInstance.toDTO(object);

        sinon.assert.match(result, dto);
    })

    it('toDomain: returns domain object with code+duration+distance+node values', function () {

        let dto = {
            code: "NS01",
            duration: 100,
            distance: 100,
            node: "ALT"
        }

        let object = pathNodeInstance.create(dto);

        let mapInstance = new pathNodeMapClass();
        const result = mapInstance.toDomain(dto);

        sinon.assert.match(result, object);
    })

    it('toPersistence: returns raw object with code+duration+distance+node values', function () {

        let raw = {
            code: "NS01",
            duration: 100,
            distance: 100,
            node: "ALT"
        }

        let dto = {
            code: "NS01",
            duration: 100,
            distance: 100,
            node: "ALT"
        }

        let object = pathNodeInstance.create(dto);

        let mapInstance = new pathNodeMapClass();
        const result = mapInstance.toPersistence(object);

        sinon.assert.match(result, raw);
    })


})