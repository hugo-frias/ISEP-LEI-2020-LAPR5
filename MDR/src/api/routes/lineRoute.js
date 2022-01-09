var LineControllerClass = require('../../controllers/lineController');
var Joi = require('joi');
var Router  = require('express');
const router = Router();

function validateLine(data){
    const Schema = Joi.object({
        code: Joi.string().max(20).required(),
        name: Joi.string().max(20).required(), 
        color: Joi.string().required(),
        linePaths: Joi.array().optional(),
        allowedVehicles: Joi.array().optional(),
        deniedVehicles: Joi.array().optional(),
        allowedDrivers: Joi.array().optional(),
        deniedDrivers: Joi.array().optional()
    });
    return Schema.validate(data);
}




const controllerInstance = new LineControllerClass();

module.exports = (app) => {

    // Creates a new route related to lines
    app.use('/line',router);

    //register one Line
    router.post('', function(req,res,next){
        //validates the data in the request body
        const {error} = validateLine(req.body);
        if(error){
            //Sends the response if data doesn't follow the corresponding restrictions
            return res.status(400).send(error.details[0].message);
        }

        //calls the controller function
        controllerInstance.createLineController(req,res,next);
    });

    router.get('',function(req,res,next){



        // Calls the controller function
        controllerInstance.getLineController(req,res,next);
    });

    //register one Line
    router.put('', function(req,res,next){
        //validates the data in the request body
        
        //calls the controller function
        controllerInstance.updateLineController(req,res,next);
    });
}