const db = require("../database/connect.js")

class User {
    constructor (user_id, username, email, password, image_data) {
        this.id = user_id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.image_data = image_data;
    }

    static async getAll() {
        try {
            const users = await db.query("SELECT * FROM user_accounts");
            return users;
        } catch (err) {
            return err.message;
        }
    }

    static async getOne(id) {
        try {
            const user = await db.query("SELECT * FROM user_accounts WHERE user_id = $1", [id]);
            return user;
        } catch (err) {
            return err.message;
        }
    }

    static async getOneByUsername(username) {
        try {
            const user = await db.query("SELECT * FROM user_accounts WHERE username = $1", [username]);
            return user;
        } catch (err) {
            return err.message;
        }
    }

    static async create(user) {
        try {
            const newUser = await db.query("INSERT INTO user_accounts (username, email, password, image_data) VALUES ($1, $2, $3, $4) RETURNING *", [user.username, user.email, user.password, user.image_data]);
            return newUser;
        } catch (err) {
            return err.message;
        }
    }

    async update(id, user) {
        try {
            const updatedUser = await db.query("UPDATE user_accounts SET username = $1, email = $2, password = $3, image_data = $4 WHERE user_id = $5 RETURNING *", [user.username, user.email, user.password, user.image_data, id]);
            return updatedUser;
        } catch (err) {
            return err.message;
        }
    }

    async destroy(id) {
        try {
            const deletedUser = await db.query("DELETE FROM user_accounts WHERE user_id = $1", [id]);
            return deletedUser;
        } catch (err) {
            return err.message;
        }
    }
}

module.exports = User;
