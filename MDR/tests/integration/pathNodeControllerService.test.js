const sinon = require('sinon');
const { response, request } = require('express');
const pathNodeServiceClass = require('../../src/services/pathNodeService');
const pathNodeControllerClass = require('../../src/controllers/pathNodeController');
const pathNodeRepoClass = require('../../src/repos/pathNodeRepo');
const pathNodeRepoInstance = new pathNodeRepoClass();
const pathNodeClass = require('../../src/domain/pathNode');
const pathNodeInstance = new pathNodeClass();

describe('pathNode ctrl and service integration', function () {

    afterEach(function () {
        sinon.restore();
    })

    it('createpathNode: returns successfull code (201)', async function () {
        let body = { "code": "NS01", "duration": 100, "distance": 100, "node":"ALT" };
        let req = request;
        let res = response;
        let next = function () {
        }

        req.body = body;

        res = {
            status: sinon.spy()
        }

        let dto = { "code": "NS01", "duration": 100, "distance": 100, "node":"ALT" }

        let struct = pathNodeInstance.create(dto);
        sinon.stub(pathNodeRepoInstance, "savepathNode").returns(struct);

        const pathNodeServiceInstance = new pathNodeServiceClass(pathNodeRepoInstance);
        const controllerInstance = new pathNodeControllerClass(pathNodeServiceInstance);

        await controllerInstance.createpathNode(req, res, next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(201));
    })

    it('createpathNode: returns fail code (400)', async function () {

        let body = { "code": "NS01", "duration": 100, "distance": 100, "node":"ALT" };
        let req = request;
        let res = response;
        let next = function () {
        }

        req.body = body;

        res = {
            status: sinon.spy()
        }

        sinon.stub(pathNodeRepoInstance, "savepathNode").returns(null);
        const pathNodeServiceInstance = new pathNodeServiceClass(pathNodeRepoInstance);
        const controllerInstance = new pathNodeControllerClass(pathNodeServiceInstance);
        await controllerInstance.createpathNode(req, res, next);
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(400));
    })
})