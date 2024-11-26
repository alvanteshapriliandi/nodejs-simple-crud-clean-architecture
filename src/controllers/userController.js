const UserService = require('../services/userService')
const { ValidationError } = require('../utils/validationUtils')

class UserContoller {

    async getAllUsers (req, res) {
        const users = await UserService.getAllUsers()
        res.end(JSON.stringify(users))
    }

    async getUserById (req, res, id) {
        const user = await UserService.getUserById(id)
        if (user) {
            res.end(JSON.stringify(user))
        } else {
            res.statusCode = 404
            res.end(JSON.stringify({ error: 'User not found' }))
        }
    }

    async createUser (req, res, data) {
        try {
            const user = await UserService.createUser(data)
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

    async updateUser (req, res, id, data) {
        try {
            const user = await UserService.updateUser(id, data)
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

    async deleteUser (req, res, id) {
        await UserService.deleteUser(id)
        res.statusCode = 204
        res.end()
    }
}

module.exports = new UserContoller()