import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';

const routerUser = Router();

routerUser.get('/', userController.getUsers);
routerUser.get('/by-id/:id', userController.getUserById);

export default routerUser;