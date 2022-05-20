import { Router } from 'express';

import AuthController from '../controllers/AuthController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import UserController from '../controllers/UserController';
import UserMiddleware from '../middlewares/UserMiddleware';

const routes = Router();

routes.post('/register', AuthController.register);
routes.post('/login', AuthController.login);
routes.put(
  '/edit',
  AuthMiddleware.validateToken,
  AuthController.changePassword
);

// request users <- admin
routes.get(
  '/users',
  AuthMiddleware.validateToken,
  UserMiddleware.validateAdminRole,
  UserController.getUsers
);
// update user <- admin
routes.put(
  '/users',
  AuthMiddleware.validateToken,
  UserMiddleware.validateAdminRole,
  UserController.updateUser
);
// delete user <- admin
routes.delete(
  '/users',
  AuthMiddleware.validateToken,
  UserMiddleware.validateAdminRole,
  UserController.deleteUser
);
// create vehicle <- admin
routes.post(
  '/vehicles',
  AuthMiddleware.validateToken,
  UserMiddleware.validateAdminRole,
  UserController.createVehicle
);
// request vehicles <- admin
routes.get(
  '/vehicles',
  AuthMiddleware.validateToken,
  UserMiddleware.validateAdminRole,
  UserController.getVehicles
);

// request self vehicles <- user
routes.get(
  '/vehicles',
  AuthMiddleware.validateToken,
  UserController.getUserVehicles
);

export default routes;
