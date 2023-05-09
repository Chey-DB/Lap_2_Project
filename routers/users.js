const { Router } = require('express');

const userController = require('../controllers/users');


const userRouter = Router();


userRouter.get('/', userController.showAllUsers);

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);


module.exports = userRouter;
