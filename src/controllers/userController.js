const UserService = require('../services/userService')

class UserContoller {
    getAllUsers (req, res) {
        const users = UserService.getAllUsers()
        res.end(JSON.stringify(users))
    }

    getUserById (req, res, id) {
        const user = UserService.getUserById(id)
        if (user) {
            res.end(JSON.stringify(user))
        } else {
            res.statusCode = 404
            res.end('User not found!')
        }
    }

    createUser (req, res, data) {
        const user = UserService.createUser(data)
        res.statusCode = 201
        res.end(JSON.stringify(user))
    }

    updateUser (req, res, id, data) {
        const user = UserService.updateUser(id, data)
        res.end(JSON.stringify(user))
    }

    deleteUser (req, res, id) {
        const user = UserService.deleteUser(id)
        res.statusCode = 204
        res.end()
    }
}

module.exports = new UserContoller()