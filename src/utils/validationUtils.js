class ValidationError extends Error {
    constructor(message) {
        super(message)
        this.name = "ValidationError"
    }
}

class ValidationUtils {
    static validateUserData (userData) {
        if (!userData.name || typeof userData.name !== 'string' || userData.name.trim() === "") {
            throw new ValidationError("Name is required and must be a non-empty string")
        }
        if (!userData.name || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userData.email)) {
            throw new ValidationError("Email is required and must be a valid email address")
        }
        if (!userData.age || typeof userData.age !== 'number' || userData.age <= 0) {
            throw new ValidationError("Age is required and must be a positive number")
        }
    }
}

module.exports = { ValidationUtils, ValidationError }