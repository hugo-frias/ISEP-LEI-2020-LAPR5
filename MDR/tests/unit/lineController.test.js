const sinon = require('sinon');
const { response, request } = require('express');
const lineServiceClass = require('../../src/services/lineService');
const lineServiceInstance = new lineServiceClass();
const LineControllerClass = require('../../src/controllers/lineController');

describe('line controller', function() {

    afterEach(function() {
        sinon.restore();
    })

    it('createLineController: returns successfull code (201)', async function() {

        let body = { "code": "CODIGO3", "name": "NOME", "color": "RGB(0,0,0)", "linePaths":["ASDASD>ASDASD","ASDASD>ASDASD"],"allowedVehicles":["V01"],"allowedDrivers":["D01"] }; 
        let req = request;
        let res = response;
        let next = function() {
        }
        
        req.body = body;

        res = {
            status: sinon.spy()
        }

        sinon.stub(lineServiceInstance, "createLineService").returns({code: req.body.code, description: req.body.name, color: req.body.color,
        linePaths: req.body.linePaths, allowedVehicles: req.body.allowedVehicles, allowedDrivers: req.body.allowedDrivers});

        const controllerInstance = new LineControllerClass(lineServiceInstance);
        await controllerInstance.createLineController(req,res,next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(201));
    })

    it('createLineController: returns fail code (400)', async function() {

        let req = request;
        let res = response;
        let next = function() {
        }

        res = {
            status: sinon.spy()
        }

        sinon.stub(lineServiceInstance, "createLineService").returns(null);

        const controllerInstance = new LineControllerClass(lineServiceInstance);
        await controllerInstance.createLineController(req,res,next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(400));
    })

    it('getLineController: returns list with no filter (3 lines)', async function() {

        let body = { "filter": "NOFILTER" }; 
        let req = request;
        let res = response;
        let next = function() {
        }
        
        req.body = body;

        res = {
            status: sinon.spy()
        }

        const returned = sinon.stub(lineServiceInstance, "getLineService").returns({code: "CODIGO1", name: "arouca", color: "RGB(0,0,0)", 
        linePaths:["path1","path2"],allowedVehicles:["V01"],allowedDrivers:["D01"]},{code: "CODIGO2", name: "belem", color: "RGB(1,0,0)", 
        linePaths:["path2","path3"],allowedVehicles:["V02"],allowedDrivers:["D01"]},{code: "CODIGO3", name: "colombo", color: "RGB(0,2,0)", 
        linePaths:["path3","path1"],allowedVehicles:["V03"],allowedDrivers:["D01"]});

        const controllerInstance = new LineControllerClass(lineServiceInstance);
        const checker = await controllerInstance.createLineController(req,res,next);
        sinon.assert.match(checker, returned);
    })

    it('getLineController: returns line with specific code (1 lines)', async function() {

        let body = { "filter": "CODE-aux" }; 
        let req = request;
        let res = response;
        let next = function() {
        }
        
        req.body = body;

        res = {
            status: sinon.spy()
        }

        const returned = sinon.stub(lineServiceInstance, "getLineService").returns({code: "aux", name: "colombo", color: "RGB(0,2,0)", 
        linePaths:["path3","path1"],allowedVehicles:["V03"],allowedDrivers:["D01"]});

        const controllerInstance = new LineControllerClass(lineServiceInstance);
        const checker = await controllerInstance.createLineController(req,res,next);
        sinon.assert.match(checker, returned);
    })
    
    it('getLineController: returns list with code asc (3 lines)', async function() {

        let body = { "filter": "CODEASC" }; 
        let req = request;
        let res = response;
        let next = function() {
        }
        
        req.body = body;

        res = {
            status: sinon.spy()
        }

        const returned = sinon.stub(lineServiceInstance, "getLineService").returns({code: "CODIGO1", name: "arouca", color: "RGB(0,0,0)", 
        linePaths:["path1","path2"],allowedVehicles:["V01"],allowedDrivers:["D01"]},{code: "CODIGO2", name: "belem", color: "RGB(1,0,0)", 
        linePaths:["path2","path3"],allowedVehicles:["V02"],allowedDrivers:["D01"]},{code: "CODIGO3", name: "colombo", color: "RGB(0,2,0)", 
        linePaths:["path3","path1"],allowedVehicles:["V03"],allowedDrivers:["D01"]});

        const controllerInstance = new LineControllerClass(lineServiceInstance);
        const checker = await controllerInstance.createLineController(req,res,next);
        sinon.assert.match(checker, returned);
    })
    it('getLineController: returns list with code desc (3 lines)', async function() {

        let body = { "filter": "CODEDESC" }; 
        let req = request;
        let res = response;
        let next = function() {
        }
        
        req.body = body;

        res = {
            status: sinon.spy()
        }

        const returned = sinon.stub(lineServiceInstance, "getLineService").returns({code: "CODIGO3", name: "colombo", color: "RGB(0,2,0)", 
        linePaths:["path3","path1"],allowedVehicles:["V03"],allowedDrivers:["D01"]},{code: "CODIGO2", name: "belem", color: "RGB(1,0,0)", 
        linePaths:["path2","path3"],allowedVehicles:["V02"],allowedDrivers:["D01"]},{code: "CODIGO1", name: "arouca", color: "RGB(0,0,0)", 
        linePaths:["path1","path2"],allowedVehicles:["V01"],allowedDrivers:["D01"]});

        const controllerInstance = new LineControllerClass(lineServiceInstance);
        const checker = await controllerInstance.createLineController(req,res,next);
        sinon.assert.match(checker, returned);
    })
    it('getLineController: returns line with specific name (3 lines)', async function() {

        let body = { "filter": "NAME-arouca" }; 
        let req = request;
        let res = response;
        let next = function() {
        }
        
        req.body = body;

        res = {
            status: sinon.spy()
        }

        const returned = sinon.stub(lineServiceInstance, "getLineService").returns({code: "CODIGO1", name: "arouca", color: "RGB(0,0,0)", 
        linePaths:["path1","path2"],allowedVehicles:["V01"],allowedDrivers:["D01"]});

        const controllerInstance = new LineControllerClass(lineServiceInstance);
        const checker = await controllerInstance.createLineController(req,res,next);
        sinon.assert.match(checker, returned);
    })
    it('getLineController: returns list with name asc (3 lines)', async function() {

        let body = { "filter": "nameasc" }; 
        let req = request;
        let res = response;
        let next = function() {
        }
        
        req.body = body;

        res = {
            status: sinon.spy()
        }

        const returned = sinon.stub(lineServiceInstance, "getLineService").returns({code: "CODIGO1", name: "arouca", color: "RGB(0,0,0)", 
        linePaths:["path1","path2"],allowedVehicles:["V01"],allowedDrivers:["D01"]},{code: "CODIGO2", name: "belem", color: "RGB(1,0,0)", 
        linePaths:["path2","path3"],allowedVehicles:["V02"],allowedDrivers:["D01"]},{code: "CODIGO3", name: "colombo", color: "RGB(0,2,0)", 
        linePaths:["path3","path1"],allowedVehicles:["V03"],allowedDrivers:["D01"]})

        const controllerInstance = new LineControllerClass(lineServiceInstance);
        const checker = await controllerInstance.createLineController(req,res,next);
        sinon.assert.match(checker, returned);
    })
    it('getLineController: returns list with lines whose names start with ar (3 lines)', async function() {

        let body = { "filter": "nameasc" }; 
        let req = request;
        let res = response;
        let next = function() {
        }
        
        req.body = body;

        res = {
            status: sinon.spy()
        }

        const returned = sinon.stub(lineServiceInstance, "getLineService").returns({code: "CODIGO1", name: "arouca", color: "RGB(0,0,0)", 
        linePaths:["path1","path2"],allowedVehicles:["V01"],allowedDrivers:["D01"]},{code: "CODIGO2", name: "arsov", color: "RGB(1,0,0)", 
        linePaths:["path2","path3"],allowedVehicles:["V02"],allowedDrivers:["D01"]})

        const controllerInstance = new LineControllerClass(lineServiceInstance);
        const checker = await controllerInstance.createLineController(req,res,next);
        sinon.assert.match(checker, returned);
    })
})