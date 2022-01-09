const PathNodeSchema = require('../models/pathNode');
const pathNodeMap = require('../mappers/PathNodeMap');
const mapInstance = new pathNodeMap();
const node = require('../models/node');
const pathNode = require('../models/pathNode');

module.exports = class pathNodeRepo {

    constructor(schema) {
        if (schema == undefined) {
            this.schema = PathNodeSchema;
        } else {
            this.schema = schema;
        }
    }

    async savepathNode(pathNode) {

        const pathNodeDocument = await this.schema.findOne({ code: pathNode.code });
        try {
            if (pathNodeDocument) {
                return null;
            }
            const pathNodeRaw = mapInstance.toPersistence(pathNode);
            const pathNodeSchema = new PathNodeSchema(pathNodeRaw);
            pathNodeSchema.code = pathNode.code;
            pathNodeSchema.duration = pathNode.duration;
            pathNodeSchema.distance = pathNode.distance;
            if (pathNode.node != undefined) {
                const n = await node.findOne({ ShortName: pathNode.node })
                if (!n) {
                    console.log("NODE -> " + pathNode.node);
                    return null;
                }
            } else {
                pathNodeSchema.node = pathNode.node;
            }
            /*
            let lista = await this.schema.find().exec();
            for(var i = 0 ; i < lista.length; i++){
                if(lista[i].distance == pathNode.distance && lista[i].duration == pathNode.duration && lista[i].node == pathNode.node){
                    return null;
                }
            }*/
            pathNodeSchema.save();
            return pathNode;
        } catch (err) {
            throw err;
        }
    }

    async getAllPathNodes() {
        let pathNodes = await PathNodeSchema.find();
        return pathNodes;
    }

    async getDurationByCode(codeAux, res) {
        const doc = await PathNodeSchema.findOne({code : codeAux});
        return doc.duration;
    }
}