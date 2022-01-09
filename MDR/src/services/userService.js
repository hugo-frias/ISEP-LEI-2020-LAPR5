const UserRepoClass = require('../repos/userRepo');
const UserRepoInstance = new UserRepoClass();
const User = require('../domain/user');
const UserMap = require('../mappers/UserMap');
const classInstance = new User();
const mapInstance = new UserMap();

module.exports = class UserService {

    constructor(newInstance) {
        if (newInstance == undefined) {
            this.repoInstance = UserRepoInstance;
        } else {
            this.repoInstance = newInstance;
        }
    }

    async createUser(UserDTO) {

        try {

            const user = classInstance.create(UserDTO);

            const newUser = await this.repoInstance.saveUser(user);
            if (newUser == null) {
                return null;
            }

            const newUserDTO = mapInstance.toDTO(newUser);
            return newUserDTO;

        } catch (err) {
            throw err;
        }
    }

    async getUserByEmail(req, res) {
        return await this.repoInstance.getUserByEmail(req.params.email, res);
    }
    async deleteUserByEmail(req, res) {
        return await this.repoInstance.deleteUserByEmail(req.params.email, res);
    }
    async getAllUsers(req,res){
        return await this.repoInstance.getAllUsers(res)
    }
}