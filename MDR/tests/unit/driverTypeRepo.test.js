const sinon = require('sinon');
const driverTypeSchemaClass = require('../../src/models/driverType');
const driverTypeRepoClass = require('../../src/repos/driverTypeRepo');
const DriverTypeClass = require('../../src/domain/driverType');
const driverTypeInstance = new DriverTypeClass();

describe('driver type repo', function() {

    afterEach(function() {
        sinon.restore();
    })

    it('saveDriverType: returns domain object with code+description values', async function() {

        let dto = {
            code: "DT01",
            description: "One driver type"
        }

        let object = driverTypeInstance.create(dto);
        
        sinon.stub(driverTypeSchemaClass, "findOne").returns(false);

        const repoInstance = new driverTypeRepoClass(driverTypeSchemaClass);

        let newObject = await repoInstance.saveDriverType(object);

        sinon.assert.match(newObject, driverTypeInstance.create(dto));
    })

    it('saveDriverType: returns null', async function() {

        let dto = {
            code: "DT01",
            description: "One driver type"
        }

        let object = driverTypeInstance.create(dto);
        
        sinon.stub(driverTypeSchemaClass, "findOne").returns(true);

        const repoInstance = new driverTypeRepoClass(driverTypeSchemaClass);

        let newObject = await repoInstance.saveDriverType(object);

        sinon.assert.match(newObject, null);
    })
})