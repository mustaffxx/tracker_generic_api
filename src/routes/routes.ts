import { Router } from 'express';

import AuthController from '../controllers/AuthController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import UserController from '../controllers/UserController';

const routes = Router();

routes.post('/register', AuthController.register);
routes.post('/login', AuthController.login);
routes.put('/edit', AuthMiddleware.validateToken, AuthController.edit);
routes.get(
  '/vehicles',
  AuthMiddleware.validateToken,
  UserController.getVehicles
);

export default routes;
