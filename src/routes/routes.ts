import { Router } from 'express';

import AuthController from '../controllers/AuthController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import UserController from '../controllers/UserController';
import UserMiddleware from '../middlewares/UserMiddleware';
import VehicleController from '../controllers/VehicleController';

const routes = Router();

routes.post('/register', AuthController.register);
routes.post('/login', AuthController.login);
routes.put(
  '/edit',
  AuthMiddleware.validateToken,
  AuthController.changePassword
);

// request all users <- admin
routes.get(
  '/users',
  AuthMiddleware.validateToken,
  UserMiddleware.validateAdminRole,
  UserController.getAllUsers
);
// update user <- admin
routes.put(
  '/users',
  AuthMiddleware.validateToken,
  UserMiddleware.validateAdminRole,
  UserController.updateUserById
);
// delete user <- admin
routes.delete(
  '/users',
  AuthMiddleware.validateToken,
  UserMiddleware.validateAdminRole,
  UserController.deleteUserById
);
// create vehicle <- admin
routes.post(
  '/vehicles',
  AuthMiddleware.validateToken,
  UserMiddleware.validateAdminRole,
  VehicleController.createVehicle
);
// request vehicles <- admin
routes.get(
  '/vehicles',
  AuthMiddleware.validateToken,
  UserMiddleware.validateAdminRole,
  VehicleController.getAllVehicles
);

// request self vehicles <- user
routes.get(
  '/vehicles',
  AuthMiddleware.validateToken,
  VehicleController.getUserVehicles
);

export default routes;
