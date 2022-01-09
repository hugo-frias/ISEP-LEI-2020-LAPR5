const PathRepoClass = require('../repos/pathRepo');
const PathRepoInstance = new PathRepoClass();
const Path = require('../domain/path');
const PathMap = require('../mappers/PathMap');
const classInstance = new Path();
const mapInstance = new PathMap();

module.exports = class PathService{
    constructor(newInstance){
        if(newInstance == undefined){
            this.repoInstance = PathRepoInstance;
        }else{
            this.repoInstance = newInstance;
        }
    }

    async createPath(pathDTO){
        try{
            const path = classInstance.create(pathDTO);
            const newPath = await this.repoInstance.savePath(path);
            if(newPath == null){
                return null;
            }

            const newPathDTO = mapInstance.toDTO(newPath);
            return newPathDTO;
        }catch(err){
            throw err;
        }
    }

    async getPaths() {

        try{
            const pathsList = await this.repoInstance.getAllPaths();
            let pathsListDTO = [];
            pathsList.forEach(element => {
                pathsListDTO.push(mapInstance.toDTO(element));
            });
            return pathsListDTO;
        }catch(err){
            throw err;
        }
    }

    async getPathNodesByIdPath(req, res) {
        console.log(req.params.code);
        return await this.repoInstance.getPathNodesByIdPath(req.params.code,res);
    }
}