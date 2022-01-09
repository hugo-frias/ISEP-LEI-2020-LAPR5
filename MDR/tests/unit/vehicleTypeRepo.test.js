const sinon = require('sinon');
const vehicleTypeSchemaClass = require('../../src/models/vehicleType');
const vehicleTypeRepoClass = require('../../src/repos/vehicleTypeRepo');
const VehicleTypeClass = require('../../src/domain/vehicleType');
const vehicleTypeInstance = new VehicleTypeClass();

describe('vehicle type repo', function() {

    afterEach(function() {
        sinon.restore();
    })

    it('saveVehicleType: returns domain object with code+name+autonomy+cost+avgSpeed+energy+consumption+emission values', async function() {

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

        let object = vehicleTypeInstance.create(dto);
        
        sinon.stub(vehicleTypeSchemaClass, "findOne").returns(false);

        const repoInstance = new vehicleTypeRepoClass(vehicleTypeSchemaClass);

        let newObject = await repoInstance.saveVehicleType(object);

        sinon.assert.match(newObject, vehicleTypeInstance.create(dto));
    })

    it('saveVehicleType: returns null', async function() {

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

        let object = vehicleTypeInstance.create(dto);
        
        sinon.stub(vehicleTypeSchemaClass, "findOne").returns(true);

        const repoInstance = new vehicleTypeRepoClass(vehicleTypeSchemaClass);

        let newObject = await repoInstance.saveVehicleType(object);

        sinon.assert.match(newObject, null);
    })
})