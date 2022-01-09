const UserSchema = require('../models/user');
const UserMap = require('../mappers/UserMap');
const mapInstance = new UserMap();

module.exports = class UserRepo {

    constructor(schema) {
        if(schema == undefined) {
            this.schema = UserSchema;
        } else {
            this.schema = schema;
        }
    }

    async saveUser(user) {

        const userDocument = await this.schema.findOne({ email: user.email });
    
        try {
    
            if (userDocument) {
                return null;
            }
    
            const userRaw = mapInstance.toPersistence(user);
            const userSchema = new UserSchema(userRaw);
            userSchema.email = user.email;
            userSchema.password = user.password;
            userSchema.userType = user.userType;
            userSchema.save();
            return user;
    
        } catch (err) {
            throw err;
        }
    }
    async getUserByEmail(emailAux, res) {
        return await UserSchema.findOne({email : emailAux}).exec();
    }
    async deleteUserByEmail(emailAux, res){
        return await UserSchema.deleteOne({email : emailAux}).exec();
    }
    async getAllUsers(res) {
        return await UserSchema.find().exec();
    }
}