const sinon = require('sinon');
const { response, request } = require('express');
const pathServiceClass = require('../../src/services/pathService');
const PathControllerClass = require('../../src/controllers/pathController');
const pathRepoClass = require('../../src/repos/pathRepo');
const pathRepoInstance = new pathRepoClass();
const PathClass = require('../../src/domain/path');
const pathInstance = new PathClass();

describe('path  ctrl and service integration', function() {

    // afterEach(function() {
    //     sinon.restore();
    // })

    // it('createPath: returns successfull code (201)', async function() {
    //     let body = { code: "P01", isEmpty: false, pathNodes: ["NS01", "NS02"]  };
    //     let req = request;
    //     let res = response;
    //     let next = function() {
    //     }
        
    //     req.body = body;

    //     res = {
    //         status: sinon.spy()
    //     }

    //     let dto = {code: "P01", isEmpty: false, pathNodes: ["NS01", "NS02"] }

    //     let struct = pathInstance.create(dto);
    //     sinon.stub(pathRepoInstance, "savePath").returns(struct);

    //     const pathServiceInstance = new pathServiceClass(pathRepoInstance);
    //     const controllerInstance = new PathControllerClass(pathServiceInstance);

    //     await controllerInstance.createPath(req,res,next);

    //     sinon.assert.calledOnce(res.status);
    //     sinon.assert.calledWith(res.status, sinon.match(201));
    // })

    // it('createPathh: returns fail code (400)', async function() {

    //     let body = { code: "P01", isEmpty: false, pathNodes: ["NS01", "NS02"]  };
    //     let req = request;
    //     let res = response;
    //     let next = function() {
    //     }
        
    //     req.body = body;

    //     res = {
    //         status: sinon.spy()
    //     }

    //     sinon.stub(pathRepoInstance, "savePath").returns(null);

    //     const pathServiceInstance = new pathServiceClass(pathRepoInstance);
    //     const controllerInstance = new PathControllerClass(pathServiceInstance);
    //     await controllerInstance.createPath(req,res,next);
    //     sinon.assert.calledOnce(res.status);
    //     sinon.assert.calledWith(res.status, sinon.match(400));
    // })

    // it('getPaths: returns json with 1 path with all values', async function () {

    //     let res = response;
    //     let next = function () {
    //     }

    //     res = {
    //         json: sinon.spy()
    //     }

    //     let returned = {
    //         code: "P01", isEmpty: false, pathNodes: ["NS01", "NS02"]
    //     }

    //     sinon.stub(pathRepoInstance, "getAllPaths").returns({
    //         code: "P01", isEmpty: false, pathNodes: ["NS01", "NS02"]
    //     });

    //     const serviceInstance = new pathServiceClass(pathRepoInstance);
    //     const controllerInstance = new PathControllerClass(serviceInstance);
    //     const checker = await controllerInstance.getPaths(res, next);

    //     sinon.assert.calledOnce(res.json);
    //     sinon.assert.calledWith(res.json, sinon.match(returned));
    // });

    // it('getPaths: returns json with 1 path with all values', async function () {

    //     let res = response;
    //     let next = function () {
    //     }

    //     res = {
    //         json: sinon.spy()
    //     }

    //     let returned = {}

    //     sinon.stub(pathRepoInstance, "getAllPaths").returns({});

    //     const serviceInstance = new pathServiceClass(pathRepoInstance);
    //     const controllerInstance = new PathControllerClass(serviceInstance);
    //     const checker = await controllerInstance.getPaths(res, next);

    //     sinon.assert.calledOnce(res.json);
    //     sinon.assert.calledWith(res.json, sinon.match(returned));
    // });
})