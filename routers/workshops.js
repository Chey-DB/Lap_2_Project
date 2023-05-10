const { Router } = require('express');
const authenticator = require('../middleware/authenticator');

const workshopController = require('../controllers/workshops');

const workshopRouter = Router();

workshopRouter.get('/', workshopController.index);
workshopRouter.get('/:id', workshopController.show);
workshopRouter.post('/', authenticator, workshopController.create);
workshopRouter.patch('/:id', workshopController.update);
workshopRouter.delete('/:id', workshopController.destroy);

module.exports = workshopRouter;
