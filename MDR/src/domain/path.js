const AggregateRoot = require("../core/domain/AggregateRoot");

module.exports = class Path extends AggregateRoot {
    constructor(pathProps, pathCode) {
        super(pathProps, pathCode);
    }

    get code() {
        return this._id;
    }

    get isEmpty(){
        return this._props.isEmpty;
    }

    get pathNodes() {
        return this._props.pathNodes;
    }

    create(pathDTO) {
        const code = pathDTO.code;
        const isEmpty = pathDTO.isEmpty;
        const pathNodes = pathDTO.pathNodes;

        if (!pathNodes || !code) {
            throw new Error;
        } else {
            const path = new Path({ isEmpty: isEmpty, pathNodes: pathNodes }, code);
            return path;
        }
    }
}