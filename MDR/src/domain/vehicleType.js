const AggregateRoot = require('../core/domain/AggregateRoot');
const energySource ={

    GASOLINA: 'gasolina', // 1 
    GPL: 'GPL', // 20
    HIDRO: 'hidrogenio', // 50
    ELETR: 'eletrico', // 75
    GASOLEO: 'gasoleo' //23

}


module.exports = class VehicleType extends AggregateRoot {

    constructor(vehicleTypeProps, vehicleTypeCode) {
        super(vehicleTypeProps, vehicleTypeCode);
    }

    get code() {
        return this._id;
    }
    
    get name() {
        return this._props.name;
    }

    get energy() {
        return this._props.energy;
    }
    get autonomy() {
        return this._props.autonomy;
    }
    get cost() {
        return this._props.cost;
    }

    get avgSpeed() {
        return this._props.avgSpeed;
    }
    get consumption() {
        return this._props.consumption;
    }
    get emission() {
        return this._props.emission;
    }


    create(vehicleTypeDTO) {
        const code = vehicleTypeDTO.code;
        const name = vehicleTypeDTO.name;
        const autonomy = vehicleTypeDTO.autonomy;
        const cost = vehicleTypeDTO.cost;
        const avgSpeed = vehicleTypeDTO.avgSpeed;
        const energy = vehicleTypeDTO.energy;
        const consumption = vehicleTypeDTO.consumption;
        const emission = vehicleTypeDTO.emission;
        var newEnergy = vehicleTypeDTO.energy;

        
        if (!!name === false || name.length === 0 || !!code === false || code.length === 0 || !!autonomy <= 0 || !!cost <= 0 || !!avgSpeed <= 0 || !!energy == false|| !!consumption <= 0 || !!emission < 0 ) {
            throw new Error;
        } else {
            if(energy==23)newEnergy=energySource.GASOLEO
            if(energy==1)newEnergy=energySource.GASOLINA
            if(energy==20)newEnergy=energySource.GPL
            if(energy==50)newEnergy=energySource.HIDRO
            if(energy==75)newEnergy=energySource.ELETR
            const vehicleType = new VehicleType({ name: name, autonomy: autonomy, cost: cost, avgSpeed: avgSpeed, energy: newEnergy, consumption: consumption, emission: emission }, code);
            return vehicleType;
        }
          
            
        }
    }
