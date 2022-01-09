const sinon = require('sinon');
const pathNodeRepoClass = require('../../src/repos/pathNodeRepo');
const pathNodeRepoInstance = new pathNodeRepoClass();
const pathNodeServiceClass = require('../../src/services/pathNodeService');
const pathNodeClass = require('../../src/domain/pathNode');
const pathNodeInstance = new pathNodeClass();

describe('path node service', function () {
    afterEach(function () {
        sinon.restore();
    })

    it('createpathNode: returns dto with code+duration+distance+node', async function () {
        let dto = {
            code: "NS01",
            duration: 100,
            distance: 100,
            node: "ALT"
        }

        let struct = pathNodeInstance.create(dto);
        sinon.stub(pathNodeRepoInstance, "savepathNode").returns(struct);
        const serviceInstance = new pathNodeServiceClass(pathNodeRepoInstance);
        let newDto = await serviceInstance.createpathNode(dto);
        sinon.assert.match(newDto, { code: "NS01", duration: 100, distance: 100, node: "ALT" })
    })

    it('createpathNode: returns null', async function () {
        let dto = {
            code: 'NS01',
            duration: 100,
            distance: 100,
            node: 'ALT'
        }

        sinon.stub(pathNodeRepoInstance, "savepathNode").returns(null);
        const serviceInstance = new pathNodeServiceClass(pathNodeRepoInstance);
        let newDto = await serviceInstance.createpathNode(dto);

        sinon.assert.match(newDto, null);
    })
})