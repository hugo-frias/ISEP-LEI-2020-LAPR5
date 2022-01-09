var LinePathControllerClass = require('../../controllers/linePathController');
var Joi = require('joi');
var Router  = require('express');
const router = Router();

function validateLinePath(data){
    const Schema = Joi.object({
        code: Joi.string().max(20).required(),
        path: Joi.string().required(), 
        orientation: Joi.string().required(),
        line: Joi.string().optional
    });
    return Schema.validate(data);
}



const controllerInstance = new LinePathControllerClass();

module.exports = (app) => {

    // Creates a new route related to lines
    app.use('/linePath',router);

    //register one Line
    router.post('', function(req,res,next){
        //validates the data in the request body
        const {error} = validateLinePath(req.body);
        if(error){
            //Sends the response if data doesn't follow the corresponding restrictions
            return res.status(400).send(error.details[0].message);
        }

        //calls the controller function
        controllerInstance.createLinePathController(req,res,next);
    });

    router.get('',function(req,res,next){



        // Calls the controller function
        controllerInstance.getLinePathController(req,res,next);
    });

    router.get('/:line',function(req,res,next){
        controllerInstance.getPathsByLine(req,res,next);
    });
}