const sinon = require('sinon');
const { response, request } = require('express');
const driverTypeServiceClass = require('../../src/services/driverTypeService');
const driverTypeServiceInstance = new driverTypeServiceClass();
const DriverTypeControllerClass = require('../../src/controllers/driverTypeController');

describe('driver type controller', function() {

    afterEach(function() {
        sinon.restore();
    })

    it('createDriverType: returns successfull code (201)', async function() {

        let body = { "code":'DT01', "description":'one driver type' };
        let req = request;
        let res = response;
        let next = function() {
        }
        
        req.body = body;

        res = {
            status: sinon.spy()
        }

        sinon.stub(driverTypeServiceInstance, "createDriverType").returns({code: req.body.code, description: req.body.description});

        const controllerInstance = new DriverTypeControllerClass(driverTypeServiceInstance);
        await controllerInstance.createDriverType(req,res,next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(201));
    })

    it('createDriverType: returns fail code (400)', async function() {

        let req = request;
        let res = response;
        let next = function() {
        }

        res = {
            status: sinon.spy()
        }

        sinon.stub(driverTypeServiceInstance, "createDriverType").returns(null);

        const controllerInstance = new DriverTypeControllerClass(driverTypeServiceInstance);
        await controllerInstance.createDriverType(req,res,next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(400));
    })
})