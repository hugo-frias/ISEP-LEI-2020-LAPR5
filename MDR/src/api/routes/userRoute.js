const UserControllerClass = require('../../controllers/userController');
const Joi = require('joi');
const { Router } = require('express');

const router = Router();

function validateUser(data) {
    const Schema = Joi.object({
        email: Joi.string().min(7).required(),
        password: Joi.string().max(250).required(),
        userType: Joi.string().max(250).required()
    });
    return Schema.validate(data);
}

module.exports = (app) => {

    // Creates a new route related to users
    app.use('/user', router);

    //register one user
    router.post('', function (req, res, next) {

        // Validates the data in the request body
        const { error } = validateUser(req.body);

        if (error) {
            // Sends the response if data doens't follow the corresponding restrictions
            return res.status(400).send(error.details[0].message);
        }

        // Calls the controller function
        const controllerInstance = new UserControllerClass();
        controllerInstance.createUser(req,res,next);
    });

    router.delete('/:email', function(req,res,next){
        // Calls the controller function
        const controllerInstance = new UserControllerClass();
        controllerInstance.deleteUserByEmail(req,res,next);
    })

    router.get('/:email',function(req,res,next){



        // Calls the controller function
        const controllerInstance = new UserControllerClass();
        controllerInstance.getUserByEmail(req,res,next);
    });

    router.get('',function(req,res,next){



        // Calls the controller function
        const controllerInstance = new UserControllerClass();
        controllerInstance.getAllUsers(req,res,next);
    });

}