const Entity = require('../core/domain/Entity');

module.exports = class pathNode extends Entity {
    constructor(pathNodeProps, pathNodeCode) {
        super(pathNodeProps, pathNodeCode);
    }

    get code() {
        return this._id;
    }

    get duration(){
        return this._props.duration;
    }

    get distance(){
        return this._props.distance;
    }

    get node(){
        return this._props.node;
    }
    
    create(pathNodeDTO) {
        let code = pathNodeDTO.code;
        let duration = pathNodeDTO.duration;
        let distance = pathNodeDTO.distance;
        let node = pathNodeDTO.node;
        if( node.length === 0 || !!code === false || code.length === 0) {
            throw new Error;
        } else {
            return new pathNode({duration: duration, distance: distance,node: node}, code);
        }
    }
}