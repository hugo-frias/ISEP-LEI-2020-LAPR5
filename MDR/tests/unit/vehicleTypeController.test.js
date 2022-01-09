const sinon = require('sinon');
const { response, request } = require('express'); 
const vehicleTypeServiceClass = require('../../src/services/vehicleTypeService');
const vehicleTypeServiceInstance = new vehicleTypeServiceClass();
const VehicleTypeControllerClass = require('../../src/controllers/vehicleTypeController');

describe('vehicle type controller', function() {

    afterEach(function() {
        sinon.restore();
    })

    it('createVehicleType: returns successfull code (201)', async function() {

        let body = { "code":'12345678912345678900', "name":'teste1', "autonomy":10, "cost":10, "avgSpeed":10, "energy": 1, "consumption":10, "emission": 10}; 
        let req = request;
        let res = response;
        let next = function() {
        }
        
        req.body = body;

        res = {
            status: sinon.spy()
        }

        sinon.stub(vehicleTypeServiceInstance, "createVehicleType").returns({code: req.body.code, name: req.body.name, autonomy: req.body.autonomy, cost: req.body.cost, avgSpeed: req.body.avgSpeed, energy: req.body.energy,consumption: req.body.consumption,emission: req.body.emission});

        const controllerInstance = new VehicleTypeControllerClass(vehicleTypeServiceInstance);
        await controllerInstance.createVehicleType(req,res,next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(201));
    })

    it('createVehicleType: returns fail code (400)', async function() {

        let req = request;
        let res = response;
        let next = function() {
        }

        res = {
            status: sinon.spy()
        }

        sinon.stub(vehicleTypeServiceInstance, "createVehicleType").returns(null);

        const controllerInstance = new VehicleTypeControllerClass(vehicleTypeServiceInstance);
        await controllerInstance.createVehicleType(req,res,next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(400));
    })
})