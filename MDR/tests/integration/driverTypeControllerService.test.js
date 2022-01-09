const sinon = require('sinon');
const { response, request } = require('express');
const driverTypeServiceClass = require('../../src/services/driverTypeService');
const DriverTypeControllerClass = require('../../src/controllers/driverTypeController');
const driverTypeRepoClass = require('../../src/repos/driverTypeRepo');
const driverTypeRepoInstance = new driverTypeRepoClass();

const DriverTypeClass = require('../../src/domain/driverType');
const driverTypeInstance = new DriverTypeClass();

describe('driver type controller and service integration', function() {

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

        let dto = {
            code: "DT01",
            description: "One driver type"
        }

        let struct = driverTypeInstance.create(dto);

        sinon.stub(driverTypeRepoInstance, "saveDriverType").returns(struct);

        const driverTypeServiceInstance = new driverTypeServiceClass(driverTypeRepoInstance);
        const controllerInstance = new DriverTypeControllerClass(driverTypeServiceInstance);

        await controllerInstance.createDriverType(req,res,next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(201));
    })

    it('createDriverType: returns fail code (400)', async function() {

        let body = { "code":'DT01', "description":'one driver type' };
        let req = request;
        let res = response;
        let next = function() {
        }
        
        req.body = body;

        res = {
            status: sinon.spy()
        }

        sinon.stub(driverTypeRepoInstance, "saveDriverType").returns(null);

        const driverTypeServiceInstance = new driverTypeServiceClass(driverTypeRepoInstance);
        const controllerInstance = new DriverTypeControllerClass(driverTypeServiceInstance);

        await controllerInstance.createDriverType(req,res,next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(400));
    })
})