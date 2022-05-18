import { Router } from 'express';

import AuthController from '../controllers/AuthController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import UserController from '../controllers/UserController';
import UserMiddleware from '../middlewares/UserMiddleware';

const routes = Router();

routes.post('/register', AuthController.register);
routes.post('/login', AuthController.login);
routes.put('/edit', AuthMiddleware.validateToken, AuthController.edit);
routes.get(
  '/users',
  AuthMiddleware.validateToken,
  UserMiddleware.validateAdminRole,
  UserController.getUsers
);
routes.get(
  '/vehicles',
  AuthMiddleware.validateToken,
  UserController.getVehicles
);

export default routes;
