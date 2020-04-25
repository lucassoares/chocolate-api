const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');
const authMid = require('./app/middlewares/auth');
const validatorMid = require('./app/middlewares/validators');
const ChocolateController = require('./app/controllers/ChocolateController');
const UserController = require('./app/controllers/UserController');

routes.post('/user', validatorMid.userValidator, UserController.store);
routes.post('/user/auth', UserController.auth);

routes.use(authMid);

// rotas dos usuarios
routes.get('/user', UserController.index);
routes.get('/user/:userId', UserController.show);
routes.put('/user/:userId', UserController.update);
routes.delete('/user/:userId', UserController.destroy);

// rotas dos chocolates
routes.get('/', ChocolateController.index);
routes.post(
  '/',
  multer(multerConfig).single('file'),
  validatorMid.chocolateValidator,
  ChocolateController.store
);
routes.get('/:id', ChocolateController.show);
routes.put('/:id', ChocolateController.update);
routes.delete('/:id', ChocolateController.destroy);

module.exports = routes;
