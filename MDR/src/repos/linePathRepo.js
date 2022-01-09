
const PathSchema = require('../models/path');
const LinePathMap = require('../mappers/linePathMap');
const LinePathSchema = require('../models/linePath');
const mapInstance = new LinePathMap();


module.exports = class LinePathRepo {

    constructor(schema) {
        if (schema === undefined) {
            this.schema = LinePathSchema;
        } else {
            this.schema = schema;
        }
    }
    async saveLinePath(linePath, res) {
        try {
            // verifies if code is repeated
            const repeatedLinePath = await LinePathSchema.findOne({ code: linePath.code });
            if (repeatedLinePath) {
                return null;
            }
            // verifies if path exists
            // const pathExists = await PathSchema.findOne({code: linePath.path});
            // if(!pathExists){
            //     return null;
            // }
            // updates the line's linePath list
            

            let linePathRaw = mapInstance.toPersistence(linePath);
            let linePathSchema = new LinePathSchema(linePathRaw);
            linePathSchema.code = linePath.code;
            linePathSchema.path = linePath.path;
            linePathSchema.orientation = linePath.orientation;
            linePathSchema.line = linePath.line;

            linePathSchema.save();
            return linePath;
        } catch (error) {
            throw error;
        }

    }


    async getAllLinePaths(res) {
        LinePathSchema.find(function (err, linePaths) {
            if (err)
                return res.send(err);

            return res.json(linePaths);
        });
    }

    async getPathsByLine(line,res){
        const doc = await LinePathSchema.find({line : line});
        let array = [];
        for(let i = 0 ; i < doc.length ; i++){
            array[i] = doc[i].path;
        }
        return array;
    }
}
