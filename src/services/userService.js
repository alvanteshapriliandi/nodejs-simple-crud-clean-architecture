const UserRepository = require('../repositories/userRepository')
const User = require('../models/user')

class UserService {

    getAllUsers () {
        return UserRepository.getAllUsers()
    }

    getUserById (id) {
        return UserRepository.getUserById(id)
    }

    createUser (data) {
        const newUser = new User(data.id, data.name, data.email, data.age)
        UserRepository.createUser(newUser)
        return newUser
    }

    updateUser (id, data) {
        console.log(data)
        const updateUser = new User(data.id, data.name, data.email, data.age)
        UserRepository.updateUser(id, updateUser)
        return updateUser
    }

    deleteUser (id) {
        UserRepository.deleteUser(id)
    }
}

module.exports = new UserService()