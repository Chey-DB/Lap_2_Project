const express = require('express');
const cors = require('cors');

const api = express();


// Middlewares
api.use(cors());
api.use(express.json());

api.get('/', (req, res) => {
    res.send('Hello World!');
    })   






module.exports = api;
