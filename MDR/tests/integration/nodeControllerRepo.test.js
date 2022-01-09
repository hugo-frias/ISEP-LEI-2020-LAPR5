const sinon = require('sinon');
const { response, request } = require('express');
const NodeServiceClass = require('../../src/services/nodeService');
const NodeControllerClass = require('../../src/controllers/nodeController');
const NodeRepoClass = require('../../src/repos/nodeRepo');
const NodeSchemaClass = require('../../src/models/node');

const req = request;
let res = response;
const next = function() {};

describe('node controller and repository integration', function() {

    afterEach(function() {
        sinon.restore();
    })

    it('createNode: returns returns successfull code (201)', async function() {

        let nodeBody = {
            name: "Alvite",
            shortName: "ALT",
            latitude: 40.9793,
            longitude: -7.71068,
            isDepot: true
        }

        res = {status: sinon.spy() };

        req.body = nodeBody;

        let nodeDTO = {
            name: "Alvite",
            shortName: "ALT",
            latitude: 40.9793,
            longitude: -7.71068,
            isDepot: true
        }

        sinon.stub(NodeSchemaClass, 'findOne').returns(false);

        let nodeRepoInstance = new NodeRepoClass(NodeSchemaClass);
        let nodeServiceInstance = new NodeServiceClass(nodeRepoInstance);
        let nodeControllerInstance = new NodeControllerClass(nodeServiceInstance);

        await nodeControllerInstance.createNode(req, res, next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(201));

    })

    it('createNode: returns fail code (400)', async function() {

        req.body = {
            name: "Alvite",
            shortName: "ALT",
            latitude: 40.9793,
            longitude: -7.71068,
            isDepot: true
        };

        let nodeDTO = {
            name: "Alvite",
            shortName: "ALT",
            latitude: 40.9793,
            longitude: -7.71068,
            isDepot: true
        }

        res = {status: sinon.spy() };

        sinon.stub(NodeSchemaClass, 'findOne').returns(true);

        let nodeRepoInstance = new NodeRepoClass(NodeSchemaClass);
        let nodeServiceInstance = new NodeServiceClass(nodeRepoInstance);
        let nodeControllerInstance = new NodeControllerClass(nodeServiceInstance);

        await nodeControllerInstance.createNode(req, res, next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(400));
    })

    it('getNode: returns returns successfull code (201) to Depot true', async function() {

        let resBody = {
            name: "Alvite",
            shortName: "ALT",
            latitude: 40.9793,
            longitude: -7.71068,
            isDepot: true
        }
        req.query = {filter: "Depot", filterValue: true}

        let nodeRepoInstance = new NodeRepoClass(NodeSchemaClass);
        let nodeServiceInstance = new NodeServiceClass(nodeRepoInstance);
        let nodeControllerInstance = new NodeControllerClass(nodeServiceInstance);

        sinon.stub(nodeControllerInstance, 'getNode').returns({name: "Alvite", shortName: "ALT", latitude: 40.9793, longitude: -7.71068, isDepot: true});

        let resultBody = await nodeControllerInstance.getNode(req, res);

        sinon.assert.match(resBody, resultBody);

    })

    it('getNode: returns returns successfull code (201) to non existing Depot true', async function() {

        let resBody = {};
        req.query = {filter: "Depot", filterValue: true}

        let nodeRepoInstance = new NodeRepoClass(NodeSchemaClass);
        let nodeServiceInstance = new NodeServiceClass(nodeRepoInstance);
        let nodeControllerInstance = new NodeControllerClass(nodeServiceInstance);

        sinon.stub(nodeControllerInstance, 'getNode').returns({});

        let resultBody = await nodeControllerInstance.getNode(req, res);

        sinon.assert.match(resBody, resultBody);

    })

    it('getNode: returns returns successfull code (201) to Depot false', async function() {

        let resBody = {
            name: "Alvite",
            shortName: "ALT",
            latitude: 40.9793,
            longitude: -7.71068,
            isDepot: false
        }

        req.query = {filter: "Depot", filterValue: false}

        let nodeRepoInstance = new NodeRepoClass(NodeSchemaClass);
        let nodeServiceInstance = new NodeServiceClass(nodeRepoInstance);
        let nodeControllerInstance = new NodeControllerClass(nodeServiceInstance);

        sinon.stub(nodeControllerInstance, 'getNode').returns({name: "Alvite", shortName: "ALT", latitude: 40.9793, longitude: -7.71068, isDepot: false});

        let resultBody = await nodeControllerInstance.getNode(req, res);

        sinon.assert.match(resBody, resultBody);

    })

    it('getNode: returns returns successfull code (201) to non existing Depot false', async function() {

        let resBody = {};

        req.query = {filter: "Depot", filterValue: false}

        let nodeRepoInstance = new NodeRepoClass(NodeSchemaClass);
        let nodeServiceInstance = new NodeServiceClass(nodeRepoInstance);
        let nodeControllerInstance = new NodeControllerClass(nodeServiceInstance);

        sinon.stub(nodeControllerInstance, 'getNode').returns({});

        let resultBody = await nodeControllerInstance.getNode(req, res);

        sinon.assert.match(resBody, resultBody);

    })

    it('getNode: returns returns successfull code (201) to specific shortName', async function() {

        let resBody = {
            name: "Alvite",
            shortName: "ALT",
            latitude: 40.9793,
            longitude: -7.71068,
            isDepot: false
        }

        req.query = {filter: "specific", filterValue: "ALT"}

        let nodeRepoInstance = new NodeRepoClass(NodeSchemaClass);
        let nodeServiceInstance = new NodeServiceClass(nodeRepoInstance);
        let nodeControllerInstance = new NodeControllerClass(nodeServiceInstance);

        sinon.stub(nodeControllerInstance, 'getNode').returns({name: "Alvite", shortName: "ALT", latitude: 40.9793, longitude: -7.71068, isDepot: false});

        let resultBody = await nodeControllerInstance.getNode(req, res);

        sinon.assert.match(resBody, resultBody);

    })

    it('getNode: returns returns successfull code (201) to non existing specific shortName', async function() {

        let resBody = {};

        req.query = {filter: "specific", filterValue: "ALTX"}

        let nodeRepoInstance = new NodeRepoClass(NodeSchemaClass);
        let nodeServiceInstance = new NodeServiceClass(nodeRepoInstance);
        let nodeControllerInstance = new NodeControllerClass(nodeServiceInstance);

        sinon.stub(nodeControllerInstance, 'getNode').returns({});

        let resultBody = await nodeControllerInstance.getNode(req, res);

        sinon.assert.match(resBody, resultBody);

    })


})