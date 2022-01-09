const sinon = require('sinon');
const DriverTypeServiceClass = require('../../src/services/driverTypeService');
const driverTypeRepoClass = require('../../src/repos/driverTypeRepo');
const driverTypeSchemaClass = require('../../src/models/driverType');

describe('driver type service and repo integration', function() {

    afterEach(function() {
        sinon.restore();
    })

    it('createDriverType: returns dto with code+description values', async function() {

        let dto = {
            code: "DT01",
            description: "One driver type"
        }
        
        sinon.stub(driverTypeSchemaClass, "findOne").returns(false);

        const driverTypeRepoInstance = new driverTypeRepoClass(driverTypeSchemaClass);
        const serviceInstance = new DriverTypeServiceClass(driverTypeRepoInstance);
        let newDto = await serviceInstance.createDriverType(dto);

        sinon.assert.match(newDto, {code: "DT01", description: "One driver type"});
    })

    it('createDriverType: returns returns null', async function() {

        let dto = {
            code: "DT01",
            description: "One driver type"
        }
        
        sinon.stub(driverTypeSchemaClass, "findOne").returns(true);

        const driverTypeRepoInstance = new driverTypeRepoClass(driverTypeSchemaClass);
        const serviceInstance = new DriverTypeServiceClass(driverTypeRepoInstance);
        let newDto = await serviceInstance.createDriverType(dto);

        sinon.assert.match(newDto, null);
    })
})