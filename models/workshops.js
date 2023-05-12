const db = require("../database/connect.js")

class Workshop {
  constructor ({ workshop_id, title, description, location, date, time, image_data, username }) {
    this.id = workshop_id;
    this.title = title;
    this.description = description;
    this.location = location;
    this.date = date;
    this.time = time;
    this.image_data = image_data;
    this.username = username;
  }

    static async getWorkshopWithLastId() {
        try {
            const lastId = await db.query("SELECT * FROM workshops WHERE workshop_id = (SELECT MAX(workshop_id) FROM workshops)");
            return lastId;
        } catch (err) {
            return err.message;
        }
    }

     static async getAll() {
        try {
            const workshops = await db.query("SELECT * FROM workshops");
            return workshops.rows.map(workshop => new Workshop(workshop));
        } catch (err) {
            return err.message;
        }
    }

    static async getById(id) {
        try {
            const workshop = await db.query("SELECT * FROM workshops WHERE workshop_id = $1", [id]);
            return new Workshop(workshop.rows[0]);
        } catch (err) {
            return err.message;
        }
    }

    static async create(workshop) {
        try {
            const { title, description, location, date, time, image_data, username } = workshop;
            const response = await db.query("INSERT INTO workshops (title, description, location, date, time, image_data, username) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [title, description, location, date, time, image_data, username]);
            const newId = response.rows[0].workshop_id;
            const newWorkshop = await Workshop.getById(newId);
            return newWorkshop
        } catch (err) {
            return err.message;
        }
    }

    static async update(id, workshop) {
        try {
            const updatedWorkshop = await db.query("UPDATE workshops SET title = $1, description = $2, location = $3, date = $4, time = $5, image_data = $6, username = $7 WHERE workshop_id = $8 RETURNING *", [workshop.title, workshop.description, workshop.location, workshop.date, workshop.time, workshop.image_data, workshop.username, id]);
            return updatedWorkshop;
        } catch (err) {
            return err.message;
        }
    }

    async destroy() {
        try {
            const deletedWorkshop = await db.query("DELETE FROM workshops WHERE workshop_id = $1", [this.id]);
            return new Workshop(deletedWorkshop.rows[0]);
        } catch (err) {
            return err.message;
        }
    }
}

module.exports = Workshop;
