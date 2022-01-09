const sinon = require('sinon');
const pathNodeServiceClass = require('../../src/services/pathNodeService');
const pathNodeRepoClass = require('../../src/repos/pathNodeRepo');
const pathNodeSchemaClass = require('../../src/models/pathNode');
const nodesSchemaClass = require('../../src/models/node');

describe('pathNode service and repo integration', function () {

    afterEach(function () {
        sinon.restore();
    })
/*
    it('createpathNode: returns dto with code+duration+distance+node values', async function () {

        let dto = {
            "code": "NS01", "duration": 100, "distance": 100, "node":"ALT"
        }

        sinon.stub(pathNodeSchemaClass, "findOne").returns(false);
        sinon.stub(nodesSchemaClass, "findOne").returns(true);
        const pathNodeRepoInstance = new pathNodeRepoClass(pathNodeSchemaClass);
        const serviceInstance = new pathNodeServiceClass(pathNodeRepoInstance);
        let newDto = await serviceInstance.createpathNode(dto);

        sinon.assert.match(newDto, { "code": "NS01", "duration": 100, "distance": 100, "node":"ALT" });
    })
*/
    it('createpathNode: returns returns null', async function () {

        let dto = {
            "code": "NS01", "duration": 100, "distance": 100, "node":"ALT"
        }

        sinon.stub(pathNodeSchemaClass, "findOne").returns(true);

        const pathNodeRepoInstance = new pathNodeRepoClass(pathNodeSchemaClass);
        const serviceInstance = new pathNodeServiceClass(pathNodeRepoInstance);
        let newDto = await serviceInstance.createpathNode(dto);

        sinon.assert.match(newDto, null);
    })
})