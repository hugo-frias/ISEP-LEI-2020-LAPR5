const AggregateRoot = require('../core/domain/AggregateRoot');

module.exports = class DriverType extends AggregateRoot {
    
    constructor(driverTypeProps, driverTypeCode) {
        super(driverTypeProps,driverTypeCode);
    }

    get code() {
        return this._id;
    }

    get description() {
        return this._props.description;
    }

    set description(driverTypeDescription) {
        this._props.description = driverTypeDescription;
    }

    create(driverTypeDTO) {
        const code = driverTypeDTO.code;
        const description = driverTypeDTO.description;

        if(!!description === false || description.length === 0 || !!code === false || code.length === 0) {
            throw new Error;
        } else {
            const driverType = new DriverType({description: description}, code);
            return driverType;
        }
    }
}