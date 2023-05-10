const { Router } = require('express');

const userController = require('../controllers/users');

const userRouter = Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/logout', userController.logout);
userRouter.get('/:id', userController.viewProfile);
userRouter.get('/', userController.showAllUsers);


module.exports = userRouter;
