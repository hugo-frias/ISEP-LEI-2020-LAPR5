const sinon = require('sinon');
const { response, request } = require('express');
const lineServiceClass = require('../../src/services/lineService');
const LineControllerClass = require('../../src/controllers/lineController');
const lineRepoClass = require('../../src/repos/lineRepo');
const lineRepoInstance = new lineRepoClass();

const LineClass = require('../../src/domain/line');
const lineInstance = new LineClass();

describe('line controller and service integration', function() {

    afterEach(function() {
        sinon.restore();
    })

    it('createLine: returns successfull code (201)', async function() {

        let body = { code: "CODIGO7", name: "arouca", color: "RGB(0,0,0)", 
        linePaths:["path1","path2"],allowedVehicles:["V01"],allowedDrivers:["D01"] };
        let req = request;
        let res = response;
        let next = function() {
        }
        
        req.body = body;

        res = {
            status: sinon.spy()
        }

        let dto = {
            code: "CODIGO7", name: "arouca", color: "RGB(0,0,0)", 
            linePaths:["path1","path2"],allowedVehicles:["V01"],allowedDrivers:["D01"]
        }

        let struct = lineInstance.create(dto);

        sinon.stub(lineRepoInstance, "saveLine").returns(struct);

        const lineServiceInstance = new lineServiceClass(lineRepoInstance);
        const controllerInstance = new LineControllerClass(lineServiceInstance);

        await controllerInstance.createLineController(req,res,next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(201));
    })

    it('createDriverType: returns fail code (400)', async function() {

        let body = { code: "CODIGO7", name: "arouca", color: "RGB(0,0,0)", 
        linePaths:["path1","path2"],allowedVehicles:["V01"],allowedDrivers:["D01"] };
        let req = request;
        let res = response;
        let next = function() {
        }
        
        req.body = body;

        res = {
            status: sinon.spy()
        }

        sinon.stub(lineRepoInstance, "saveLine").returns(null);

        const lineServiceInstance = new lineServiceClass(lineRepoInstance);
        const controllerInstance = new LineControllerClass(lineServiceInstance);

        await controllerInstance.createLineController(req,res,next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(400));
    })
})