const sinon = require('sinon');
const { response, request } = require('express');
const pathNodeServiceClass = require('../../src/services/pathNodeService');
const pathNodeServiceInstance = new pathNodeServiceClass();
const pathNodeControllerClass = require('../../src/controllers/pathNodeController');

describe('pathNode controller', function() {

    afterEach(function() {
        sinon.restore();
    })

    it('createpathNode: returns successfull code (201)', async function() {

        let body = { "code": "NS01","duration": 100, "distance": 100, "node": "ALT" };
        let req = request;
        let res = response;
        let next = function() {
        }
        
        req.body = body;

        res = {
            status: sinon.spy()
        }

        sinon.stub(pathNodeServiceInstance, "createpathNode").returns({code: req.body.code, duration: req.body.duration,distance: req.body.distance,node: req.body.node});

        const controllerInstance = new pathNodeControllerClass(pathNodeServiceInstance);
        await controllerInstance.createpathNode(req,res,next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(201));
    })

    it('createpathNode: returns fail code (400)', async function() {

        let req = request;
        let res = response;
        let next = function() {
        }

        res = {
            status: sinon.spy()
        }

        sinon.stub(pathNodeServiceInstance, "createpathNode").returns(null);

        const controllerInstance = new pathNodeControllerClass(pathNodeServiceInstance);
        await controllerInstance.createpathNode(req,res,next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(400));
    })
})