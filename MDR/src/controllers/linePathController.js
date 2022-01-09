const LinePathServiceClass  = require('../services/linePathService');
const LinePathServiceInstance = new LinePathServiceClass();
const LinePathMap = require('../mappers/linePathMap');
const mapInstance = new LinePathMap();


module.exports = class LinePathController {

    constructor(newInstance) {
        if (newInstance == undefined) {
            this.serviceInstance = LinePathServiceInstance;
        } else {
            this.serviceInstance = newInstance;
        }
    }

    async createLinePathController(req, res, next) {
        try {
            const linePathDTO = mapInstance.toDTO(req.body);

            const newLinePathDTO = await this.serviceInstance.createLinePathService(linePathDTO);
            if (newLinePathDTO == null) {
                return res.status(400).send('Error creating the line path');
            }

            return res.status(201).send('The line path was successfully added!');



        } catch (err) {
            next(err);
        }
    }

    async getLinePathController(req, res, next) {
        try {
            return this.serviceInstance.getLinePathService(req,res);

        } catch (err) {
            next(err);
        }
    }

    async getPathsByLine(req,res,next){
        try {
            const path = await this.serviceInstance.getPathsByLine(req,res);
            return res.json(path);
        } catch (err) {
            next(err);
        }
    }


}




















/*
function validateLine(data){
    const Schema = Joi.object({
        code: Joi.string().min(1).required(),
        name: Joi.string().required(),
        color: Joi.string().required(),
        linePaths: Joi.array().required(),
        allowedVehicles: Joi.array().optional(),
        deniedVehicles: Joi.array().optional(),
        allowedDrivers: Joi.array().optional(),
        deniedDrivers: Joi.array().optional()

    });
    return Schema.validate(data);
}

function createLineController(req,res){

    // Validates the data in the request body
    const{ error } = validateLine(req.body);
    if(error){
        // Sends the response if data doesn't follow the corresponding restrictions
        return res.status(400).send(error.details[0].message);
    }

    // Calls the corresponding service
    return createLineService(req,res);
}

function getLineController(req,res) {

    // Calls the corresponding service
    return getLineService(req,res);

}

// Exports the createLine function
module.exports.createLineController = createLineController;

// Exports the getLine function
module.exports.getLineController = getLineController;*/