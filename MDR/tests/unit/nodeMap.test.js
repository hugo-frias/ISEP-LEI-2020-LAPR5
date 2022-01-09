const sinon = require('sinon');
const NodeMapClass = require('../../src/mappers/NodeMap');
const NodeClass = require('../../src/domain/node');

const nodeInstance = new NodeClass();

describe('node map', function() {

    afterEach(function() {
        sinon.restore();
    })

    it('toDTO: returns dto with name, shortName, latitude, longitude, isDepot, isRelief values', async function() {

        let nodeDTO = {
            Name: 'Alvite',
            ShortName: 'ALT',
            Latitude: 40.9793,
            Longitude: -7.71068,
            IsDepot: true
        }

        let object = nodeInstance.create(nodeDTO);
        let nodeMapInstance = new NodeMapClass();
        let result = nodeMapInstance.toDTO(object);

        sinon.assert.match(result, nodeDTO);

    })

    it('toDomain: returns domain object with name, shortName, latitude, longitude, isDepot, isRelief values', async function() {


        let nodeDTO = {
            name: 'Alvite',
            shortName: 'ALT',
            latitude: 40.9793,
            longitude: -7.71068,
            isDepot: true
        }

        let object = nodeInstance.create(nodeDTO);
        let nodeMapInstance = new NodeMapClass();
        let result = nodeMapInstance.toDomain(object);

        sinon.assert.match(result, object);
    })

    it('toPersistence : returns raw object with name, shortName, latitude, longitude, isDepot, isRelief values', async function() {

        let nodeRAW = {
            Name: 'Alvite',
            ShortName: 'ALT',
            Latitude: 40.9793,
            Longitude: -7.71068,
            IsDepot: true
        }

        let nodeDTO = {
            Name: 'Alvite',
            ShortName: 'ALT',
            Latitude: 40.9793,
            Longitude: -7.71068,
            IsDepot: true
        }

        let object = nodeInstance.create(nodeDTO);
        let nodeMapInstance = new NodeMapClass();
        let result = nodeMapInstance.toPersistence(object);

        sinon.assert.match(result, nodeRAW);

    })
})