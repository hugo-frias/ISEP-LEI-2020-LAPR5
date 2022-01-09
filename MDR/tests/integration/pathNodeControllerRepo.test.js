const sinon = require('sinon');
const { response, request } = require('express');
const pathNodeServiceClass = require('../../src/services/pathNodeService');
const pathNodeControllerClass = require('../../src/controllers/pathNodeController');
const pathNodeRepoClass = require('../../src/repos/pathNodeRepo');
const pathNodeSchemaClass = require('../../src/models/pathNode');
const nodesSchemaClass = require('../../src/models/node');
const { expectation } = require('sinon');

describe('pathNode ctrl and repo integration', function () {

    afterEach(function () {
        sinon.restore();
    })
    /*
    it('createpathNode: returns successfull code (201)', async function () {

        let body = { code: "NS01", duration: 100, distance: 100, node: "ALT" };
        let req = request;
        let res = response;
        let next = function () {
        }

        req.body = body;

        res = {
            status: sinon.spy()
        }

        //let dto = { code: "NS25", duration: 100, distance: 100, node: "ALT" }
        sinon.stub(pathNodeSchemaClass, "findOne").returns(false);
        let list = {
            code: '30',
            duration: 200,
            distance: 200,
            node: 'BALTR',
        };
        sinon.stub(pathNodeSchemaClass, "find").returns();
        sinon.stub(nodesSchemaClass, "findOne").returns(true);
        let pathNodeRepoInstance = new pathNodeRepoClass(pathNodeSchemaClass);
        let pathNodeServiceInstance = new pathNodeServiceClass(pathNodeRepoInstance);
        let controllerInstance = new pathNodeControllerClass(pathNodeServiceInstance);

        await controllerInstance.createpathNode(req, res, next);
        //sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(201));
    })
    */
    it('createpathNode: returns fail code (400)', async function () {

        let body = { code: "NS01", duration: 100, distance: 100, node: "ALT" };
        let req = request;
        let res = response;
        let next = function () {
        }

        req.body = body;

        res = {
            status: sinon.spy()
        }

        let dto = {
            code: "NS01", duration: 100, distance: 100, node: "ALT"
        }

        sinon.stub(pathNodeSchemaClass, "findOne").returns(true);

        let pathNodeRepoInstance = new pathNodeRepoClass(pathNodeSchemaClass);
        let pathNodeServiceInstance = new pathNodeServiceClass(pathNodeRepoInstance);
        let controllerInstance = new pathNodeControllerClass(pathNodeServiceInstance);

        await controllerInstance.createpathNode(req, res, next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(400));
    })
})