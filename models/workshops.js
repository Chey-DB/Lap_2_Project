const db = require("../database/connect.js")

class Workshop {
  constructor (workshop_id, title, description, location, date, time, image_data, user_id) {
    this.id = workshop_id;
    this.title = title;
    this.description = description;
    this.location = location;
    this.date = date;
    this.time = time;
    this.image_data = image_data;
    this.user_id = user_id;
  }

     static async getAll() {
        try {
            const workshops = await db.query("SELECT * FROM workshops");
            return workshops;
        } catch (err) {
            return err.message;
        }
    }

    static async getById(id) {
        try {
            const workshop = await db.query("SELECT * FROM workshops WHERE workshop_id = $1", [id]);
            return workshop;
        } catch (err) {
            return err.message;
        }
    }

    static async create(workshop) {
        try {
            const newWorkshop = await db.query("INSERT INTO workshops (title, description, location, date, time, image_data, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [workshop.title, workshop.description, workshop.location, workshop.date, workshop.time, workshop.image_data, workshop.user_id]);
            return newWorkshop.rows[0];
        } catch (err) {
            return err.message;
        }
    }

    static async update(id, workshop) {
        try {
            const updatedWorkshop = await db.query("UPDATE workshops SET title = $1, description = $2, location = $3, date = $4, time = $5, image_data = $6, user_id = $7 WHERE workshop_id = $8 RETURNING *", [workshop.title, workshop.description, workshop.location, workshop.date, workshop.time, workshop.image_data, workshop.user_id, id]);
            return updatedWorkshop;
        } catch (err) {
            return err.message;
        }
    }

    async destroy(id) {
        try {
            const deletedWorkshop = await db.query("DELETE FROM workshops WHERE workshop_id = $1", [id]);
            return deletedWorkshop.rows[0];
        } catch (err) {
            return err.message;
        }
    }
}

module.exports = Workshop;
