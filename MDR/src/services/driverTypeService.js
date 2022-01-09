const DriverTypeRepoClass = require('../repos/driverTypeRepo');
const DriverTypeRepoInstance = new DriverTypeRepoClass();
const DriverType = require('../domain/driverType');
const DriverTypeMap = require('../mappers/DriverTypeMap');
const classInstance = new DriverType();
const mapInstance = new DriverTypeMap();

module.exports = class DriverTypeService {

    constructor(newInstance) {
        if(newInstance == undefined) {
            this.repoInstance = DriverTypeRepoInstance;
        } else {
            this.repoInstance = newInstance;
        }
    }

    async createDriverType(driverTypeDTO) {

        try {
    
            const driverType = classInstance.create(driverTypeDTO);
    
            const newDriverType = await this.repoInstance.saveDriverType(driverType);
            if(newDriverType == null) {
                return null;
            }
    
            const newDriverTypeDTO = mapInstance.toDTO(newDriverType);
            return newDriverTypeDTO;
    
        } catch (err) {
            throw err;
        }
    }

    async getDriverTypes() {

        try{
            const driverTypesList = await this.repoInstance.getAllDriverTypes();
            let driverTypesListDTO = [];
            driverTypesList.forEach(element => {
                driverTypesListDTO.push(mapInstance.toDTO(element));
            });
            return driverTypesListDTO;
        }catch(err){
            throw err;
        }
    }
}