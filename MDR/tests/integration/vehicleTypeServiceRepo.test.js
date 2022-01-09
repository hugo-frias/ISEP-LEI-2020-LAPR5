const sinon = require('sinon');
const VehicleTypeServiceClass = require('../../src/services/vehicleTypeService');
const vehicleTypeRepoClass = require('../../src/repos/vehicleTypeRepo');
const vehicleTypeSchemaClass = require('../../src/models/vehicleType');

describe('vehicle type service and repo integration', function() {

    afterEach(function() {
        sinon.restore();
    })

    it('createVehicleType: returns dto with code+name+autonomy+cost+avgSpeed+energy+consumption+emission values', async function() {

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

    
        
        sinon.stub(vehicleTypeSchemaClass, "findOne").returns(false);

        const vehicleTypeRepoInstance = new vehicleTypeRepoClass(vehicleTypeSchemaClass);
        const serviceInstance = new VehicleTypeServiceClass(vehicleTypeRepoInstance);
        let newDto = await serviceInstance.createVehicleType(dto);

        sinon.assert.match(newDto, {code: "12345678912345678900",
        name: "teste1",
        autonomy:10,
        cost: 10,
        avgSpeed:10,
        energy:"gasolina",
        consumption:10,
        emission:10});
    })

    it('createVehicleType: returns returns null', async function() {

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
        
        sinon.stub(vehicleTypeSchemaClass, "findOne").returns(true);

        const vehicleTypeRepoInstance = new vehicleTypeRepoClass(vehicleTypeSchemaClass);
        const serviceInstance = new VehicleTypeServiceClass(vehicleTypeRepoInstance);
        let newDto = await serviceInstance.createVehicleType(dto);

        sinon.assert.match(newDto, null);
    })
})