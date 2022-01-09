const sinon = require('sinon');
const LineServiceClass = require('../../src/services/lineService');
const lineRepoClass = require('../../src/repos/lineRepo');
const lineSchemaClass = require('../../src/models/line');
const driverTypeSchemaClass = require('../../src/models/driverType');
const vehicleTypeSchemaClass = require('../../src/models/vehicleType');
const linePathSchemaClass = require('../../src/models/linePath');

describe('line service and repo integration', function () {

    afterEach(function () {
        sinon.restore();
    })

    it('createLine: returns dto with values', async function () {

        let dto = {
            code: "CODIGO7", name: "arouca", color: "RGB(0,0,0)",
            linePaths: ["path1", "path2"], allowedVehicles: ["V01"], allowedDrivers: ["D01"]
        }

        sinon.stub(lineSchemaClass, "findOne").returns(false);
        sinon.stub(driverTypeSchemaClass, "findOne").returns(true);
        sinon.stub(vehicleTypeSchemaClass, "findOne").returns(true);
        sinon.stub(linePathSchemaClass, "findOne").returns(true);

        const lineRepoInstance = new lineRepoClass(lineSchemaClass);
        const serviceInstance = new LineServiceClass(lineRepoInstance);
        let newDto = await serviceInstance.createLineService(dto);

        sinon.assert.match(newDto, { code: "CODIGO7", name: "arouca", color: "RGB(0,0,0)",
        linePaths: ["path1", "path2"], allowedVehicles: ["V01"], allowedDrivers: ["D01"]});
    })

    it('createLine: returns null', async function () {

        let dto = {
            code: "CODIGO7", name: "arouca", color: "RGB(0,0,0)",
            linePaths: ["path1", "path2"], allowedVehicles: ["V01"], allowedDrivers: ["D01"]
            
        }

        sinon.stub(lineSchemaClass, "findOne").returns(true);

        const lineRepoInstance = new lineRepoClass(lineSchemaClass);
        const serviceInstance = new LineServiceClass(lineRepoInstance);
        let newDto = await serviceInstance.createLineService(dto);

        sinon.assert.match(newDto, null);
    })
})