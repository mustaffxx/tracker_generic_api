import { Router } from 'express';

import AuthMiddleware from '../middlewares/AuthMiddleware';
import UserMiddleware from '../middlewares/UserMiddleware';
import DeviceController from '../controllers/DeviceController';

const routes = Router();

// create device <- admin
routes.post(
  '/devices',
  AuthMiddleware.validateToken,
  UserMiddleware.validateAdminRole,
  DeviceController.createDevice
);
// request device <- admin
routes.get(
  '/devices/:id',
  AuthMiddleware.validateToken,
  UserMiddleware.validateAdminRole,
  DeviceController.getDevice
);
// update device <- admin
routes.put(
  '/devices',
  AuthMiddleware.validateToken,
  UserMiddleware.validateAdminRole,
  DeviceController.updateDevice
);
// delete device <- admin
routes.delete(
  '/devices/:id',
  AuthMiddleware.validateToken,
  UserMiddleware.validateAdminRole,
  DeviceController.deleteDevice
);

export default routes;