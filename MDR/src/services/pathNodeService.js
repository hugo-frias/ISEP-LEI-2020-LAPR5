const pathNodeRepoClass = require('../repos/pathNodeRepo');
const pathNodeRepoInstance = new pathNodeRepoClass();
const pathNode = require('../domain/pathNode');
const pathNodeMap = require('../mappers/PathNodeMap');
const classInstance = new pathNode();
const mapInstance = new pathNodeMap();

module.exports = class pathNodeService {

    constructor(newInstance) {
        if (newInstance == undefined) {
            this.repoInstance = pathNodeRepoInstance;
        } else {
            this.repoInstance = newInstance;
        }
    }

    async createpathNode(pathNodeDTO) {
        try {
            const pathNode = classInstance.create(pathNodeDTO);
            const newpathNode = await this.repoInstance.savepathNode(pathNode);
            if (newpathNode == null) {
                return null;
            }
            const newPathNodeDTO = mapInstance.toDTO(newpathNode);
            return newPathNodeDTO;
        } catch (err) {
            throw err;
        }
    }

    async getAllPathNodes() {
        try{
            const pathNodes = await this.repoInstance.getAllPathNodes();
            return pathNodes;
        }catch(err){
            throw err;
        }
    }

    async getDurationByCode(req, res) {
        return await this.repoInstance.getDurationByCode(req.params.code,res);
    }
}