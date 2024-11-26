const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../../data/users.json')
const db = require('../config/database')

class UserRepository {
    async getAllUsers () {
        const [rows] = await db.query('SELECT * FROM users')
        return rows
    }

    async getUserById (id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id])
        return rows[0]
    }

    async createUser (user) {
        const { name, email, age } = user
        const [result] = await db.query('INSERT INTO users (name, email, age) VALUES (?, ?, ?)', [name, email, age])
        return {id: result.insertId, ...user}
    }

    async updateUser (id, user) {
        const { name, email, age } = user
        await db.query('UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?', [name, email, age, id])
        return { id, ...user }
    }

    async deleteUser(id) {
        await db.query('DELETE FROM users WHERE id = ?', [id]);
    }
}

module.exports = new UserRepository()