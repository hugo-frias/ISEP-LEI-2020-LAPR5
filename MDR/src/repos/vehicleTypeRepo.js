const VehicleTypeSchema = require('../models/vehicleType');
const VehicleTypeMap = require('../mappers/VehicleTypeMap');
const mapInstance = new VehicleTypeMap();

module.exports = class VehicleTypeRepo {

    constructor(schema) {
        if(schema == undefined) {
            this.schema = VehicleTypeSchema;
        } else {
            this.schema = schema;
        }
    }

    async saveVehicleType(vehicleType) {

        const vehicleTypeDocument = await VehicleTypeSchema.findOne({ code: vehicleType.code });
    
        try {
    
            if (vehicleTypeDocument) {
                return null;
            }
    
            const vehicleTypeRaw = mapInstance.toPersistence(vehicleType);
            const vehicleTypeSchema = new VehicleTypeSchema(vehicleTypeRaw);
            vehicleTypeSchema.code = vehicleType.code;
            vehicleTypeSchema.name = vehicleType.name;
            vehicleTypeSchema.autonomy = vehicleType.autonomy;
            vehicleTypeSchema.cost = vehicleType.cost;
            vehicleTypeSchema.avgSpeed = vehicleType.avgSpeed;
            vehicleTypeSchema.energy = vehicleType.energy;
            vehicleTypeSchema.consumption = vehicleType.consumption;
            vehicleTypeSchema.emission = vehicleType.emission;
            vehicleTypeSchema.save();
            return vehicleType;
    
        } catch (err) {
            throw err;
        }
    }
}