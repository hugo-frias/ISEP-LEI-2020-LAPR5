const NodeServiceClass = require('../services/nodeService');
const NodeMap = require('../mappers/NodeMap');

const NodeServiceInstance = new NodeServiceClass();
const mapInstance = new NodeMap();

module.exports = class NodeController {

    constructor(newInstance) {
        if (newInstance === undefined) {
            this.serviceInstance = NodeServiceInstance;
        } else {
            this.serviceInstance = newInstance;
        }

    }

    async createNode(req, res, next) {
        try {
            let nodeDTO = mapInstance.toDTO(req.body);

            let newNodeDTO = await this.serviceInstance.createNode(nodeDTO);
            if (newNodeDTO == null) {
                return res.status(400).send('The node already exists!');
            }
            
            return res.status(201).send('The node was successfully added!');

        } catch (error) {
            next(error);
        }

    }

    async getNode(req, res) {
        try {
            return this.serviceInstance.getNode(req, res);
        } catch (error) {
            throw error;
        }
    }

}