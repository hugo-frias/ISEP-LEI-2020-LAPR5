const pathNodeControllerClass = require('../../controllers/pathNodeController');
const Joi = require('joi');
const { Router } = require('express');

const router = Router();

function validatepathNode(data) {
    const Schema = Joi.object({
        code: Joi.string().required(),
        duration: Joi.number().integer().allow(null).min(1).optional(),
        distance: Joi.number().integer().allow(null).min(1).optional(),
        node: Joi.string().required()

    });
    return Schema.validate(data);
}

const controllerInstance = new pathNodeControllerClass();

module.exports = (app) => {

    // Creates a new route related to path nodes
    app.use('/pathNode', router);

    //register one path nodes
    router.post('', function (req, res, next) {

        // Validates the data in the request body
        const { error } = validatepathNode(req.body);

        if (error) {
            // Sends the response if data doens't follow the corresponding restrictions
            return res.status(400).send(error.details[0].message);
        }

        // Calls the controller function
        controllerInstance.createpathNode(req, res, next);
    });

    // lists all pathnodes
    router.get('', function (req, res, next) {
        //calls the controller function
        controllerInstance.getAllPathNodes(res,next);
    });

    router.get('/:code',function(req,res,next){
        controllerInstance.getDurationByCode(req,res,next);
    });
}