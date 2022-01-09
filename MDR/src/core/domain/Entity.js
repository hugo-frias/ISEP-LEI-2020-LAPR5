const isEntity = function (v) {
    return v instanceof Entity;
  }
  
  module.exports = class Entity {
  
    constructor(_props, _id) {
      this._id = _id;
      this._props = _props;
    }
  
    equals(object) {
  
      if (object == null || object == undefined) {
        return false;
      }
  
      if (this === object) {
        return true;
      }
  
      if (!isEntity(object)) {
        return false;
      }
  
      return this._id.equals(object._id);
    }
  
  }