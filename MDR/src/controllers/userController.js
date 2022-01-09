const UserServiceClass = require('../services/userService');
const UserServiceInstance = new UserServiceClass();
const UserMap = require('../mappers/UserMap');
const mapInstance = new UserMap();

module.exports = class UserController {

    constructor(newInstance) {
        if(newInstance == undefined) {
            this.serviceInstance = UserServiceInstance;
        } else {
            this.serviceInstance = newInstance;
        }
    }

    async createUser(req, res, next) {
        try {

            const userDTO = mapInstance.toDTO(req.body);

            const newUserDTO = await this.serviceInstance.createUser(userDTO);
            if (newUserDTO == null) {
                return res.status(400).send('The user already exists!');
            }

            return res.status(201).send('The user was successfully added!');

        } catch (err) {
            next(err);
        }
    }

    async deleteUserByEmail(req, res, next) {

        try {
            const deleted = await this.serviceInstance.deleteUserByEmail(req, res);
            if(deleted.deletedCount === 1){
                return res.status(201).send('User deleted!');
            }
            
            return res.status(400).send('Error deleting!');
            
        } catch (err) {
            next(err);
        }
    }
    
    async getUserByEmail(req, res, next) {

        try {
            const user = await this.serviceInstance.getUserByEmail(req, res);
            return res.json(user);
        } catch (err) {
            next(err);
        }

    }

    async getAllUsers(req, res, next) {

        try {
            const user = await this.serviceInstance.getAllUsers(req, res);
            return res.json(user);
        } catch (err) {
            next(err);
        }

    }
}