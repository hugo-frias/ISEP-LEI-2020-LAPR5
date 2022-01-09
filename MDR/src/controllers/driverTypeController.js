const DriverTypeServiceClass = require('../services/driverTypeService');
const DriverTypeServiceInstance = new DriverTypeServiceClass();
const DriverTypeMap = require('../mappers/DriverTypeMap');
const mapInstance = new DriverTypeMap();

module.exports = class DriverTypeController {

    constructor(newInstance) {
        if(newInstance == undefined) {
            this.serviceInstance = DriverTypeServiceInstance;
        } else {
            this.serviceInstance = newInstance;
        }
    }

    async createDriverType(req, res, next) {
        try {

            const driverTypeDTO = mapInstance.toDTO(req.body);

            const newDriverTypeDTO = await this.serviceInstance.createDriverType(driverTypeDTO);
            if (newDriverTypeDTO == null) {
                return res.status(400).send('The driver type already exists!');
            }

            return res.status(201).send('The driver type was successfully added!');

        } catch (err) {
            next(err);
        }
    }

    async getDriverTypes(res, next) {

        try {
            const driverTypesListDTO = await this.serviceInstance.getDriverTypes();
            return res.json(driverTypesListDTO);
        } catch (err) {
            next(err);
        }

    }
}