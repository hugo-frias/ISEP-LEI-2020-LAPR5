const sinon = require('sinon');
const pathSchemaClass = require('../../src/models/path');
const nsSchemaClass = require('../../src/models/pathNode');
const pathRepoClass = require('../../src/repos/pathRepo');
const PathClass = require('../../src/domain/path');
const Path = require('../../src/domain/path');
const pathInstance = new PathClass();


describe('path repo', function () {
    afterEach(function () {
        sinon.restore();
    })
/** 
    it('savePath: return domain object with code+isEmpty+pathnodes', async function () {
        let pathNodeTeste= {
            code: "NS02",
            duration: 100,
            distance: 100,
            node: "Teste"
        }

        let dto = {
            code: "P01", isEmpty: "true", pathNodes: ["NS01",  pathNodeTeste.code]
        }

        let object1 = pathInstance.create(dto);
        sinon.stub(pathSchemaClass, "findOne").returns(false);
        sinon.stub(nsSchemaClass, "findOne").returns(true);
        const repoInstance1 = new pathRepoClass(pathSchemaClass);
        let newObject1 = await repoInstance1.savePath(object1);
        sinon.assert.match(newObject1, pathInstance.create(dto));
    })
*/
    it('savePath: returns null', async function () {
        let dto = {
            code: "P01", isEmpty: false, pathNodes: ["NS01", "NS02"]
        }

        let object = pathInstance.create(dto);
        sinon.stub(pathSchemaClass, "findOne").returns(true);
        const repoInstance = new pathRepoClass(pathSchemaClass);
        let newObject = await repoInstance.savePath(object);
        sinon.assert.match(newObject, null);
    });

    it('getAllPaths: returns json with 1 path with all values', async function () {

        let returned = {
            pathNodes: ["NS01", "NS02"],
            code: "P01",
            isEmpty: false
        }

        sinon.stub(pathSchemaClass, "find").returns({
            pathNodes: ["NS01", "NS02"], code: "P01",
            isEmpty: false
        });

        const repoInstance = new pathRepoClass(pathSchemaClass);
        let checker = await repoInstance.getAllPaths();

        sinon.assert.match(checker, returned);
    });

    it('getAllPaths: returns json with 2 paths with all values', async function () {

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

        sinon.stub(pathSchemaClass, "find").returns([{
            pathNodes: ["NS01", "NS02"],
            code: "P01",
            isEmpty: false
        }, {
            pathNodes: ["NS01", "NS02"],
            code: "P02",
            isEmpty: false
        }]);

        const repoInstance = new pathRepoClass(pathSchemaClass);
        let checker = await repoInstance.getAllPaths();

        sinon.assert.match(checker, returned);
    });

    it('getAllPaths: returns empty json', async function () {

        let returned = {
        }

        sinon.stub(pathSchemaClass, "find").returns({});

        const repoInstance = new pathRepoClass(pathSchemaClass);
        let checker = await repoInstance.getAllPaths();

        sinon.assert.match(checker, returned);
    });

})
