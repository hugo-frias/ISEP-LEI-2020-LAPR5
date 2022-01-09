const sinon = require('sinon');
const { response, request } = require('express');
const lineServiceClass = require('../../src/services/lineService');
const LineControllerClass = require('../../src/controllers/lineController');
const lineRepoClass = require('../../src/repos/lineRepo');
const lineSchemaClass = require('../../src/models/line');
const driverTypeSchemaClass = require('../../src/models/driverType');
const vehicleTypeSchemaClass = require('../../src/models/vehicleType');
const linePathSchemaClass = require('../../src/models/linePath');

describe('line controller and repository integration', function () {

    afterEach(function () {
        sinon.restore();
    })

    it('createLine: returns successfull code (201)', async function () {

        let body = {
            code: "CODIGO7", name: "arouca", color: "RGB(0,0,0)",
            linePaths: ["path1", "path2"], allowedVehicles: ["V01"], allowedDrivers: ["D01"]
        };
        let req = request;
        let res = response;
        let next = function () {
        }

        req.body = body;

        res = {
            status: sinon.spy()
        }

        let dto = {
            code: "CODIGO7", name: "arouca", color: "RGB(0,0,0)",
            linePaths: ["path1", "path2"], allowedVehicles: ["V01"], allowedDrivers: ["D01"]
        }

        sinon.stub(lineSchemaClass, "findOne").returns(false);
        sinon.stub(driverTypeSchemaClass, "findOne").returns(true);
        sinon.stub(vehicleTypeSchemaClass, "findOne").returns(true);
        sinon.stub(linePathSchemaClass, "findOne").returns(true);

        const lineRepoInstance = new lineRepoClass(lineSchemaClass);
        const lineServiceInstance = new lineServiceClass(lineRepoInstance);
        const controllerInstance = new LineControllerClass(lineServiceInstance);

        await controllerInstance.createLineController(req, res, next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(201));
    })

    it('createLine: returns fail code (400)', async function () {

        let body = {
            code: "CODIGO7", name: "arouca", color: "RGB(0,0,0)",
            linePaths: ["path1", "path2"], allowedVehicles: ["V01"], allowedDrivers: ["D01"]
        };
        let req = request;
        let res = response;
        let next = function () {
        }

        req.body = body;

        res = {
            status: sinon.spy()
        }

        let dto = {
            code: "CODIGO7", name: "arouca", color: "RGB(0,0,0)",
            linePaths: ["path1", "path2"], allowedVehicles: ["V01"], allowedDrivers: ["D01"]
        }

        sinon.stub(lineSchemaClass, "findOne").returns(true);

        const lineRepoInstance = new lineRepoClass(lineSchemaClass);
        const lineServiceInstance = new lineServiceClass(lineRepoInstance);
        const controllerInstance = new LineControllerClass(lineServiceInstance);

        await controllerInstance.createLineController(req, res, next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(400));
    })
})