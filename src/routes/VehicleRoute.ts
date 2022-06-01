import { Router } from 'express';

import AuthMiddleware from '../middlewares/AuthMiddleware';
import VehicleController from '../controllers/VehicleController';

const routes = Router();

// create vehicle
routes.post(
  '/vehicles',
  AuthMiddleware.validateToken,
  VehicleController.createVehicle
);
// request vehicles
routes.get(
  '/vehicles',
  AuthMiddleware.validateToken,
  VehicleController.getVehicles
);
// update vehicle
routes.put(
  '/vehicles',
  AuthMiddleware.validateToken,
  VehicleController.updateVehicle
);
// delete vehicle
routes.delete(
  '/vehicles',
  AuthMiddleware.validateToken,
  VehicleController.deleteVehicle
);

export default routes;
