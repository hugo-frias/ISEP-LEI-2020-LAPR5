const sinon = require('sinon');
const { response, request } = require('express');
const pathServiceClass = require('../../src/services/pathService');
const pathServiceInstance = new pathServiceClass();
const PathControllerClass = require('../../src/controllers/pathController');

describe('path controller', function () {

    afterEach(function () {
        sinon.restore();
    })

    it('createPath: returns successfull code (201)', async function () {

        let body = {
            pathNodes: ["NS01", "NS02"],
            code: "P01",
            isEmpty: false
        };
        let req = request;
        let res = response;
        let next = function () {
        }

        req.body = body;

        res = {
            status: sinon.spy()
        }

        sinon.stub(pathServiceInstance, "createPath").returns({ code: req.body.code, isEmpty: req.body.isEmpty, pathNodes: req.body.pathNodes });

        const controllerInstance = new PathControllerClass(pathServiceInstance);
        await controllerInstance.createPath(req, res, next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(201));
    })

    it('createPath: returns fail code (400)', async function () {

        let req = request;
        let res = response;
        let next = function () {
        }

        res = {
            status: sinon.spy()
        }

        sinon.stub(pathServiceInstance, "createPath").returns(null);

        const controllerInstance = new PathControllerClass(pathServiceInstance);
        await controllerInstance.createPath(req, res, next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(400));
    })

    it('getPaths: returns json with 1 path with all values', async function () {

        let res = response;
        let next = function () {
        }

        res = {
            json: sinon.spy()
        }

        let returned = {
            pathNodes: ["NS01", "NS02"],
            code: "P01",
            isEmpty: false
        }

        sinon.stub(pathServiceInstance, "getPaths").returns({
            pathNodes: ["NS01", "NS02"],
            code: "P01",
            isEmpty: false
        });

        const controllerInstance = new PathControllerClass(pathServiceInstance);
        const checker = await controllerInstance.getPaths(res, next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(returned));
    });

    it('getPaths: returns json with 2 paths with all values', async function () {

        let res = response;
        let next = function () {
        }

        res = {
            json: sinon.spy()
        }

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

        sinon.stub(pathServiceInstance, "getPaths").returns([{
            pathNodes: ["NS01", "NS02"],
            code: "P01",
            isEmpty: false
        }, {
            pathNodes: ["NS01", "NS02"],
            code: "P02",
            isEmpty: false
        }]);

        const controllerInstance = new PathControllerClass(pathServiceInstance);
        const checker = await controllerInstance.getPaths(res, next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(returned));
    });

    it('getPaths: returns empty json', async function () {

        let res = response;
        let next = function () {
        }

        res = {
            json: sinon.spy()
        }

        let returned = {};

        sinon.stub(pathServiceInstance, "getPaths").returns({});

        const controllerInstance = new PathControllerClass(pathServiceInstance);
        const checker = await controllerInstance.getPaths(res, next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(returned));
    });
})