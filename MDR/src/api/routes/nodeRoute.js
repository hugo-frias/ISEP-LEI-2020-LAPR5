const NodeControllerClass = require('../../controllers/nodeController');
const Joi = require('joi');
let { Router } = require('express');

const router = Router();
const nodeControllerInstance = new NodeControllerClass();


/* Function to validate data before create a Node */
function validateNode(data) {
    let verifyShortName = new RegExp("[A-Z]{3}[A-Z]*")
    const Schema = Joi.object({
        ShortName : Joi.string().regex(verifyShortName).min(1).required(),
        Name: Joi.string().min(3).required(),
        Latitude : Joi.number().required(),
        Longitude : Joi.number().required(),
        IsDepot : Joi.boolean().required(),
        IsReliefPoint : Joi.boolean().required(),
        Model : Joi.string()
    });
    return Schema.validate(data);
}


module.exports = (app) => {

    // Creates a new route related to nodes
    app.use('/node', router);

    //register one node
    router.post('/', function(req,res) {

        const { error } = validateNode(req.body);

        if(error) {
            return res.status(406).send(error.details[0].message);
        }

        nodeControllerInstance.createNode(req,res)});

    // lists all nodes
    router.get('/',function(req,res){
        nodeControllerInstance.getNode(req,res)});

}