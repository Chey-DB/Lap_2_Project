const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');

const userRouter = require('./routers/users');
const workshopRouter = require('./routers/workshops');


const api = express();


// Middlewares
api.use(cors());
api.use(express.json());
api.use(logRoutes);

// root route
api.get('/', (req, res) => {
    res.send('Hello World!');
    })


// Routers
api.use('/users', userRouter);
api.use('/workshops', workshopRouter);


module.exports = api;
