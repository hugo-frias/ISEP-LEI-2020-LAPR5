const sinon = require('sinon');
const NodeServiceClass = require('../../src/services/nodeService');
const NodeRepoClass = require('../../src/repos/nodeRepo');
const NodeSchemaClass = require('../../src/models/node');


describe('node service and repo integration', function() {

    afterEach(function() {
        sinon.restore();
    })

    it('createNode: returns dto with with name, shortName, latitude, longitude, isDepot, isRelief values', async function() {

        let nodeDTO = {
            Name: 'Alvite',
            ShortName: 'ALT',
            Latitude: 40.9793,
            Longitude: -7.71068,
            IsDepot: true
        }

        sinon.stub(NodeSchemaClass, 'findOne').returns(false);
        let nodeRepoInstance = new NodeRepoClass(NodeSchemaClass);
        let nodeServiceInstance = new NodeServiceClass(nodeRepoInstance);
        let otherDTO = await nodeServiceInstance.createNode(nodeDTO);

        sinon.assert.match(otherDTO, {
            Name: 'Alvite',
            ShortName: 'ALT',
            Latitude: 40.9793,
            Longitude: -7.71068,
            IsDepot: true
        })

    })

    it('createNode: returns null', async function() {

        let nodeDTO = {
            name: 'Alvite',
            shortName: 'ALT',
            latitude: 40.9793,
            longitude: -7.71068,
            isDepot: true
        }

        sinon.stub(NodeSchemaClass, 'findOne').returns(true);
        let nodeRepoInstance = new NodeRepoClass(NodeSchemaClass);
        let nodeServiceInstance = new NodeServiceClass(nodeRepoInstance);
        let otherDTO = await nodeServiceInstance.createNode(nodeDTO);

        sinon.assert.match(otherDTO, null);
    })
})