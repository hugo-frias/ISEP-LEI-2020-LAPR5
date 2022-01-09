const PathControllerClass = require('../../controllers/pathController');
const Joi = require('joi');
const { Router } = require('express');

const router = Router();

function validatePath(data) {
    const Schema = Joi.object({
        code: Joi.string().required(),
        isEmpty: Joi.boolean().required(),
        pathNodes: Joi.array().required()
    });
    return Schema.validate(data);
}

module.exports = (app) => {
    //creates a new route related to paths
    app.use('/path', router);

    //register one path
    router.post('', function (req, res, next) {
        //validates the data in the request body
        const { error } = validatePath(req.body);
        if (error) {
            //sends the response if data doesn't follow the corresponding restriction
            return res.status(400).send(error.details[0].message);
        }

        //calls the controller function
        const controllerInstance = new PathControllerClass();
        controllerInstance.createPath(req, res, next);
    });

    router.get('/:code',function(req,res,next){
        const controllerInstance = new PathControllerClass();
        controllerInstance.getPathNodesById(req,res,next);
    });
   

    router.get('', function(req,res,next) {

        //calls the controller function
        const controllerInstance = new PathControllerClass();
        controllerInstance.getPaths(res, next);      
    });

}