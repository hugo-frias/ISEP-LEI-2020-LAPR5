const Entity = require('./Entity');

module.exports = class AggregateRoot extends Entity {

    //_domainEvents = [];


    get id() {
        return this._id;
    }

   // get domainEvents() {
    //    return this._domainEvents;
    //}

    addDomainEvent(domainEvent) {
        console.log('Not implemented yet!');
    }

    clearEvents() {
        console.log('Not implemented yet!');
    }

    logDomainEventAdded(domainEvent) {
        console.log('Not implemented yet!');
    }
}