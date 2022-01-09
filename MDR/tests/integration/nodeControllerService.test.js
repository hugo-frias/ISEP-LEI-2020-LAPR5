const sinon = require('sinon');
const { response, request } = require('express');
const NodeServiceClass = require('../../src/services/nodeService');
const NodeControllerClass = require('../../src/controllers/nodeController');
const NodeRepoClass = require('../../src/repos/nodeRepo');
const NodeClass = require('../../src/domain/node');

const nodeRepoInstance = new NodeRepoClass();
const nodeInstance = new NodeClass();

describe('node controller and service integration', function() {

    afterEach(function() {
        sinon.restore();
    })

    it('createNode: returns successfull code (201)', async function() {

        let nodeBody = {
            name: "Alvite",
            shortName: "ALT",
            latitude: 40.9793,
            longitude: -7.71068,
            isDepot: true
        }

        let req = request;
        let res = {
            status: sinon.spy()
        }
        let next = function() {};

        req.body = nodeBody;

        let nodeDTO = {
            name: "Alvite",
            shortName: "ALT",
            latitude: 40.9793,
            longitude: -7.71068,
            isDepot: true
        }

        let struct = nodeInstance.create(nodeDTO);
        sinon.stub(nodeRepoInstance, 'saveNode').returns(struct);

        let nodeServiceInstance = new NodeServiceClass(nodeRepoInstance);
        let nodeControllerInstance = new NodeControllerClass(nodeServiceInstance);

        await nodeControllerInstance.createNode(req, res, next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(201));
    })

    it('createNode: returns fail code (400)', async function() {

        let nodeBody = {
            name: "Alvite",
            shortName: "ALT",
            latitude: 40.9793,
            longitude: -7.71068,
            isDepot: true
        }

        let req = request;
        let res = {
            status: sinon.spy()
        }
        let next = function() {};

        req.body = nodeBody;

        sinon.stub(nodeRepoInstance, 'saveNode').returns(null);
        let nodeServiceInstance = new NodeServiceClass(nodeRepoInstance);
        let nodeControllerInstance = new NodeControllerClass(nodeServiceInstance);
        await nodeControllerInstance.createNode(req, res, next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(400));
    })

})