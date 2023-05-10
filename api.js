const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');


const api = express();


// Middlewares
api.use(cors());
api.use(express.json());
api.use(logRoutes);

api.get('/', (req, res) => {
    res.send('Hello World!');
    })


module.exports = api;
