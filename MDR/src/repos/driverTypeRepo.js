const DriverTypeSchema = require('../models/driverType');
const DriverTypeMap = require('../mappers/DriverTypeMap');
const mapInstance = new DriverTypeMap();

module.exports = class DriverTypeRepo {

    constructor(schema) {
        if(schema == undefined) {
            this.schema = DriverTypeSchema;
        } else {
            this.schema = schema;
        }
    }

    async saveDriverType(driverType) {

        const driverTypeDocument = await this.schema.findOne({ code: driverType.code });
    
        try {
    
            if (driverTypeDocument) {
                return null;
            }
    
            const driverTypeRaw = mapInstance.toPersistence(driverType);
            const driverTypeSchema = new DriverTypeSchema(driverTypeRaw);
            driverTypeSchema.code = driverType.code;
            driverTypeSchema.description = driverType.description;
            driverTypeSchema.save();
            return driverType;
    
        } catch (err) {
            throw err;
        }
    }

    async getAllDriverTypes() {
        let driverTypesList = await DriverTypeSchema.find();
        return driverTypesList;
    }
}