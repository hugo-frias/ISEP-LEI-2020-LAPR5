const MapperClass = require('../core/infra/Mapper');
const UserDTO = require('../dto/UserDTO');

const UserMapClass = function() {
    MapperClass.apply(this, arguments);
};

UserMapClass.prototype = Object.create(MapperClass.prototype);
UserMapClass.prototype.constructor = UserMapClass;

UserMapClass.prototype.toDTO = function(user) {

    try {
        UserDTO.email = user.email
        UserDTO.password = user.password
        UserDTO.userType = user.userType
        return UserDTO;
    } catch(error) {
        console.log(error.details[0].message);
        return null;
    }
}

module.exports = UserMapClass;