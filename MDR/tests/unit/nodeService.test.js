const sinon = require('sinon');
const NodeRepoClass = require('../../src/repos/nodeRepo');
const NodeServiceClass = require('../../src/services/nodeService');
const NodeClass = require('../../src/domain/node');

const nodeRepoInstance = new NodeRepoClass();
const nodeInstance = new NodeClass();

describe('node service', function() {

    afterEach(function() {
        sinon.restore();
    })


    it('createNode: returns dto with name, shortName, latitude, longitude, isDepot, isRelief values', async function() {

        let nodeDTO = {
            Name: 'Alvite',
            ShortName: 'ALT',
            Latitude: 40.9793,
            Longitude: -7.71068,
            IsDepot: true
        }

        let struct = nodeInstance.create(nodeDTO);
        sinon.stub(nodeRepoInstance, 'saveNode').returns(struct);
        let nodeServiceInstance = new NodeServiceClass(nodeRepoInstance);
        let otherDTO = await nodeServiceInstance.createNode(nodeDTO);
        sinon.assert.match(otherDTO, {
            Name: 'Alvite',
            ShortName: 'ALT',
            Latitude: 40.9793,
            Longitude: -7.71068,
            IsDepot: true
        });


    })

    it('createNode: returns null', async function() {

        let nodeDTO = {
            name: 'Alvite',
            shortName: 'ALT',
            latitude: 40.9793,
            longitude: -7.71068,
            isDepot: true
        }

        sinon.stub(nodeRepoInstance, 'saveNode').returns(null);
        let nodeServiceInstance = new NodeServiceClass(nodeRepoInstance);
        let otherDTO = await nodeServiceInstance.createNode(nodeDTO);
        sinon.assert.match(otherDTO, null);

    })
})