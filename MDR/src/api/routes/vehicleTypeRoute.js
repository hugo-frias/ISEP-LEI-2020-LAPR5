const VehicleTypeControllerClass = require('../../controllers/vehicleTypeController');
const VehicleType = require('../../models/vehicleType')
const Joi = require('joi');
const { Router } = require('express');

const router = Router();

function validateVehicleType(data) {
    const Schema = Joi.object({
        code: Joi.string().required().trim().min(20).max(250),
        name: Joi.string().required(),
        autonomy: Joi.number().required().positive().precision(0),
        cost: Joi.number().required().positive(),
        avgSpeed: Joi.number().required().positive().precision(0),
        energy: Joi.number().required(),
        consumption: Joi.number().required().positive(),
        emission: Joi.number().required(),
    });
    return Schema.validate(data);
}

module.exports = (app) => {

    // Creates a new route related to vehicle types
    app.use('/vehicleType', router);

    //register one vehicle type
    router.post('', function (req, res, next) {

        // Validates the data in the request body
        const { error } = validateVehicleType(req.body);

        if (error) {
            // Sends the response if data doens't follow the corresponding restrictions
            return res.status(400).send(error.details[0].message);
        }

        // Calls the controller function
        const controllerInstance = new VehicleTypeControllerClass();
        controllerInstance.createVehicleType(req,res,next);
    });

    router.get('/',function(req, res) {
        VehicleType.find(function(err, vehicles) {
            if (err)
                res.send(err);

            res.json(vehicles);
        });
    });

}