const NodeRepoClass = require('../repos/nodeRepo');
const Node = require('../domain/node');
const NodeMap = require('../mappers/NodeMap');

const NodeRepoInstance = new NodeRepoClass();
const classInstance = new Node();
const mapInstance = new NodeMap();


module.exports = class NodeService {

    constructor(newInstance) {
        if (newInstance === undefined) {
            this.repoInstance = NodeRepoInstance;
        } else {
            this.repoInstance = newInstance;
        }
    }


    async createNode(nodeDTO) {

        try {

            let node = classInstance.create(nodeDTO);
            let newNode = await this.repoInstance.saveNode(node);

            if(newNode == null) {
                return null;
            }

            return mapInstance.toDTO(newNode);
        } catch (error) {
            throw error;
        }

    }

async getNode(req, res) {

    if(req.query.filter === 'Depot') {
		(req.query.filterValue === '0' ? req.query.filterValue = false : req.query.filterValue = true)
        return await this.repoInstance.getDepotNodes(req.query.filterValue, res);
    }

    if(req.query.filter === 'specific' && req.query.filterValue !== '') {
        return await this.repoInstance.getNodeByShortName(req.query.filterValue, res);
    }

    if(req.query.filter === 'all' && req.query.filterValue !== null) {
        return await this.repoInstance.getAllNodesByShortName(req.query.filterValue,res);
    }

    if(req.query.filter === 'startsWith') {
        return await this.repoInstance.getNodeByKeyword(req.query.filterValue, res);
    }

    if(req.query.filter === undefined || req.query.filter === '' ) {
        return await this.repoInstance.getAllNodesByShortName(1,res);
    } else {
        return res.status(400).send('Error trying to retrieve the node!');
    }

}

}