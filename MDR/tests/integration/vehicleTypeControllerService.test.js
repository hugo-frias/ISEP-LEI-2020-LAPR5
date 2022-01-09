const sinon = require('sinon');
const { response, request } = require('express');
const vehicleTypeServiceClass = require('../../src/services/vehicleTypeService');
const VehicleTypeControllerClass = require('../../src/controllers/vehicleTypeController');
const vehicleTypeRepoClass = require('../../src/repos/vehicleTypeRepo');
const vehicleTypeRepoInstance = new vehicleTypeRepoClass();

const VehicleTypeClass = require('../../src/domain/vehicleType');
const vehicleTypeInstance = new VehicleTypeClass();

describe('vehicle type controller and service integration', function() {

    afterEach(function() {
        sinon.restore();
    })

    it('createVehicleType: returns successfull code (201)', async function() {

        let body = { "code":'12345678912345678900', "name":'teste1', "autonomy":10, "cost":10, "avgSpeed":10, "energy": 10, "consumption":10, "emission": 10 };
        let req = request;
        let res = response;
        let next = function() {
        }
        
        req.body = body;

        res = {
            status: sinon.spy()
        }

        let dto = {
            code: "12345678912345678900",
            name: "teste1",
            autonomy:10,
            cost: 10,
            avgSpeed:10,
            energy:1,
            consumption:10,
            emission:10
        }

        let struct = vehicleTypeInstance.create(dto);

        sinon.stub(vehicleTypeRepoInstance, "saveVehicleType").returns(struct);

        const vehicleTypeServiceInstance = new vehicleTypeServiceClass(vehicleTypeRepoInstance);
        const controllerInstance = new VehicleTypeControllerClass(vehicleTypeServiceInstance);

        await controllerInstance.createVehicleType(req,res,next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(201));
    })

    it('createVehicleType: returns fail code (400)', async function() {

        let body = { "code":'12345678912345678900', "name":'teste1', "autonomy":10, "cost":10, "avgSpeed":10, "energy": 10, "consumption":10, "emission": 10 };
        let req = request;
        let res = response;
        let next = function() {
        }
        
        req.body = body;

        res = {
            status: sinon.spy()
        }

        sinon.stub(vehicleTypeRepoInstance, "saveVehicleType").returns(null);

        const vehicleTypeServiceInstance = new vehicleTypeServiceClass(vehicleTypeRepoInstance);
        const controllerInstance = new VehicleTypeControllerClass(vehicleTypeServiceInstance);

        await controllerInstance.createVehicleType(req,res,next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(400));
    })
})