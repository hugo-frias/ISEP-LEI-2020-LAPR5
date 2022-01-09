const sinon = require('sinon');
const PathServiceClass = require('../../src/services/pathService');
const pathRepoClass = require('../../src/repos/pathRepo');
const pathSchemaClass = require('../../src/models/path');
const nsSchemaClass = require('../../src/models/pathNode');

describe('path service and repo integration', function () {

    afterEach(function () {
        sinon.restore();
    })
/** 
    it('createPath: returns dto with code+isEmpty+pathNodes values', async function () {

        let dto = {
            code: "P01", isEmpty: false, pathNodes: ["NS01", "NS02"]
        }

        sinon.stub(pathSchemaClass, "findOne").returns(false);
        sinon.stub(nsSchemaClass, "findOne").returns(true);
        const pathRepoInstance = new pathRepoClass(pathSchemaClass);
        const serviceInstance = new PathServiceClass(pathRepoInstance);
        let newDto = await serviceInstance.createPath(dto);

        sinon.assert.match(newDto, { code: "P01", isEmpty: false, pathNodes: ["NS01", "NS02"] });
    })
*/
    it('createPath: returns returns null', async function () {

        let dto = {
            code: "P01", isEmpty: false, pathNodes: ["NS01", "NS02"]
        }

        sinon.stub(pathSchemaClass, "findOne").returns(true);

        const pathRepoInstance = new pathRepoClass(pathSchemaClass);
        const serviceInstance = new PathServiceClass(pathRepoInstance);
        let newDto = await serviceInstance.createPath(dto);

        sinon.assert.match(newDto, null);
    })

    // it('getPaths: returns json with 1 path with all values', async function () {

    //     let returned = {
    //         code: "P01", isEmpty: false, pathNodes: ["NS01", "NS02"]
    //     }

    //     sinon.stub(pathSchemaClass, "find").returns({
    //         code: "P01", isEmpty: false, pathNodes: ["NS01", "NS02"]
    //     });

    //     const pathRepoInstance = new pathRepoClass(pathSchemaClass);
    //     const serviceInstance = new PathServiceClass(pathRepoInstance);
    //     const checker = await serviceInstance.getPaths();

    //     sinon.assert.match(checker, returned);
    // });

    // it('getPaths: returns empty json', async function () {

    //     let returned = {}

    //     sinon.stub(pathSchemaClass, "find").returns({});

    //     const pathRepoInstance = new pathRepoClass(pathSchemaClass);
    //     const serviceInstance = new PathServiceClass(pathRepoInstance);
    //     const checker = await serviceInstance.getPaths();

    //     sinon.assert.match(checker, returned);
    // });
})