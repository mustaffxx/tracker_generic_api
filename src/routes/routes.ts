import { Router } from 'express';

import AuthController from '../controllers/AuthController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const routes = Router();

routes.post('/register', AuthController.register);
routes.post('/login', AuthController.login);
routes.put('/edit', AuthMiddleware.validateToken, AuthController.edit);

export default routes;
