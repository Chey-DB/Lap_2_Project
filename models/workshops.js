const db = require("../database/connect.js")

class Workshop {
  constructor (workshop_id, title, description, location, date, time, image_data) {
    this.id = workshop_id;
    this.title = title;
    this.description = description;
    this.location = location;
    this.date = date;
    this.time = time;
    this.image_data = image_data;
  }

     static async getAll() {
        try {
            const workshops = await db.query("SELECT * FROM workshops");
            return workshops;
        } catch (err) {
            return err.message;
        }
    }

    static async getOne(id) {
        try {
            const workshop = await db.query("SELECT * FROM workshops WHERE workshop_id = $1", [id]);
            return workshop;
        } catch (err) {
            return err.message;
        }
    }

    static async create(workshop) {
        try {
            const newWorkshop = await db.query("INSERT INTO workshops (title, description, location, date, time, image_data) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [workshop.title, workshop.description, workshop.location, workshop.date, workshop.time, workshop.image_data]);
            return newWorkshop;
        } catch (err) {
            return err.message;
        }
    }

    async update(id, workshop) {
        try {
            const updatedWorkshop = await db.query("UPDATE workshops SET title = $1, description = $2, location = $3, date = $4, time = $5, image_data = $6 WHERE workshop_id = $7 RETURNING *", [workshop.title, workshop.description, workshop.location, workshop.date, workshop.time, workshop.image_data, id]);
            return updatedWorkshop;
        } catch (err) {
            return err.message;
        }
    }

    async destroy(id) {
        try {
            const deletedWorkshop = await db.query("DELETE FROM workshops WHERE workshop_id = $1", [id]);
            return deletedWorkshop;
        } catch (err) {
            return err.message;
        }
    }
}

module.exports = Workshop;
