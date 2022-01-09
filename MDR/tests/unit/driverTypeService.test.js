const sinon = require('sinon');
const driverTypeRepoClass = require('../../src/repos/driverTypeRepo');
const driverTypeRepoInstance = new driverTypeRepoClass();
const DriverTypeServiceClass = require('../../src/services/driverTypeService');
const DriverTypeClass = require('../../src/domain/driverType');
const driverTypeInstance = new DriverTypeClass();

describe('driver type service', function() {

    afterEach(function() {
        sinon.restore();
    })

    it('createDriverType: returns dto with code+description values', async function() {

        let dto = {
            code: "DT01",
            description: "One driver type"
        }

        let struct = driverTypeInstance.create(dto);
        
        sinon.stub(driverTypeRepoInstance, "saveDriverType").returns(struct);

        const serviceInstance = new DriverTypeServiceClass(driverTypeRepoInstance);
        let newDto = await serviceInstance.createDriverType(dto);

        sinon.assert.match(newDto, {code: "DT01", description: "One driver type"});
    })

    it('createDriverType: returns null', async function() {

        let dto = {
            code: "DT01",
            description: "One driver type"
        }
        
        sinon.stub(driverTypeRepoInstance, "saveDriverType").returns(null);

        const serviceInstance = new DriverTypeServiceClass(driverTypeRepoInstance);
        let newDto = await serviceInstance.createDriverType(dto);

        sinon.assert.match(newDto, null);
    })
})