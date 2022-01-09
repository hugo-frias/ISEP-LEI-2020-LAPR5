const sinon = require('sinon');
const pathRepoClass = require('../../src/repos/pathRepo');
const pathRepoInstance = new pathRepoClass();
const PathServiceClass = require('../../src/services/pathService');
const pathClass = require('../../src/domain/path');
const pathInstance = new pathClass();

describe('path service', function () {
    afterEach(function () {
        sinon.restore();
    })

    it('createPath: returns dto with code+isEmpty+pathNodes', async function () {
        let dto = {
            pathNodes: ["NS01", "NS02"],
            code: "P01",
            isEmpty: false
        }

        let struct = pathInstance.create(dto);
        sinon.stub(pathRepoInstance, "savePath").returns(struct);
        const serviceInstance = new PathServiceClass(pathRepoInstance);
        let newDto = await serviceInstance.createPath(dto);
        sinon.assert.match(newDto, {
            pathNodes: ["NS01", "NS02"],
            code: "P01",
            isEmpty: false
        })
    })

    it('createPath: returns null', async function () {
        let dto = {
            pathNodes: ["NS01", "NS02"],
            code: "P01",
            isEmpty: false
        }

        sinon.stub(pathRepoInstance, "savePath").returns(null);
        const serviceInstance = new PathServiceClass(pathRepoInstance);
        let newDto = await serviceInstance.createPath(dto);

        sinon.assert.match(newDto, null);
    });

    // it('getPaths: returns json with 1 path with all values', async function () {

    //     let returned = {
    //         pathNodes: ["NS01", "NS02"],
    //         code: "P01",
    //         isEmpty: false
    //     }

    //     sinon.stub(pathRepoInstance, "getAllPaths").returns({
    //         pathNodes: ["NS01", "NS02"],
    //         code: "P01",
    //         isEmpty: false
    //     });

    //     const serviceInstance = new PathServiceClass(pathRepoInstance);
    //     const checker = await serviceInstance.getPaths();

    //     sinon.assert.match(checker, returned);
    // });

    it('getPaths: returns json with 2 paths with all values', async function () {

        let returned = [{
            pathNodes: ["NS01", "NS02"],
            code: "P01",
            isEmpty: false
        },
        {
            pathNodes: ["NS01", "NS02"],
            code: "P02",
            isEmpty: false
        }];

        sinon.stub(pathRepoInstance, "getAllPaths").returns([{
            pathNodes: ["NS01", "NS02"],
            code: "P01",
            isEmpty: false
        }, {
            pathNodes: ["NS01", "NS02"],
            code: "P02",
            isEmpty: false
        }]);

        const serviceInstance = new PathServiceClass(pathRepoInstance);
        const checker = await serviceInstance.getPaths();

        sinon.assert.match(checker, returned);
    });

    // it('getPaths: returns empty json', async function () {

    //     let returned = {
    //     }

    //     sinon.stub(pathRepoInstance, "getAllPaths").returns({});

    //     const serviceInstance = new PathServiceClass(pathRepoInstance);
    //     const checker = await serviceInstance.getPaths();

    //     sinon.assert.match(checker, returned);
    // });
})