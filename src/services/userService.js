const UserRepository = require('../repositories/userRepository')
const { ValidationUtils } = require('../utils/validationUtils')
const User = require('../models/user')
class UserService {

    async getAllUsers () {
        return await UserRepository.getAllUsers()
    }

    async getUserById (id) {
        return await UserRepository.getUserById(id)
    }

    async createUser (data) {

        ValidationUtils.validateUserData(data)
        return await UserRepository.createUser(data)
    }

    async updateUser (id, data) {
        ValidationUtils.validateUserData(data)
        return await UserRepository.updateUser(id, data)
    }

    async deleteUser (id) {
        return await UserRepository.deleteUser(id)
    }
}

module.exports = new UserService()