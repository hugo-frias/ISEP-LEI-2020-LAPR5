const sinon = require('sinon');
const {response, request} = require('express');
const NodeServiceClass = require('../../src/services/nodeService');
const NodeControllerClass = require('../../src/controllers/nodeController');

const nodeServiceInstance = new NodeServiceClass();
const req = request;
const res = { status: sinon.spy() };

describe('node controller', function () {

    afterEach(function () {
        sinon.restore();
    })


    it('createNode: returns successfull code (201)', async function () {

        let body = {
            name: "Alvite",
            shortName: "ALT",
            latitude: 40.9793,
            longitude: -7.71068,
            isDepot: true
        }

        let next = function () {
        }

        req.body = body;

        sinon.stub(nodeServiceInstance, 'createNode').returns({
            name: req.body.name,
            shortName: req.body.shortName,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            isDepot: req.body.isDepot,
            isReliefPoint: req.body.isReliefPoint
        });
        let nodeControllerInstance = new NodeControllerClass(nodeServiceInstance);
        await nodeControllerInstance.createNode(req, res, next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(201));

    })


    it('createNode: returns fail code (400)', async function () {

        let res = response;
        let next = function () {
        }

        res = {
            status: sinon.spy()
        }

        sinon.stub(nodeServiceInstance, "createNode").returns(null);

        const controllerInstance = new NodeControllerClass(nodeServiceInstance);
        await controllerInstance.createNode(req, res, next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, sinon.match(400));
    })


    it('getNodeController : returns list with all nodes by asc order', async function () {


        let body = {"filter": 'all', "order": 1};

        req.body = body;

        let data = [
            {
                name: "Alvite",
                shortName: "ALT",
                latitude: 40.9793,
                longitude: -7.71068,
                isDepot: true
            },

            {
                name: "Moimenta da Beira",
                shortName: "MBR",
                latitude: 40.8793,
                longitude: -7.71068,
                isDepot: true
            }];


        sinon.stub(nodeServiceInstance, "getNode").returns([
            {
                name: "Alvite",
                shortName: "ALT",
                latitude: 40.9793,
                longitude: -7.71068,
                isDepot: true
            },

            {
                name: "Moimenta da Beira",
                shortName: "MBR",
                latitude: 40.8793,
                longitude: -7.71068,
                isDepot: true
            }
        ]);

        let nodeControllerInstance = new NodeControllerClass(nodeServiceInstance);
        let result = await nodeControllerInstance.getNode(req, res);
        sinon.assert.match(result, data);

    })

    it('getNodeController : returns list with all nodes by desc order', async function () {


        let body = {"filter": 'all', "order": -1};
        let req = request;

        req.body = body;

        let data = [
            {   name: "Moimenta da Beira",
                shortName: "MBR",
                latitude: 40.8793,
                longitude: -7.71068,
                isDepot: true
            },

            {   name: "Alvite",
                shortName: "ALT",
                latitude: 40.9793,
                longitude: -7.71068,
                isDepot: true
            }];

        sinon.stub(nodeServiceInstance, "getNode").returns([
            {   name: "Moimenta da Beira",
                shortName: "MBR",
                latitude: 40.8793,
                longitude: -7.71068,
                isDepot: true
            },

            {   name: "Alvite",
                shortName: "ALT",
                latitude: 40.9793,
                longitude: -7.71068,
                isDepot: true
            }]);


        let nodeControllerInstance = new NodeControllerClass(nodeServiceInstance);
        let result = await nodeControllerInstance.getNode(req, res);
        sinon.assert.match(result, data);

    })

    it('getNodeController : returns list with all depot nodes', async function () {

        req.body = {"filter": 'Depot', "depot": true};

        let data = (

            {name: "Moimenta da Beira", shortName: "MBR", latitude: 40.8793, longitude: -7.71068, isDepot: true}

        );


        sinon.stub(nodeServiceInstance, "getNode").returns(
            {name: "Moimenta da Beira", shortName: "MBR", latitude: 40.8793, longitude: -7.71068, isDepot: true},
        );

        let nodeControllerInstance = new NodeControllerClass(nodeServiceInstance);
        let result = await nodeControllerInstance.getNode(req, res);
        sinon.assert.match(result, data);

    })

    it('getNodeController : returns list with all non depot nodes', async function () {


        let res = {
            status: sinon.spy()
        }

        req.body = {"filter": 'Depot', "depot": false};

        let data = (
            {name: "Alvite", shortName: "ALT", latitude: 40.9793, longitude: -7.71068, isDepot: false}
        );


        sinon.stub(nodeServiceInstance, "getNode").returns(
            {name: "Alvite", shortName: "ALT", latitude: 40.9793, longitude: -7.71068, isDepot: false}
        );

        let nodeControllerInstance = new NodeControllerClass(nodeServiceInstance);
        let result = await nodeControllerInstance.getNode(req, res);
        sinon.assert.match(result, data);

    })

    it('getNodeController : returns list with all nodes that name starts with "Al"', async function () {

        req.body = {"filter": 'startsWith', "keyword": 'Al'};

        let data = (
            {name: "Alvite", shortName: "ALT", latitude: 40.9793, longitude: -7.71068, isDepot: false}
        );


        sinon.stub(nodeServiceInstance, "getNode").returns(
            {name: "Alvite", shortName: "ALT", latitude: 40.9793, longitude: -7.71068, isDepot: false}
        );

        let nodeControllerInstance = new NodeControllerClass(nodeServiceInstance);
        let result = await nodeControllerInstance.getNode(req, res);
        sinon.assert.match(result, data);

    })

})