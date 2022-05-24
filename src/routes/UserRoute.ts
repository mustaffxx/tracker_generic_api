import { Router } from 'express';

import AuthMiddleware from '../middlewares/AuthMiddleware';
import UserController from '../controllers/UserController';
import VehicleController from '../controllers/VehicleController';
import UserMiddleware from '../middlewares/UserMiddleware';

const routes = Router();

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

// request self vehicles <- user
routes.get(
  '/users/vehicles',
  AuthMiddleware.validateToken,
  VehicleController.getUserVehicles
);

export default routes;
