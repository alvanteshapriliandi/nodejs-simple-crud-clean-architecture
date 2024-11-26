const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../../data/users.json')

class UserRepository {
    getAllUsers () {
        const data = fs.readFileSync(filePath)
        return JSON.parse(data)
    }

    getUserById (id) {
        const users = this.getAllUsers()
        return users.find(user => user.id === id)
    }

    createUser (user) {
        const users = this.getAllUsers()
        users.push(user)
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
    }

    updateUser (id, updateUser) {
        let users = this.getAllUsers()
        users = users.map(user => (user.id === id ? updateUser : user))
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
    }

    deleteUser(id) {
        const users = this.getAllUsers()
        const filteredUser = users.filter(user => user.id !== id)
        fs.writeFileSync(filePath, JSON.stringify(filteredUser, null, 2))

    }
}

module.exports = new UserRepository()