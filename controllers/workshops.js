const Workshop = require('../models/workshops');

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

async function showLastWorkshop(req, res) {
    try {
        const workshop = await Workshop.getLastWorkshop();
        res.status(200).json(workshop);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function create(req, res) {
    try {
        const data = req.body;
        const result = await Workshop.create(data);

        res.status(201).json(result);
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
        const id = parseInt(req.params.id);
        const workshop = await Workshop.getById(id);
        const result = await workshop.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

module.exports = {index, show, create, update, destroy, showLastWorkshop};
