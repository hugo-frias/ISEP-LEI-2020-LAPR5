const sinon = require('sinon');
const lineRepoClass = require('../../src/repos/lineRepo');
const lineRepoInstance = new lineRepoClass();
const LineServiceClass = require('../../src/services/lineService');
const LineClass = require('../../src/domain/line');
const lineInstance = new LineClass();

describe('line service', function() {

    afterEach(function() {
        sinon.restore();
    })

    it('createLine: returns dto with  values', async function() {

        let dto = {
            code: "CODIGO7", name: "arouca", color: "RGB(0,0,0)", 
        linePaths:["path1","path2"],allowedVehicles:["V01"],allowedDrivers:["D01"]
        }

        let struct = lineInstance.create(dto);
        
        sinon.stub(lineRepoInstance, "saveLine").returns(struct);

        const serviceInstance = new LineServiceClass(lineRepoInstance);
        let newDto = await serviceInstance.createLineService(dto);

        sinon.assert.match(newDto, { code: "CODIGO7", name: "arouca", color: "RGB(0,0,0)", 
        linePaths:["path1","path2"],allowedVehicles:["V01"],allowedDrivers:["D01"]});
    })

    it('createLine: returns null', async function() {

        let dto = {
            code: "CODIGO7", name: "arouca", color: "RGB(0,0,0)", 
        linePaths:["path1","path2"],allowedVehicles:["V01"],allowedDrivers:["D01"]
        }
        
        sinon.stub(lineRepoInstance, "saveLine").returns(null);

        const serviceInstance = new LineServiceClass(lineRepoInstance);
        let newDto = await serviceInstance.createLineService(dto);

        sinon.assert.match(newDto, null);
    })
})