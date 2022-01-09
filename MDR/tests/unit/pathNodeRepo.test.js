const sinon = require('sinon');
const pathNodeSchemaClass = require('../../src/models/pathNode');
const nodeSchemaClass = require('../../src/models/node');
const pathNodeRepoClass = require('../../src/repos/pathNodeRepo');
const pathNodeClass = require('../../src/domain/pathNode');
const pathNode = require('../../src/domain/pathNode');
const pathNodeInstance = new pathNodeClass();

describe('path node repo', function (){
    afterEach(function () {
        sinon.restore();
    })
/*
    it('savepathNode: return domain object with code+duration+distance+node', async function () {
        let dto = {
            code: "NS01",
            duration: 100,
            distance: 100,
            node: "ALT"
        }

        let object = pathNodeInstance.create(dto);
        sinon.stub(pathNodeSchemaClass, "findOne").returns(false);
        sinon.stub(nodeSchemaClass, "findOne").returns(true);
        let repoInstance = new pathNodeRepoClass(pathNodeSchemaClass);
        let newObject = await repoInstance.savepathNode(object);
        sinon.assert.match(newObject, pathNodeInstance.create(dto));
    })
*/
    it('savepathNode: returns null', async function () {
        let dto = {
            code: "NS01",
            duration: 100,
            distance: 100,
            node: "ALT"
        }

        let object = pathNodeInstance.create(dto);
        sinon.stub(pathNodeSchemaClass, "findOne").returns(true);
        let repoInstance = new pathNodeRepoClass(pathNodeSchemaClass);
        let newObject = await repoInstance.savepathNode(object);
        sinon.assert.match(newObject, null);
    })
})
