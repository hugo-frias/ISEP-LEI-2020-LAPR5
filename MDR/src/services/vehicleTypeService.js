const VehicleTypeRepoClass = require('../repos/vehicleTypeRepo');
const VehicleTypeRepoInstance = new VehicleTypeRepoClass();
const VehicleType = require('../domain/vehicleType');
const VehicleTypeMap = require('../mappers/VehicleTypeMap');
const classInstance = new VehicleType();
const mapInstance = new VehicleTypeMap();

module.exports = class VehicleTypeService {

    constructor(newInstance) {
        if(newInstance == undefined) {
            this.repoInstance = VehicleTypeRepoInstance;
        } else {
            this.repoInstance = newInstance;
        }
    }

    async createVehicleType(vehicleTypeDTO) {

        try {
    
            const vehicleType = classInstance.create(vehicleTypeDTO);
    
            const newVehicleType = await this.repoInstance.saveVehicleType(vehicleType);
            if(newVehicleType == null) {
                return null;
            }
    
            const newVehicleTypeDTO = mapInstance.toDTO(newVehicleType);
            return newVehicleTypeDTO;
    
        } catch (err) {
            throw err;
        }
    }
}