const sinon = require('sinon');
const lineSchemaClass = require('../../src/models/line');
const driverTypeSchemaClass = require('../../src/models/driverType');
const vehicleTypeSchemaClass =require('../../src/models/vehicleType');
const linePathSchemaClass =require('../../src/models/linePath');
const lineRepoClass = require('../../src/repos/lineRepo');
const LineClass = require('../../src/domain/line');
const lineInstance = new LineClass();

describe('line repo', function() {

    afterEach(function() {
        sinon.restore();
    })

    it('saveLine: returns domain object with  values', async function() {

        let dto = {
            code: "CODIGO7", 
            name: "arouca", 
            color: "RGB(0,0,0)", 
            linePaths:["path1","path2"],
            allowedVehicles:["V01"],
            allowedDrivers:["D01"]
        }

        let object = lineInstance.create(dto);
        
        sinon.stub(lineSchemaClass, "findOne").returns(false);
        sinon.stub(driverTypeSchemaClass, "findOne").returns(true);
        sinon.stub(vehicleTypeSchemaClass, "findOne").returns(true);
        sinon.stub(linePathSchemaClass, "findOne").returns(true);


        const repoInstance = new lineRepoClass(lineSchemaClass);

        let newObject = await repoInstance.saveLine(object);

        sinon.assert.match(newObject, lineInstance.create(dto));
    })

    it('saveLine: returns null', async function() {

        let dto = {
            code: "CODIGO7", name: "arouca", color: "RGB(0,0,0)", 
        linePaths:["path1","path2"],allowedVehicles:["V01"],allowedDrivers:["D01"]
        }

        let object = lineInstance.create(dto);
        
        sinon.stub(lineSchemaClass, "findOne").returns(true);

        const repoInstance = new lineRepoClass(lineSchemaClass);

        let newObject = await repoInstance.saveLine(object);

        sinon.assert.match(newObject, null);
    })
})