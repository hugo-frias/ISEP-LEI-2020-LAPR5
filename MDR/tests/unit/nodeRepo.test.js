const sinon = require('sinon');
const NodeSchemasClass = require('../../src/models/node');
const NodeRepoClass = require('../../src/repos/nodeRepo');
const NodeClass = require('../../src/domain/node');

const nodeInstance = new NodeClass();


describe('node repo', function() {

    afterEach(function() {
        sinon.restore();
    })

    it('saveNode: returns domain object with name, shortName, latitude, longitude, isDepot, isRelief values', async function() {

        let nodeDTO = {
            name: 'Alvite',
            shortName: 'ALT',
            latitude: 40.9793,
            longitude: -7.71068,
            isDepot: true
        }

        let object = nodeInstance.create(nodeDTO);
        sinon.stub(NodeSchemasClass, 'findOne').returns(false);
        let nodeRepoInstance = new NodeRepoClass(NodeSchemasClass);
        let otherObject = await nodeRepoInstance.saveNode(object);
        sinon.assert.match(otherObject, nodeInstance.create(nodeDTO));

    })

    it('saveNode: returns null', async function() {

        let nodeDTO = {
            name: 'Alvite',
            shortName: 'ALT',
            latitude: 40.9793,
            longitude: -7.71068,
            isDepot: true
        }

        let object = nodeInstance.create(nodeDTO);
        sinon.stub(NodeSchemasClass, 'findOne').returns(true);
        let nodeRepoInstance = new NodeRepoClass(NodeSchemasClass);
        let otherObject = await nodeRepoInstance.saveNode(object);
        sinon.assert.match(otherObject, null);

    })

})

