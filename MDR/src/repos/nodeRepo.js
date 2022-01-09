const node = require('../models/node');

const NodeSchema = require('../models/node');
const NodeMap = require('../mappers/NodeMap');
const mapInstance = new NodeMap();



module.exports = class NodeRepo {

    constructor(schema) {
        if (schema === undefined) {
            this.schema = NodeSchema;
        } else {
            this.schema = schema;
        }
    }

    async saveNode(node) {

        let nodeDocument = await NodeSchema.findOne({ ShortName: node.ShortName});

        try {

            if(nodeDocument) {
                return null;
            }

            let nodeRaw = mapInstance.toPersistence(node);
            let nodeSchema = new NodeSchema(nodeRaw);
            nodeSchema.Name = node.Name;
            nodeSchema.Shortname = node.ShortName;
            nodeSchema.Latitude = node.Latitude;
            nodeSchema.Longitude = node.Longitude;
            nodeSchema.IsDepot = node.IsDepot;
            nodeSchema.IsReliefPoint = node.IsReliefPoint;

            nodeSchema.save();

            if(nodeRaw === undefined) {
                return null;
            } else {
                return node;
            }


        } catch(error) {
            throw  error;
        }
    }

    async getDepotNodes(filter, res) {
        node.find({IsDepot: filter}, (error, nodes) => {
            if(error) {
                console.log(error);
                return res.status(400).send('Error trying to retrieve nodes!');
            } else {
				if(nodes[0] != undefined) {
				return res.status(201).send(mapInstance.toDTOs(nodes));
				}
                return res.status(201).send("There aren't any nodes that match that filter.");
            }
        })
    }

	async getAllNodesByShortName(order, res) {
        node.find({}, null, {sort : {ShortName : order}}, (error, nodes)=> {
            if(error) {
                console.log(error);
                return res.status(400).send('Error trying to retrieve nodes!');
            } else {
				if(nodes[0] != undefined) {
				return res.status(201).send(mapInstance.toDTOs(nodes));
				}
                return res.status(201).send("There aren't any nodes in MongoDB.");
            }
        })
    }


    async getNodeByShortName(specificShortName, res) {
        node.findOne({ShortName : specificShortName}, (error, node) => {
            if(error) {
                console.log(error);
                return res.status(400).send("Error trying to retrieve the node!");
            } else {
				if(node != undefined) {
				return res.status(201).send(mapInstance.toDTO(node));
				}
                return res.status(201).send("ShortName doesn't exist.");
            }
        })
    }

    async getNodeByKeyword(keyword, res) {
        node.find({Name : {$regex : "^" + keyword}}, (error, nodes) => {
            if(error) {
                console.log(error);
                return res.status(400).send("Error trying to retrieve nodes!");
            } else {
				if(nodes[0] != undefined) {
				return res.status(201).send(mapInstance.toDTOs(nodes));
				}
                return res.status(201).send("There aren't any nodes with that start keyword.");
            }
        })
    }

}