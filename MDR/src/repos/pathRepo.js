const PathSchema = require('../models/path');
const PathMap = require('../mappers/PathMap');
const mapInstance = new PathMap();
const pathNode = require('../models/pathNode');

module.exports = class PathRepo {
    constructor(schema) {
        if (schema == undefined) {
            this.schema = PathSchema;
        } else {
            this.schema = schema;
        }
    }

    async savePath(path) {
        const pathDocument = await PathSchema.findOne({ code: path.code });
        try {
            if (pathDocument) {
                return null;
            }
            const pathRaw = mapInstance.toPersistence(path);
            const pathSchema = new PathSchema(pathRaw);
            pathSchema.code = path.code;
            pathSchema.isEmpty = path.isEmpty;
            if (path.pathNodes != undefined) {
                if (path.isEmpty) {
                    if (path.pathNodes.length != 2) {
                        return null;
                    } else {
                        for (var i = 0; i < path.pathNodes.length; i++) {
                            const ns = await pathNode.findOne({ code: path.pathNodes[i] })
                            if (!ns) {
                                return null;
                            }
                            if (i == 0 && (ns.distance != null || ns.duration != null)) {
                                return null;
                            }
                            if (i != 0 && (ns.distance == null || ns.duration == null)) {
                                return null;
                            }
                        }
                    }
                } else {
                    if (path.pathNodes.length <= 2) {
                        return null;
                    } else {
                        for (var i = 0; i < path.pathNodes.length; i++) {
                            const ns = await pathNode.findOne({ code: path.pathNodes[i] })
                            if (!ns) {
                                return null;
                            }
                            if (i == 0 && (ns.distance != null || ns.duration != null)) {
                                return null;
                            }
                            if (i != 0 && (ns.distance == null || ns.duration == null)) {
                                return null;
                            }
                        }
                    }
                }
            }
            pathSchema.pathNodes = path.pathNodes;
            pathSchema.save();
            return path;
        } catch (err) { throw err; }
    }

    async getAllPaths() {
        let pathLines = await this.schema.find();
        return pathLines;
    }

    async getPathNodesByIdPath(codeAux, res) {
        const doc = await PathSchema.findOne({code : codeAux});
        return doc.pathNodes;
    }
}


