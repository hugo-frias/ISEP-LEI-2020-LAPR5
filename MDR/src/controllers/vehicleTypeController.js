const VehicleTypeServiceClass = require('../services/vehicleTypeService');
const VehicleTypeServiceInstance = new VehicleTypeServiceClass();
const VehicleTypeMap = require('../mappers/VehicleTypeMap');
const mapInstance = new VehicleTypeMap();

module.exports = class VehicleTypeController {

    constructor(newInstance) {
        if(newInstance == undefined) {
            this.serviceInstance = VehicleTypeServiceInstance;
        } else {
            this.serviceInstance = newInstance;
        }
    }

    async createVehicleType(req, res, next) {
        try {

            const vehicleTypeDTO = mapInstance.toDTO(req.body);

            const newVehicleTypeDTO = await this.serviceInstance.createVehicleType(vehicleTypeDTO);
            if (newVehicleTypeDTO == null) {
                return res.status(400).send('The vehicle type already exists!');
            }

            return res.status(201).send('The vehicle type was successfully added!');

        } catch (err) {
            next(err);
        }
    }
}