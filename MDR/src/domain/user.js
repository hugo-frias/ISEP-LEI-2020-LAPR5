const AggregateRoot = require('../core/domain/AggregateRoot');

module.exports = class User extends AggregateRoot {
    
    constructor(userProps, userCode) {
        super(userProps,userCode);
    }

    get email() {
        return this._id;
    }

    get password() {
        return this._props.password;
    }
    get userType() {
        return this._props.userType;
    }

    set email(userEmail) {
        this._props.email = userEmail;
    }
    set password(userPassword) {
        this._props.password = userPassword;
    }
    set userType(userType) {
        this._props.userType = userType;
    }
    create(userDTO) {
        const email = userDTO.email;
        const password = userDTO.password;
        const userType = userDTO.userType;


        if(!!email === false || !!password === false || !!userType === false) {
            throw new Error;
        } else {
            const user = new User({password: password, userType: userType}, email);
            return user;
        }
    }
}