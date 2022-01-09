const PathServiceClass = require('../services/pathService');
const PathServiceInstance = new PathServiceClass();
const PathMap = require('../mappers/PathMap');
const mapInstance = new PathMap();

module.exports = class PathController {
    constructor(newInstance) {
        if (newInstance == undefined) {
            this.serviceInstance = PathServiceInstance;
        } else {
            this.serviceInstance = newInstance;
        }
    }

    async createPath(req, res, next) {
        try {
            const pathDTO = mapInstance.toDTO(req.body);
            const newPathDTO = await this.serviceInstance.createPath(pathDTO);
            if (newPathDTO == null) {
                return res.status(400).send('Error creating path!');
            }
            return res.status(201).send('The path was successfully added!');
        } catch (err) {
            next(err);
        }
    }

    async getPaths(res, next) {

        try {
            const pathsList = await this.serviceInstance.getPaths();
            return res.json(pathsList);
        } catch (err) {
            next(err);
        }

    }

    async getPathNodesById(req, res, next) {

        try {
            const path = await this.serviceInstance.getPathNodesByIdPath(req,res);
            return res.json(path);
        } catch (err) {
            next(err);
        }

    }
}