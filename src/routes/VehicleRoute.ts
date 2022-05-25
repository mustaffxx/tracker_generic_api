import { Router } from 'express';

import AuthMiddleware from '../middlewares/AuthMiddleware';
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
// request vehicles by user id <- admin
routes.get(
  '/vehicles/:uid',
  AuthMiddleware.validateToken,
  UserMiddleware.validateAdminRole,
  VehicleController.getVehiclesByUserId
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

export default routes;
