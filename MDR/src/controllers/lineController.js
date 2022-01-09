const LineServiceClass  = require('../services/lineService');
const LineServiceInstance = new LineServiceClass();
const LineMap = require('../mappers/lineMap');
const mapInstance = new LineMap();


module.exports = class LineController {

    constructor(newInstance) {
        if (newInstance == undefined) {
            this.serviceInstance = LineServiceInstance;
        } else {
            this.serviceInstance = newInstance;
        }
    }

    async createLineController(req, res, next) {
        try {
            const lineDTO = mapInstance.toDTO(req.body);

            const newLineDTO = await this.serviceInstance.createLineService(lineDTO);
            if (newLineDTO == null) {
                return res.status(400).send('Error creating the line');
            }

            return res.status(201).send('The line was successfully added!');



        } catch (err) {
            next(err);
        }
    }

    async getLineController(req, res, next) {
        try {
            return this.serviceInstance.getLineService(req,res);

        } catch (err) {
            next(err);
        }
    }

    async updateLineController(req, res, next) {
        try {
            const lineDTO = mapInstance.toDTO(req.body);
            const newLineDTO = await this.serviceInstance.updateLineService(lineDTO);
            if (newLineDTO == null) {
                return res.status(400).send('Error updating the line');
            }

            return res.status(201).send('The line was successfully updated!');



        } catch (err) {
            next(err);
        }
    }


}