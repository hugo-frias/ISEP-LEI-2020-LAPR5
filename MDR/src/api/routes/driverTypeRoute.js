const DriverTypeControllerClass = require('../../controllers/driverTypeController');
const Joi = require('joi');
const { Router } = require('express');

const router = Router();

const controllerInstance = new DriverTypeControllerClass();

function validateDriverType(data) {
    const Schema = Joi.object({
        code: Joi.string().max(20).required(),
        description: Joi.string().max(250).required()
    });
    return Schema.validate(data);
}

module.exports = (app) => {

    // Creates a new route related to driver types
    app.use('/driverType', router);

    //register one driver type
    router.post('', function (req, res, next) {

        // Validates the data in the request body
        const { error } = validateDriverType(req.body);

        if (error) {
            // Sends the response if data doens't follow the corresponding restrictions
            return res.status(400).send(error.details[0].message);
        }

        // Calls the controller function
        controllerInstance.createDriverType(req,res,next);
    });

    router.get('', function(req,res,next) {

        //calls the controller function
        controllerInstance.getDriverTypes(res, next);      
    });

}