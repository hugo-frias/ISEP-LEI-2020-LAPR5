const sinon = require('sinon');
const vehicleTypeRepoClass = require('../../src/repos/vehicleTypeRepo');
const vehicleTypeRepoInstance = new vehicleTypeRepoClass();
const VehicleTypeServiceClass = require('../../src/services/vehicleTypeService');
const VehicleTypeClass = require('../../src/domain/vehicleType');
const vehicleTypeInstance = new VehicleTypeClass();

describe('Vehicle Type service', function () {

    afterEach(function () {
        sinon.restore();
    })

    it('createVehicleType: returns dto with code+description values', async function () {

        let dto = {
            code: "12345678912345678900",
            name: "teste1",
            autonomy: 10,
            cost: 10,
            avgSpeed: 10,
            energy: 1,
            consumption: 10,
            emission: 10
        }

        let struct = vehicleTypeInstance.create(dto);

        sinon.stub(vehicleTypeRepoInstance, "saveVehicleType").returns(struct);

        const serviceInstance = new VehicleTypeServiceClass(vehicleTypeRepoInstance);
        let newDto = await serviceInstance.createVehicleType(dto);

        sinon.assert.match(newDto, {
            code: "12345678912345678900",
            name: "teste1", autonomy: 10, cost: 10, avgSpeed: 10,
            energy: "gasolina", consumption: 10, emission: 10
        });
    })

    it('createVehicleType: returns null', async function () {

        let dto = {
            code: "12345678912345678900",
            name: "teste1",
            autonomy: 10,
            cost: 10,
            avgSpeed: 10,
            energy: 1,
            consumption: 10,
            emission: 10
        }

        sinon.stub(vehicleTypeRepoInstance, "saveVehicleType").returns(null);

        const serviceInstance = new VehicleTypeServiceClass(vehicleTypeRepoInstance);
        let newDto = await serviceInstance.createVehicleType(dto);

        sinon.assert.match(newDto, null);
    })
})