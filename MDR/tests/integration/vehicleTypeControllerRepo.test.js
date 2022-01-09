const sinon = require('sinon');
const { response, request } = require('express');
const vehicleTypeServiceClass = require('../../src/services/vehicleTypeService');
const VehicleTypeControllerClass = require('../../src/controllers/vehicleTypeController');
const vehicleTypeRepoClass = require('../../src/repos/vehicleTypeRepo');
const vehicleTypeSchemaClass = require('../../src/models/vehicleType');

describe('vehicle type controller and repository integration', function() {

    afterEach(function() {
        sinon.restore();
    })

    it('createVehicleType: returns successfull code (201)', async function() {

        let body = { "code":'12345678912345678900', "name":'teste1', "autonomy":10, "cost":10, "avgSpeed":10, "energy": 10, "consumption":10, "emission": 10};
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
            avgSpeed: 10,
            energy:1,
            consumption:10,
            emission:10
        }

        sinon.stub(vehicleTypeSchemaClass, "findOne").returns(false);

        const vehicleTypeRepoInstance = new vehicleTypeRepoClass(vehicleTypeSchemaClass);
        const vehicleTypeServiceInstance = new vehicleTypeServiceClass(vehicleTypeRepoInstance);
        const controllerInstance = new VehicleTypeControllerClass(vehicleTypeServiceInstance);

        await controllerInstance.createVehicleType(req,res,next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(201));
    })

    it('createVehicleType: returns fail code (400)', async function() {

        let body = { "code":'12345678912345678900', "name":'teste1', "autonomy":10, "cost":10, "avgSpeed":10, "energy": 10, "consumption":10, "emission": 10};
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
            avgSpeed: 10,
            energy:1,
            consumption:10,
            emission:10
        }

        sinon.stub(vehicleTypeSchemaClass, "findOne").returns(true);

        const vehicleTypeRepoInstance = new vehicleTypeRepoClass(vehicleTypeSchemaClass);
        const vehicleTypeServiceInstance = new vehicleTypeServiceClass(vehicleTypeRepoInstance);
        const controllerInstance = new VehicleTypeControllerClass(vehicleTypeServiceInstance);

        await controllerInstance.createVehicleType(req,res,next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(400));
    })
})