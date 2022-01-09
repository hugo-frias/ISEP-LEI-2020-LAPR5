const AggregateRoot = require('../core/domain/AggregateRoot');

module.exports = class Line extends AggregateRoot{

    constructor(lineProps, lineCode){
        super(lineProps, lineCode);
    }

    get code(){
        return this._id;
    }
    get name(){
        return this._props.name;
    }
    set name(lineName){
        this._props.name = lineName;
    }

    get color(){
        return this._props.color;
    }
    set color(lineColor){
        this._props.color = lineColor;
    }

    get linePaths(){
        return this._props.linePaths;
    }
    set linePaths(lineLinePaths){
        this._props.linePaths = lineLinePaths;
    }
       
    get allowedVehicles(){
        return this._props.allowedVehicles;
    }
    set allowedVehicles(lineAllowedVehicles){
        this._props.allowedVehicles = lineAllowedVehicles;
    }
          
    get deniedVehicles(){
        return this._props.deniedVehicles;
    }
    set deniedVehicles(lineDeniedVehicles){
        this._props.deniedVehicles = lineDeniedVehicles;
    }
          
    get allowedDrivers(){
        return this._props.allowedDrivers;
    }
    set allowedDrivers(lineAllowedDrivers){
        this._props.allowedDrivers = lineAllowedDrivers;
    }
          
    get deniedDrivers(){
        return this._props.deniedDrivers;
    }
    set deniedDrivers(lineDeniedDrivers){
        this._props.deniedDrivers = lineDeniedDrivers;
    }
   
    create(lineDTO){
        const code = lineDTO.code;
        const name = lineDTO.name;
        const color = lineDTO.color;
        const linePaths = lineDTO.linePaths;
        const allowedVehicles = lineDTO.allowedVehicles;
        const deniedVehicles = lineDTO.deniedVehicles;
        const allowedDrivers = lineDTO.allowedDrivers;
        const deniedDrivers = lineDTO.deniedDrivers;

        if(!!code === false || !!name === false || !!color === false  || code.length === 0 || name.length === 0 || color.length === 0){
                throw new Error;
            } else {
                const line = new Line({name: name, color: color, linePaths: linePaths, allowedVehicles: allowedVehicles, deniedVehicles: deniedVehicles,
                    allowedDrivers: allowedDrivers, deniedDrivers: deniedDrivers}, code);
                return line;
            }

    }
}