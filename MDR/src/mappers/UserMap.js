const MapperClass = require('../core/infra/Mapper');
const UserDTO = require('../dto/userDTO');
const UserDomain = require('../domain/user');

const UserMapClass = function() {  
  MapperClass.apply(this, arguments); 
};

UserMapClass.prototype = Object.create(MapperClass.prototype);  
UserMapClass.prototype.constructor = UserMapClass;

UserMapClass.prototype.toDTO = function(user) {  
  UserDTO.email = user.email;
  UserDTO.password = user.password;
  UserDTO.userType = user.userType;
  return UserDTO;
}

UserMapClass.prototype.toDomain = function(userSchema) {
  return UserDomain.prototype.create(userSchema);
}

UserMapClass.prototype.toPersistence = function(user) {
  return {
    email: user.email,
    password: user.password,
    userType: user.userType
  }
}

module.exports = UserMapClass;