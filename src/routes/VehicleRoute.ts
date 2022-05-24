import { Router } from 'express';

import AuthController from '../controllers/AuthController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import UserController from '../controllers/UserController';
import UserMiddleware from '../middlewares/UserMiddleware';
import VehicleController from '../controllers/VehicleController';

const routes = Router();

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
// update vehicle <- admin
routes.put(
  '/vehicles',
  AuthMiddleware.validateToken,
  UserMiddleware.validateAdminRole,
  VehicleController.updateVehicleById
);
// delete vehicle <- admin
routes.delete(
  '/vehicles',
  AuthMiddleware.validateToken,
  UserMiddleware.validateAdminRole,
  VehicleController.deleteVehicleById
);

// request self vehicles <- user
routes.get(
  '/vehicles',
  AuthMiddleware.validateToken,
  VehicleController.getUserVehicles
);

export default routes;
