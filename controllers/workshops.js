const Workshop = require('../models/workshop');

async function index(req, res) {
    try {
        const workshops = await Workshop.getAll();
        res.status(200).json(workshops);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function show(req, res) {
    try {
        const workshop = await Workshop.getById(req.params.id);
        res.status(200).json(workshop);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function create(req, res) {
    try {
        const workshop = await Workshop.create(req.body);
        res.status(201).json(workshop);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function update(req, res) {
    try {
        const workshop = await Workshop.update(req.params.id, req.body);
        res.status(200).json(workshop);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function destroy(req, res) {
    try {
        const workshop = await Workshop.delete(req.params.id);
        res.status(200).json(workshop);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {index, show, create, update, destroy};
