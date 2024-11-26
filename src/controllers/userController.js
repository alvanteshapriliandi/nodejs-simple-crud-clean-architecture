const UserService = require('../services/userService')
const { ValidationError, ValidationUtils } = require('../utils/validationUtils')

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
        try {
            ValidationUtils.validateUserData(data)
            const user = UserService.createUser(data)
            res.statusCode = 201
            res.end(JSON.stringify(user))
        } catch (error) {
            if (error instanceof ValidationError) {
                res.statusCode = 400
                res.end(JSON.stringify({error: error.message}))
            } else {
                res.statusCode = 500
                res.end(JSON.stringify({error: 'Internal Server Error'}))
            }
        }
    }

    updateUser (req, res, id, data) {
        try {
            ValidationUtils.validateUserData(data)
            const user = UserService.updateUser(id, data)
            res.end(JSON.stringify(user))
        } catch (error) {
            if (error instanceof ValidationError) {
                res.statusCode = 400
                res.end(JSON.stringify({error: error.message}))
            } else {
                res.statusCode = 500
                res.end(JSON.stringify({error: 'Internal Server Error'}))
            }
        }
    }

    deleteUser (req, res, id) {
        const user = UserService.deleteUser(id)
        res.statusCode = 204
        res.end()
    }
}

module.exports = new UserContoller()