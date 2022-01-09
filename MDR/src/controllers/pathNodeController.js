const pathNodeServiceClass = require('../services/pathNodeService');
const pathNodeServiceInstance = new pathNodeServiceClass();
const pathNodeMap = require('../mappers/PathNodeMap');
const mapInstance = new pathNodeMap();

module.exports = class pathNodeController {

    constructor(newInstance) {
        if(newInstance == undefined) {
            this.serviceInstance = pathNodeServiceInstance;
        } else {
            this.serviceInstance = newInstance;
        }
    }

    async createpathNode(req, res, next) {
        try {
            const pathNodeDTO = mapInstance.toDTO(req.body);
            const newpathNodeDTO = await this.serviceInstance.createpathNode(pathNodeDTO);
            if (newpathNodeDTO == null) {
                return res.status(400).send('Error creating the path node!');
            }
            return res.status(201).send('The path node was successfully added!');
        } catch (err) {
            next(err);
        }
    }

    async getAllPathNodes(res,next) {
        try {
            const pathsList = await this.serviceInstance.getAllPathNodes();
            return res.json(pathsList);
        } catch (err) {
            next(err);
        }
    }

    async getDurationByCode(req,res,next){
        try {
            const pathNode = await this.serviceInstance.getDurationByCode(req,res);
            return res.json(pathNode);
        } catch (err) {
            next(err);
        }
    }
}