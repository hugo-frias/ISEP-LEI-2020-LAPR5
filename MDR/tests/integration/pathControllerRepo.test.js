const sinon = require('sinon');
const { response, request } = require('express');
const pathServiceClass = require('../../src/services/pathService');
const PathControllerClass = require('../../src/controllers/pathController');
const pathRepoClass = require('../../src/repos/pathRepo');
const pathSchemaClass = require('../../src/models/path');
const pathNodeSchemaClass = require('../../src/models/pathNode');

describe('path ctrl and repo integration', function () {

    afterEach(function () {
        sinon.restore();
    })
    /**
    it('createPath: returns successfull code (201)', async function () {

        let body = { code: 'P01', isEmpty: false, pathNodes: ['NS01', 'NS02'] };
        let req = request;
        let res = response;
        let next = function () {
        }

        req.body = body;

        res = {
            status: sinon.spy()
        }

        let dto = { code: 'P01', isEmpty: false, pathNodes: ['NS01', 'NS02'] }

        sinon.stub(pathSchemaClass, "findOne").returns(false);
        sinon.stub(pathNodeSchemaClass, "findOne").returns(true);
        const pathRepoInstance = new pathRepoClass(pathSchemaClass);
        const pathServiceInstance = new pathServiceClass(pathRepoInstance);
        const controllerInstance = new PathControllerClass(pathServiceInstance);

        await controllerInstance.createPath(req, res, next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(201));
    })
// */
//     it('createPath: returns fail code (400)', async function () {

//         let body = { "code": "P01", "isEmpty": false, "pathNodes": ["NS01", "NS02"] };
//         let req = request;
//         let res = response;
//         let next = function () {
//         }

//         req.body = body;

//         res = {
//             status: sinon.spy()
//         }

//         let dto = {
//             "code": "P01", "isEmpty": false, "pathNodes": ["NS01", "NS02"]
//         }

//         sinon.stub(pathSchemaClass, "findOne").returns(true);

//         const pathRepoInstance = new pathRepoClass(pathSchemaClass);
//         const pathServiceInstance = new pathServiceClass(pathRepoInstance);
//         const controllerInstance = new PathControllerClass(pathServiceInstance);

//         await controllerInstance.createPath(req, res, next);

//         sinon.assert.calledOnce(res.status);
//         sinon.assert.calledWith(res.status, sinon.match(400));
//     })

//     it('getPaths: returns json with 1 path with all values', async function () {

//         let res = response;
//         let next = function () {
//         }

//         res = {
//             json: sinon.spy()
//         }

//         let returned = {
//             code: "P01", isEmpty: false, pathNodes: ["NS01", "NS02"]
//         }

//         sinon.stub(pathSchemaClass, "find").returns({
//             code: "P01", isEmpty: false, pathNodes: ["NS01", "NS02"]
//         });

//         const pathRepoInstance = new pathRepoClass(pathSchemaClass);
//         const serviceInstance = new pathServiceClass(pathRepoInstance);
//         const controllerInstance = new PathControllerClass(serviceInstance);
//         const checker = await controllerInstance.getPaths(res, next);

//         sinon.assert.calledOnce(res.json);
//         sinon.assert.calledWith(res.json, sinon.match(returned));
//     });

//     it('getPaths: returns empty json', async function () {

//         let res = response;
//         let next = function () {
//         }

//         res = {
//             json: sinon.spy()
//         }

//         let returned = {}

//         sinon.stub(pathSchemaClass, "find").returns({});

//         const pathRepoInstance = new pathRepoClass(pathSchemaClass);
//         const serviceInstance = new pathServiceClass(pathRepoInstance);
//         const controllerInstance = new PathControllerClass(serviceInstance);
//         const checker = await controllerInstance.getPaths(res, next);

//         sinon.assert.calledOnce(res.json);
//         sinon.assert.calledWith(res.json, sinon.match(returned));
//     });
})