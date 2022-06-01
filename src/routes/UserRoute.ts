import { Router } from 'express';

import AuthMiddleware from '../middlewares/AuthMiddleware';
import UserController from '../controllers/UserController';
import UserMiddleware from '../middlewares/UserMiddleware';

const routes = Router();

// request all users <- admin
routes.get(
  '/users',
  AuthMiddleware.validateToken,
  UserMiddleware.validateAdminRole,
  UserController.getUsers
);
// request user by id <- admin
routes.get(
  '/users/:id',
  AuthMiddleware.validateToken,
  UserMiddleware.validateAdminRole,
  UserController.getUser
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

export default routes;
