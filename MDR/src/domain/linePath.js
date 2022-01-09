const AggregateRoot = require('../core/domain/AggregateRoot');

module.exports = class LinePath extends AggregateRoot{

    constructor(linePathProps, linePathCode){
        super(linePathProps, linePathCode);
    }

    get code(){
        return this._id;
    }
    get path(){
        return this._props.path;
    }
    set path(pathPath){
        this._props.path = pathPath;
    }

    get orientation(){
        return this._props.orientation;
    }
    set orientation(pathOrientation){
        this._props.orientation = pathOrientation;
    }

    get line(){
        return this._props.line;
    }
    set line(linePathLine){
        this._props.line = linePathLine;
    }

   
   
    create(linePathDTO){
        const code = linePathDTO.code;
        const path = linePathDTO.path;
        const orientation = linePathDTO.orientation;
        const line = linePathDTO.line;

        if(!!code === false || !!path === false || (orientation.toUpperCase()!="GO" && orientation.toUpperCase()!="RETURN")){

                throw new Error;
            } else {
                const linePath = new LinePath({code: code, path: path, orientation: orientation, line: line}, code);
                return linePath;
            }

    }
}